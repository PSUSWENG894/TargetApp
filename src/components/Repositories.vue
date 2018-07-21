<template>
<div>
    <md-tabs v-if="loaded">
        <md-tab v-for="repo in repositories" v-bind:key="repo.id" v-bind:id="repo.name" v-bind:md-label="repo.name">
            <BuildInformation v-bind:targetRepository="getRepoHref(repo)" v-bind:apiKey="apiKey"/>
        </md-tab>
        <md-tab v-if="loaded" md-label="GitHub">
            <GitHubInformation v-bind:apiKeyGitHub="apiKeyGitHub" v-bind:organization="organization"/>
        </md-tab>
        <md-tab v-if="loaded" md-label="BuildAllRepos">
            <md-button v-if="loaded" class="md-accent md-raised" v-on:click="buildAll()">Build All Repos</md-button>
        </md-tab>
        <md-tab v-if="loaded" md-label="Contributions">
            <DeveloperContributions v-bind:apiKeyGitHub="apiKeyGitHub" v-bind:organization="organization"/>
        </md-tab>
    </md-tabs>
    <p v-if="error">{{error}}</p>
</div>
</template>

<script>
import BuildInformation from './BuildInformation'
import TravisApiService from '../shared';
import * as constants from '../../config';
import GitHubInformation from "./GitHubInformation";
import DeveloperContributions from "./DeveloperContributions";

export default {
    components: {
        GitHubInformation,
        BuildInformation,
        DeveloperContributions
    },
    props: {
        apiKey: String,
        organization: String,
        apiKeyGitHub: String,
    },
    data: function () {
        return {
            repositories: null,
            loaded: false,
            error: null,
            needsReload: false,
            apiService: null
        }
    },
    mounted() {
        this.apiService = new TravisApiService();
        const url = `${constants.apiURL}/owner/${this.organization}/repos`;
        this.apiService.get(url, this.apiKey).then(result => {
            this.repositories = result.repositories;
            console.log(this.repositories);
            this.loaded = true;
        }, error => this.error = error);
    },
    methods: {
        getRepoHref(repo) {
            return repo['@href'];
        },
        buildAll(){
            const url = `${constants.apiURL}/owner/${this.organization}/repos`;
            this.apiService.get(url, this.apiKey).then(result => {
                var repos = result.repositories;
                const messageBody = `${constants.buildMasterBody}`;
                var index;
                for (index = 0; index < repos.length; index++) {
                    var url = `${constants.apiURL}${repos[index]['@href']}/requests`;
                    this.apiService.post(url, messageBody, this.apiKey).then(result => {
                        if (!this.needsReload) {
                            this.needsReload = result.request.id > 0;
                        }
                    }, () => {
                        var errorMessage = "An error occurred and no result was found for " + repos[index].name + ", likely repository was deleted.";
                        alert(errorMessage);
                    }, error => {
                        console.log(error);
                        alert(error);
                    });
                }
                alert('Successfully sent build request to Travis-CI.org for all repos.');
            }, error => {
                console.log(error)
                alert(error);
            });
        }
    }
}
</script>

<style scoped>

</style>
