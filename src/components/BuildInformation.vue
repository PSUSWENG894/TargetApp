<template>
<div class="display-items">
    <PassFailChart v-if="loaded" v-bind:passCount="passCount" v-bind:failCount="failCount" />
    <BuildButton v-if="loaded" v-bind:targetRepository="targetRepository" v-bind:apiKey="apiKey" />
    <md-list v-if="loaded" v-for="build in info" v-bind:key="build.id">
        <md-list-item>
            <div class="md-list-item-text">
                <span>{{build.number}} - {{build.created_by.login}}</span>
                <span>{{build.state}}</span>
                <p>{{build.commit.message}}</p>
            </div>
        </md-list-item>
    </md-list>
    <p v-if="error">{{error}}</p>
</div>
</template>


<script>
import PassFailChart from './PassFailChart';
import BuildButton from './BuildButton';
import TravisApiService from '../shared';
import * as constants from '../../config';

export default {
    components: {
        PassFailChart,
	BuildButton
    },
    props: {
        targetRepository: String,
        apiKey: String
    },
    data: function () {
        return {
            info: null,
            error: null,
            failCount: 0,
            passCount: 0,
            loaded: false,
            apiService: null,
            method: "builds"
        }
    },
    mounted() {
        const url = `${constants.apiURL}${this.targetRepository}/${this.method}`;
        this.apiService = new TravisApiService();
        const passedKey = 'passed';
        this.apiService.get(url, this.apiKey).then(result => {
            this.info = result.builds
            this.failCount = this.info.filter(x => x.state !== passedKey).length
            this.passCount = this.info.filter(x => x.state === passedKey).length
            this.loaded = true
        }, () => {
            this.error = 'An error occured';
        })
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
