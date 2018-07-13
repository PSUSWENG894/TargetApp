<template>
    <div class="display-items">
        <md-switch type="checkbox" v-model="autoReload">AutoReload</md-switch>
        <md-content>Last Updated: {{lastReload.toLocaleTimeString()}}</md-content>
        <br/>
        <div v-if="loaded" id="aaaaaalinesPerDev" v-for="authorContributions in info" v-bind:key="authorContributions.author">
            <md-card>
                <md-card-header>
                    <md-card-header-text>
                        <div class="md-title">User: {{authorContributions.author}}</div>
                    </md-card-header-text>
                </md-card-header>
                <md-card-content>
                    <md-list class="md-double-line" id="authorContributionList" v-for="repoContributions in authorContributions.contributions">
                        <md-list-item>
                            <div class="md-list-item-text">
                                <span>Repositoy: {{repoContributions.repository}}</span>
                            </div>
                        </md-list-item>
                        <md-list-item >
                            <div class="md-list-item-text">
                                <span>Total commits: {{repoContributions.contribution.total}}</span>
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
        components: {
        },
        props: {
            organization: String,
            apiKeyGitHub: String,
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
                autoReload: true,
                lastReload: new Date(),
            }
        },
        methods: {
            async fetchData() { ///repos/:owner/:repo/stats/contributors
                this.apiService = new GitHubApiService();

                let repoPromiseList = [];

                const repositoryListPromise = this.getRepositoryListPromise();
                repositoryListPromise.then(reposResult => {
                    const repositoryList = [];
                    reposResult.forEach(repoResult => {
                        repositoryList.push(repoResult.name)
                    });
                    repoPromiseList = this.getRepositoryContributions(repositoryList);
                });
                
                return repoPromiseList;
            },
            getRepositoryContributions(repositoryList) {
                const promiseList = [];
                repositoryList.forEach(repo => {
                    const url = `${constants.apiURLGitHub}/repos/${this.organization}/${repo}/${this.method}`;
                    
                    const getPromise = this.apiService.get(url, this.apiKeyGitHub);
                    getPromise.repo = repo;
                    promiseList.push(getPromise);
                })

                const repoPromiseList = Promise.all(promiseList).then(results => {
                    console.log('Data sending to organizeData')
                    console.log(results)
                    const organizedData = this.organizeData(promiseList, results);
                    this.setData(organizedData);
                });

                return repoPromiseList;
            },
            getRepositoryListPromise() {
                const url = `${constants.apiURLGitHub}/orgs/${this.organization}/repos`;
                const getPromise = this.apiService.get(url, this.apiKeyGitHub);
                return getPromise;
            },
            organizeData(promiseList, results) {
                const dictByAuthor = {};
                results.forEach((result, index) => {

                    result.forEach(contribution => {
                        const repo = promiseList[index].repo
                        const author = contribution.author.login;

                        const authorContributions = dictByAuthor[author] ? dictByAuthor[author] : []
                        authorContributions.push({'repository': repo, 'contribution': contribution})
                        dictByAuthor[author] = authorContributions;
                    });
                });

                //Now package it in a nice JSON
                let organizedData = [];
                Object.keys(dictByAuthor).forEach(author => {
                    organizedData.push({'author': author, 'contributions': dictByAuthor[author]})
                });

                return organizedData;
            },
            setData(theData) {
                this.info = theData;
                this.loaded = true;

                if(this.autoReload) {
                    let date = new Date();
                    setTimeout(this.fetchData, this.timeBetweenCalls);
                    this.lastReload = date;
                }
            }
        },
        mounted() {
            this.fetchData();
        },
        watch: {
            'autoReload': function(newVal, oldVal) {
                if(oldVal === false && newVal === true){
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
        color: #228B22;
        
    }
    .md-card {
        color: #228B22;
        border: 1px solid rgba(#000, .12);
    }
    .md-list-item-text {
        color: #228B22;
    }
</style>