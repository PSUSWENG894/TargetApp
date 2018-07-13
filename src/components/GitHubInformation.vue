<template>
  <div class="display-items">
      <md-switch type="checkbox" v-model="autoReload">AutoReload</md-switch>
      <br/>
      <md-list v-if="loaded" id="githubDump" v-for="repo in info" v-bind:key="repo.id">
          <md-list-item>
              <div class="md-list-item-text">
                  <span>{{repo.name}} - {{repo.language}}</span>
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
                loaded: false,
                startTime: new Date().getTime(),
                timeBetweenCalls: 300000, //ms
                autoReload: true,
            }
        },
        methods: {
            async fetchData() { ///orgs/:org/repos
                const url = `${constants.apiURLGitHub}/orgs/${this.organization}/${this.method}`;
                this.apiService = new GitHubApiService();

                const getPromise = this.apiService.get(url, this.apiKeyGitHub);
                getPromise.then(result => {
                    this.setData(result)
                }, () => {
                    this.error = 'An error occurred';
                });
                return getPromise;
            },
            setData(theData) {
                this.info = theData.data;
                this.loaded = true;

                if(this.autoReload) {
                    let now = new Date().getTime();
                    console.log('reload: ' + (now - this.startTime) + ' github');
                    setTimeout(this.fetchData, this.timeBetweenCalls - ((now - this.startTime) % this.timeBetweenCalls));
                }
            }
        },
        mounted() {
            this.fetchData();
        },
        watch: {
            'autoReload': function(newVal, oldVal) {
                console.log('value changed from ' + oldVal + ' to ' + newVal);
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
        display: inline;
    }
</style>