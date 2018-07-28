<template>
<div class="display-items">
    <md-switch type="checkbox" v-model="autoReload">AutoReload</md-switch>
    <md-content>Last Updated: {{lastReload.toLocaleTimeString()}}</md-content>
    <br/>
<!--     <div v-if="loaded" id="authorContributionsId" v-for="authorContributions in info" v-bind:key="authorContributions.author">
        <md-card>
            <md-card-header>
                <md-card-header-text>
                    <div class="md-title">User: {{authorContributions.author}}</div>
                </md-card-header-text>
            </md-card-header>
            <md-card-content>
                <md-list class="md-double-line" id="authorContributionList" v-for="repoContributions in authorContributions.contributions" v-bind:key="repoContributions.repository">
                    <md-list-item>
                        <div class="md-list-item-text">
                            <span>Repositoy: {{repoContributions.repository}}</span>
                        </div>
                    </md-list-item>
                    <md-list-item>
                        <div class="md-list-item-text">
                            <span>Total commits: {{repoContributions.contribution.total}}</span>
                        </div>
                    </md-list-item>
                </md-list>
            </md-card-content>
        </md-card>
    </div> -->

    <h2>Commits per user per repository</h2>
    <div>Aome GitHub commits for the same user are showing up in GitHub differently, hence the possibility
    of multiple users per team member</div>
    <div v-if="loaded" id="totalCommitsByUserId" v-for="author in Object.keys(totalCommitsByUser)" v-bind:key="author">
        <md-card>
            <md-card-header>
                <md-card-header-text>
                    <div class="md-title">User: {{author}}</div>
                </md-card-header-text>
            </md-card-header>
            <md-card-content>
                <md-list class="md-double-line" id="authorCommitList" v-for="repository in Object.keys(totalCommitsByUser[author])" v-bind:key="repository">
                    <md-list-item>
                        <div class="md-list-item-text">
                            <span>Repository: {{repository}}</span>
                        </div>
                    </md-list-item>
                    <md-list-item>
                        <div class="md-list-item-text">
                            <span>Total commits: {{totalCommitsByUser[author][repository]}}</span>
                        </div>
                    </md-list-item>
                </md-list>
            </md-card-content>
        </md-card>
    </div>
</div>
</template>

<script>
import GitHubApiService from "../shared/github.api.service";
import * as constants from "../../config";

export default {
    components: {},
    props: {
        // gitOrg: String,
        // gitAPIKey: String
        initialGitOrg: String,
        initialGitAPIKey: String
    },
    data: function () {
        return {
            info: null,
            error: null,
            apiService: null,
            method: "stats/contributors",
            loaded: false,
            startTime: new Date().getTime(),
            timeBetweenCalls: 300000, //ms
            autoReload: false,
            lastReload: new Date(),
            totalCommitsByUser: {},
            gitOrg: (this.initialGitOrg ? this.initialGitOrg : this.$store.state.gitOrgName),
            gitAPIKey: (this.initialGitAPIKey ? this.initialGitAPIKey : this.$store.state.gitAPIKey)
        };
    },
    methods: {
        async fetchData() {
            // this.totalCommitsByUser = {}
            ///repos/:owner/:repo/stats/contributors
            this.apiService = new GitHubApiService();

            let repoPromiseList = [];
            
            const repositoryListPromise = this.getRepositoryListPromise();
            repositoryListPromise.then(reposResult => {
                const repositoryList = [];
                reposResult.forEach(repoResult => {
                    // s
                    repositoryList.push(repoResult.name);
                });
                repoPromiseList = this.getRepositoryContributions(repositoryList);
            });

            return repoPromiseList;
        },
        getRepoCommits(repo, page, commits) {
            const url = `${constants.apiURLGitHub}/repos/${this.gitOrg}/` +
                            `${repo}/commits`;
            let urlByPage = url
            if (page>1) {
                urlByPage = `${url}?page=${page}`
            } else
                page = 1
            if (!commits) {
                commits = []
            }
            const gitCommitsPromise = this.apiService.getWithHeaders(urlByPage, this.gitAPIKey);
            gitCommitsPromise.then(result => {
                if (result.data.length==0) {
                    this.organizeTotalCommitData(repo, commits)
                }
                else {
                    commits = commits.concat(result.data)
                    this.getRepoCommits(repo ,page+1, commits)
                }
            });
            
        },
        getRepositoryContributions(repositoryList) {
            const promiseList = [];
            repositoryList.forEach(repo => {
                const url = `${constants.apiURLGitHub}/repos/${this.gitOrg}/` +
                            `${repo}/${this.method}`;
                const getPromise = this.apiService.get(url, this.gitAPIKey);
                getPromise.repo = repo;
                promiseList.push(getPromise);
            });

            const repoPromiseList = Promise.all(promiseList).then(results => {
                const organizedData = this.organizeData(promiseList, results);
                this.setData(organizedData);
            });

            return repoPromiseList;
        },
        getRepositoryListPromise() {
            const url = `${constants.apiURLGitHub}/orgs/${this.gitOrg}/repos`;
            const getPromise = this.apiService.get(url, this.gitAPIKey);
            return getPromise;
        },
        organizeData(promiseList, results) {
            const dictByAuthor = {};
            results.forEach((result, index) => {

                result.forEach(contribution => {
                    const repo = promiseList[index].repo;
                    const author = contribution.author.login;

                    const authorContributions = dictByAuthor[author] ?
                        dictByAuthor[author] : [];
                    authorContributions.push({
                        repository: repo,
                        contribution: contribution
                    });
                    dictByAuthor[author] = authorContributions;
                });
            });

            //Now package it in a nice JSON
            let organizedData = [];
            Object.keys(dictByAuthor).forEach(author => {
                organizedData.push({
                    author: author,
                    contributions: dictByAuthor[author]
                });
            });

            return organizedData;
        },
        organizeTotalCommitData(repo, commits) {
            let commitCountByAuthor = {};
            commits.forEach((commit) => {
                let author = ''
                if(!commit || !commit.author || !commit.author.login) {
                    author = commit.commit.author.email
                } else{
                    author = commit.author.login;
                }

                let authorCommitCount = commitCountByAuthor[author] ?
                    commitCountByAuthor[author] : 0;
                authorCommitCount += 1
                commitCountByAuthor[author] = authorCommitCount
            });

            let tmpDict = Object.assign({}, this.totalCommitsByUser)
            Object.keys(commitCountByAuthor).forEach(key => {
                if (key in tmpDict){
                    tmpDict[key][repo] = commitCountByAuthor[key]
                } else {
                    tmpDict[key] = {}
                    tmpDict[key][repo] = commitCountByAuthor[key]
                }
            })

            this.totalCommitsByUser = tmpDict
        },
        setData(theData) {
            this.info = theData;
            this.loaded = true;

            if (this.autoReload) {
                let date = new Date();
                setTimeout(this.fetchData, this.timeBetweenCalls);
                this.lastReload = date;
            }
        }
    },
    mounted() {
        this.loaded = false
        this.fetchData();
    },
    watch: {
        autoReload: function (newVal, oldVal) {
            if (oldVal === false && newVal === true) {
                this.fetchData();
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.md-list {
    width: 320px;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
}

.display-items {
    display: inline-block;
    color: #228b22;
}

.md-card {
    color: #228b22;
    border: 1px solid rgba(#000, 0.12);
}

.md-list-item-text {
    color: #228b22;
}
</style>
