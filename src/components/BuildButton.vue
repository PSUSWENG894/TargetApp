<template>
<div class="build-button">
    <md-h2>Press the button below to build this repository in Travis-CI.</md-h2>
    <br></br>
    <md-button class="md-accent md-raised" v-on:click="buildRepo">Build Repo</md-button>
    <br></br>
    <p v-if="error">{{error}}</p>
    <br></br>
</div>
</template>


<script>
import TravisApiService from '../shared';
import * as constants from '../../config';

export default {
    props: {
        targetRepository: String,
        apiKey: String
    },
    data: function () {
        return {
            buildId: null,
            error: null,
            apiService: null,
            method: "requests"
        }
    },
    mounted() {
    },
    methods: {
        buildRepo(){
            const messageBody = `${constants.buildMasterBody}`;
            const url = `${constants.apiURL}${this.targetRepository}/${this.method}`;
            this.apiService = new TravisApiService();
            GitHubApiService.post(url, messageBody, this.apiKey).then(result => {
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
