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
                method: "repos",
                loaded: false
            }
        },
        methods: {
            async fetchData() { ///repos/:owner/:repo/stats/contributors
                const url = `${constants.apiURLGitHub}/repos/PSUSWENG894/TargetApp/stats/contributors`;
                this.apiService = new GitHubApiService();

                const getPromise = this.apiService.get(url, this.apiKeyGitHub);
                getPromise.then(result => {
                    this.setData(result)
                }, () => {
                    this.error = 'An error occured';
                });
                return getPromise;
            },
            setData(theData) {
                console.log('Lines per dev data:');
                console.log(theData);
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