<template>
<div>
    <md-tabs v-if="loaded">
        <md-tab v-for="repo in repositories" v-bind:key="repo.id" v-bind:id="repo.name" v-bind:md-label="repo.name">
            <BuildInformation v-bind:targetRepository="getRepoHref(repo)" v-bind:apiKey="apiKey" />
        </md-tab>
    </md-tabs>
    <p v-if="error">{{error}}</p>
</div>
</template>

<script>
import BuildInformation from './BuildInformation'
import TravisApiService from '../shared';
import * as constants from '../../config';

export default {
    components: {
        BuildInformation
    },
    props: {
        apiKey: String,
        organization: String,
    },
    data: function () {
        return {
            repositories: null,
            loaded: false,
            error: null,
            apiService: null
        }
    },
    mounted() {
        this.apiService = new TravisApiService();
        const url = `${constants.apiURL}/owner/${this.organization}/repos`;
        this.apiService.get(url, this.apiKey).then(result => {
            this.repositories = result.repositories;
            this.loaded = true;
        }, error => this.error = error);
    },
    methods: {
        getRepoHref(repo) {
            return repo['@href'];
        }
    }
}
</script>

<style scoped>

</style>
