<template>
<div class="site-button">
    <md-button class="md-accent md-raised" v-on:click="visitSite">Visit Site</md-button>
    <p v-if="error">{{error}}</p>
</div>
</template>

<script>
import GitHubApiService from "../shared/github.api.service";
import * as constants from '../../config';

export default {
    props: {
        targetRepository: String,
        gitAPIKey: String,
        gitOrg: String
    },
    data: function () {
        return {
            siteUrl: null,
            error: null,
            apiService: null,
            method: "requests"
        }
    },
    mounted() {},
    methods: {
        visitSite() {
            const url = `${constants.apiURLGitHub}/repos/${this.gitOrg}/${this.targetRepository}/contents/.travis.yml`;
            this.apiService = new GitHubApiService();
            this.apiService.get(url, this.gitAPIKey).then(result => {
                var base64Content = result.content;
		var content = atob(base64Content);
		if (content.includes("provider: heroku")) {
                    var regEx = /app:(.*)?$/m;
                    var found = content.match(regEx);
                    var appName = found[1];
                    appName = appName.trim();
                    this.siteUrl = `https://${appName}.herokuapp.com`;
                    window.open(this.siteUrl, '_blank');
		} else if (content.includes("provider: pages")) {
                    this.siteUrl = `https://${this.gitOrg}.github.io/${this.targetRepository}`;
                    window.open(this.siteUrl, '_blank');
		} else {
                    alert('An unknown provider was found');
		}
            }, () => {
                alert('An error occured');
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.site-button {
    display: block;
}
</style>
