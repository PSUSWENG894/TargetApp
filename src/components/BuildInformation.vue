<template>
<div class="display-items">
    <md-tabs md-sync-route>
        <md-tab id="tab-home" md-label="Builds">
            <md-card md-with-hover>

                <md-card-header class="flex-container">
                    <div class="md-title">Last Updated: {{lastReload.toLocaleTimeString()}}</div>
                    <div style="margin-left: 50px; margin-top: 8px; flex: 1;">
                        <div class="flex-container" style="float: right;">
                            <md-switch type="checkbox" v-model="autoReload">AutoReload</md-switch>
                            <div style="margin-right: 10px">
                                <SiteButton v-if="loaded" v-bind:targetRepository="targetRepository" v-bind:gitAPIKey="gitAPIKey" v-bind:gitOrg="gitOrg"/>
                            </div>
                            <BuildButton v-if="loaded" v-bind:targetRepository="targetRepository" v-bind:travisAPIKey="travisAPIKey" />
                        </div>
                    </div>
                </md-card-header>
                <md-table>
                    <md-table-row>
                        <md-table-head md-numeric>Build Number</md-table-head>
                        <md-table-head>Created By</md-table-head>
                        <md-table-head>State</md-table-head>
                        <md-table-head>Commit Message</md-table-head>
                        <md-table-head>Revert Build</md-table-head>
                    </md-table-row>

                    <md-table-row v-for="build in info" v-bind:key="build.id">
                        <md-table-cell md-numeric>{{build.number}}</md-table-cell>
                        <md-table-cell>{{build.created_by.login}}</md-table-cell>
                        <md-table-cell>{{build.state}}</md-table-cell>
                        <md-table-cell>{{build.commit.message}}</md-table-cell>
                        <md-table-cell>
                            <md-button class="md-icon-button md-primary" v-on:click="redeployBuild(build.id)">
                                <md-icon>unarchive</md-icon>
                                <md-tooltip>Redeloy Build</md-tooltip>
                            </md-button>
                        </md-table-cell>
                    </md-table-row>
                </md-table>
            </md-card>
        </md-tab>
        <md-tab id="tab-pages" md-label="Metrics">
            <div class="metric-container">
                <PassFailChart v-if="loaded" v-bind:passCount="passCount" v-bind:failCount="failCount" />
            </div>
            <div class="metric-container">
                <LineChart style="background-color: white" v-if="loaded" v-bind:chartData="buildTimeChartDataSuccess" v-bind:options="buildTimeChartOptionsSuccess" />
            </div>
            <div class="metric-container">
                <LineChart style="background-color: white" v-if="loaded" v-bind:chartData="buildTimeChartDataUnsuccess" v-bind:options="buildTimeChartOptionsUnsuccess" />
            </div>
        </md-tab>
    </md-tabs>
    <p v-if="error">{{error}}</p>
</div>
</template>

<script>
import LineChart from './LineChart';
import PassFailChart from './PassFailChart';
import BuildButton from './BuildButton';
import SiteButton from './SiteButton';
import TravisApiService from '../shared';
import * as constants from '../../config';

export default {
    components: {
        PassFailChart,
        BuildButton,
        SiteButton,
        LineChart,
    },
    props: {
        targetRepository: String,
        travisAPIKey: String,
        repositoryId: Number,
        gitAPIKey: String,
        gitOrg: String
    },
    data: function () {
        return {
            info: null,
            error: null,
            failCount: 0,
            passCount: 0,
            apiService: null,
            method: "builds",
            loaded: false,
            startTime: new Date().getTime(),
            timeBetweenCalls: 300000, //ms
            autoReload: true,
            lastReload: new Date(),
            buildTimeChartDataSuccess: null,
            buildTimeChartOptionsSuccess: null,
            buildTimeChartDataUnsuccess: null,
            buildTimeChartOptionsUnsuccess: null,
        }
    },
    methods: {
        async fetchData() {

            const url = `${constants.apiURL}/repo/${this.repositoryId}/${this.method}?limit=100`;
            const getPromise = this.apiService.get(url, this.travisAPIKey);
            getPromise.then(result => {
                this.setData(result);
            }, () => {
                this.error = 'An error occurred';
            });
            return getPromise;
        },
        redeployBuild(buildId) {
            const url = `${constants.apiURL}/build/${buildId}/restart`;
            const postPromise = this.apiService.post(url, '', this.travisAPIKey);
            postPromise.then(result => {
                console.log(result)
            }, (error) => console.log(error));
        },
        setData(theData) {
            const passedKey = 'passed';
            this.info = theData.builds;
            this.failCount = this.info.filter(x => x.state !== passedKey).length;
            this.passCount = this.info.filter(x => x.state === passedKey).length;

            this.updateBuildTimeChartData(theData.builds);

            this.loaded = true;

            if (this.autoReload) {
                let date = new Date();
                setTimeout(this.fetchData, this.timeBetweenCalls);
                this.lastReload = date;
            }
        },
        updateBuildTimeChartData(builds) {

            let successData = [];
            let unsuccessfulData = [];
            let successLabels = [];
            let unsuccessLabels = [];
            builds.forEach((build) => {
                if (build.state === 'passed') {
                    successData.push(build.duration);
                    successLabels.push(new Date(build.finished_at).toDateString());
                } else {
                    unsuccessfulData.push(build.duration);
                    unsuccessLabels.push(new Date(build.finished_at).toDateString());
                }
            });

            successData.reverse();
            successLabels.reverse();
            unsuccessfulData.reverse();
            unsuccessLabels.reverse();

            this.buildTimeChartDataSuccess = {
                labels: successLabels,
                datasets: [{
                    label: 'Build Time in seconds (Successful only)',

                    borderColor: '#00ff00',
                    borderWidth: 5,
                    data: successData,
                }, ]
            };
            this.buildTimeChartOptionsSuccess = {
                responsive: true,
                maintainAspectRatio: false
            };

            this.buildTimeChartDataUnsuccess = {
                labels: unsuccessLabels,
                datasets: [{
                    label: 'Build Time in seconds (Unsuccessful only)',
                    borderColor: '#ff0000',
                    borderWidth: 5,
                    data: unsuccessfulData,
                }, ]
            };
            this.buildTimeChartOptionsUnsuccess = {
                responsive: true,
                maintainAspectRatio: false
            };
        },
    },
    mounted() {
        this.apiService = new TravisApiService();
        this.fetchData();
    },
    watch: {
        'autoReload': function (newVal, oldVal) {
            if (oldVal === false && newVal === true) {
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

.flex-container {
    display: flex;
}

.display-items {
    display: inline;
}

.metric-container {
    margin: 10px;
}
</style>
