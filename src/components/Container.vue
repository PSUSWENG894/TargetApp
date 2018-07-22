<template>
<md-app md-waterfall md-mode="fixed-last">
    <md-app-toolbar class="md-med md-primary">
        <div class="md-toolbar-row">
            <div class="md-toolbar-section-start">
                <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                    <md-icon>menu</md-icon>
                </md-button>
                <div class="md-list-item-text">
                    <span class="md-title">DevOps Dashboard</span>
                    <span v-if="selectedRepo" class="md-sub-title">{{selectedRepo.name}}</span>
                </div>
            </div>
        </div>
    </md-app-toolbar>

    <md-app-drawer :md-active.sync="menuVisible" md-persistent="full">
        <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>
        <GitHubInformation v-bind:apiKeyGitHub="apiKeyGitHub" v-bind:organization="organization" v-on:nav-repo="changeRepository($event)" />
    </md-app-drawer>

    <md-app-content>
        <router-view :key="$route.fullPath"></router-view>
    </md-app-content>
</md-app>
</template>

<style lang="scss" scoped>
.md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
}

.md-app {
    height: 100vh;
}

.md-sub-title {
    margin-left: 8px;
}
</style>

<script>
import GitHubInformation from "./GitHubInformation";
import TravisApiService from '../shared';
import * as constants from '../../config';

export default {
    name: "Container",
    components: {
        GitHubInformation
    },
    props: {
        apiKey: String,
        organization: String,
        apiKeyGitHub: String
    },
    data: () => ({
        menuVisible: false,
        selectedRepo: null,
        repositories: null
    }),
    mounted() {
        this.apiService = new TravisApiService();
        const url = `${constants.apiURL}/owner/${this.organization}/repos`;
        this.apiService.get(url, this.apiKey).then(result => {
            this.repositories = result.repositories;
        }, error => this.error = error);
    },
    methods: {
        changeRepository(repo) {
            this.selectedRepo = repo;
            const repositoryId = this.repositories.find(x => x.github_id === repo.id).id;
            // console.log(`Selected Id: ${repositoryId}`);
            const params = {
                name: this.selectedRepo.name,
                apiKey: this.apiKey,
                organization: this.organization,
                apiKeyGitHub: this.apiKeyGitHub,
                repositoryId: repositoryId
            };
            this.$router.push({
                name: 'repo',
                params: params
            });
        }
    }
};
</script>
