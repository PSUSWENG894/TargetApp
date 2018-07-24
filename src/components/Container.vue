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
        <md-toolbar class="md-transparent" md-elevation="0">
            <h3 class="md-title" style="flex: 1">Navigation</h3>
            <md-button class="md-icon-button" v-on:click="navigateTo('dashboard-home', defaultRouteParams, true)">
                <md-icon>home</md-icon>
            </md-button>
        </md-toolbar>
        <GitHubInformation v-bind:gitAPIKey="gitAPIKey" v-bind:gitOrg="gitOrg" v-on:nav-repo="changeRepository($event)" />
        <md-list>
            <md-list-item v-on:click="navigateTo('cont', defaultRouteParams)">
                <md-icon>group</md-icon>
                <span class="md-list-item-text">Contributions</span>
            </md-list-item>
        </md-list>
        <div class="footer">
            <md-button class="md-accent md-raised" v-on:click="buildAll()">Build All Repos</md-button>
        </div>
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

.footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
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
        initialGitOrg: String,
        initialGitAPIKey: String,
        initialTravisAPIKey: String,
    },
    // data: () => ({
    data: function() {
        return {
            menuVisible: true,
            selectedRepo: null,
            repositories: null,
            defaultRouteParams: null,
            gitOrg: (this.initialGitOrg ? this.initialGitOrg : this.$store.state.gitOrgName),
            gitAPIKey: (this.initialGitAPIKey ? this.initialGitAPIKey : this.$store.state.gitAPIKey),
            travisAPIKey: (this.initialTravisAPIKey ? this.initialTravisAPIKey : this.$store.state.travisAPIKey)
        }
    },
    mounted() {
        this.apiService = new TravisApiService();
        const url = `${constants.apiURL}/owner/${this.gitOrg}/repos`;
        this.apiService.get(url, this.travisAPIKey).then(result => {
            this.repositories = result.repositories;
        }, error => this.error = error);
        this.defaultRouteParams = {
            travisAPIKey: this.travisAPIKey,
            gitOrg: this.gitOrg,
            gitAPIKey: this.gitAPIKey
        }
    },
    methods: {
        changeRepository(repo) {
            this.selectedRepo = repo;
            const repositoryId = this.repositories.find(x => x.github_id === repo.id).id;
            // console.log(`Selected Id: ${repositoryId}`);
            const params = this.defaultRouteParams;
            params.name = this.selectedRepo.name;
            params.repositoryId = repositoryId;
            this.navigateTo('repo', params)
        },
        navigateTo(name, params, menuVisible = false) {
            console.log('Navigating to:', name)
            console.log('  With params:', params)
            this.$router.push({
                name: name,
                params: params
            });
            this.menuVisible = menuVisible;
        },
         buildAll(){
            const url = `${constants.apiURL}/owner/${this.gitOrg}/repos`;
            this.apiService.get(url, this.travisAPIKey).then(result => {
                var repos = result.repositories;
                const messageBody = `${constants.buildMasterBody}`;
                var index;
                for (index = 0; index < repos.length; index++) {
                    var url = `${constants.apiURL}${repos[index]['@href']}/requests`;
                    this.apiService.post(url, messageBody, this.travisAPIKey).then(result => {
                        if (!this.needsReload) {
                            this.needsReload = result.request.id > 0;
                        }
                    }, () => {
                        var errorMessage = "An error occurred and no result was found for " + repos[index].name + ", likely repository was deleted.";
                        alert(errorMessage);
                    }, error => {
                        // console.log(error);
                        alert(error);
                    });
                }
                alert('Successfully sent build request to Travis-CI.org for all repos.');
            }, error => {
                // console.log(error)
                alert(error);
            });
        }
    }
};
</script>
