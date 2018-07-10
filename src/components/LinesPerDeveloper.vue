<template>
  <div class="display-items">
      <md-list v-if="loaded" id="linesPerDev" v-for="contribution in info" v-bind:key="contribution.id">
          <md-list-item>
              <div class="md-list-item-text">
                  <span>{{contribution.author.login}}</span>
                  <span>Total Commits: {{contribution.total}}</span>
              </div>
          </md-list-item>
      </md-list>
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
                    const mergedResults = this.organizeData(promiseList, results);
                    this.setData(mergedResults);
                });

                return repoPromiseList;
            },
            organizeData(promiseList, results) {
                console.log('Promises');
                console.log(promiseList);
                console.log('Results');
                console.log(results);

                let mergedResults = [].concat.apply([], results);
                let organizedData = {}

                mergedResults.forEach((contribution, index) => {
                    console.log('Index');
                    console.log(index);
                    const author = contribution.author.login;
                    // const repo = contribution
                    // const repoContribution = 
                    // organizedData[author]
                    // [{author: author, contributions: [repo:repo, contribution: contribution]}]
                    
                });
                return mergedResults;
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
        display: inline;
    }
</style>