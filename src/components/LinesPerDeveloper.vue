<template>
    <div class="display-items">
        <!-- <md-list v-if="loaded" id="linesPerDev" v-for="authorContributions in info" v-bind:key="authorContributions.author">
            <md-list-item>
                <div class="md-list-item-text">
                    <md-card>
                        <md-card-header>
                            <md-card-header-text>
                                <div class="md-title">{{authorContributions.author}}</div>
                            </md-card-header-text>
                        </md-card-header>
                        <md-card-content>
                            <md-list id="authorContributionList" v-for="repoContributions in authorContributions.contributions">
                                <md-list-item>
                                    <div class="md-list-item-text">
                                        <span>Repositoy: {{repoContributions.repository}}</span>
                                        <span>Total: {{repoContributions.contribution.total}}</span>
                                    </div>
                                </md-list-item>
                            </md-list>
                        </md-card-content>
                    </md-card>
                </div>
            </md-list-item>
        </md-list> -->

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
                loaded: false
            }
        },
        methods: {
            async fetchData() { ///repos/:owner/:repo/stats/contributors
                //const repo = 'TargetApp'
                const repositoryList = ['TargetApp', 'BudgetAPI'];
                const repo = repositoryList[0];

                this.apiService = new GitHubApiService();
                const promiseList = []
                repositoryList.forEach(repo => {
                    const url = `${constants.apiURLGitHub}/repos/${this.organization}/${repo}/${this.method}`;
                    
                    const getPromise = this.apiService.get(url, this.apiKeyGitHub);
                    getPromise.repo = repo;
                    promiseList.push(getPromise);
                })

                const repoPromiseList = Promise.all(promiseList).then(results => {
                    const organizedData = this.organizeData(promiseList, results);
                    this.setData(organizedData);
                });

                return repoPromiseList;
            },
            organizeData(promiseList, results) {
                console.log('Promises');
                console.log(promiseList);
                console.log('Results');
                console.log(results);

                const dictByAuthor = {}                
                results.forEach((result, index) => {

                    result.forEach(contribution => {
                        const repo = promiseList[index].repo
                        const author = contribution.author.login;
                        console.log('Repo: ' + repo);
                        console.log('Author: ' + author);

                        const authorContributions = dictByAuthor[author] ? dictByAuthor[author] : []
                        authorContributions.push({'repository': repo, 'contribution': contribution})
                        dictByAuthor[author] = authorContributions;
                    });
                });

                //Collapse it
                let organizedData = []
                Object.keys(dictByAuthor).forEach(author => {
                    organizedData.push({'author': author, 'contributions': dictByAuthor[author]})
                });

                console.log('Total results');
                console.log(dictByAuthor)
                console.log('Collapsed to');
                console.log(organizedData)
                return organizedData;
            },
            setData(theData) {
                console.log('Lines per dev data:');
                console.log(theData);

                const newList = [];
                // theData.forEach(contribution => {
                //     console.log('Contribution');
                //     console.log(contribution.author.login);
                // });

                this.info = theData;
                this.loaded = true
            }
        },
        mounted() {
            this.fetchData();
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