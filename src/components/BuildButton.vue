<template>
<div class="build-button">
    <md-button class="md-accent md-raised" v-on:click="buildRepo"><md-icon>build</md-icon> Build Repo</md-button>
    <p v-if="error">{{error}}</p>
</div>
</template>

<script>
import TravisApiService from '../shared';
import * as constants from '../../config';

export default {
    props: {
        repositoryId: Number,
        travisAPIKey: String
    },
    data: function () {
        return {
            buildId: null,
            error: null,
            apiService: null,
            method: "requests"
        }
    },
    mounted() {},
    methods: {
        buildRepo() {
            const messageBody = `${constants.buildMasterBody}`;
            const url = `${constants.apiURL}/repo/${this.repositoryId}/${this.method}`;
            this.apiService = new TravisApiService();
            this.apiService.post(url, messageBody, this.travisAPIKey).then(result => {
                this.buildId = result.request.id
            }, () => {
                alert('An error occured');
            });
            alert('Successfully sent build request to Travis-CI.org');
        }
    }
};
</script>

<style lang="scss" scoped>
.build-button {
    display: block;
}
</style>
