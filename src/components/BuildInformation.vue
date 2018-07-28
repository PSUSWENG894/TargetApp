<template>
    <div class="display-items">
        <md-switch type="checkbox" v-model="autoReload">AutoReload</md-switch>
        <md-content>Last Updated: {{lastReload.toLocaleTimeString()}}</md-content>
        <PassFailChart v-if="loaded" v-bind:passCount="passCount" v-bind:failCount="failCount"/>
        <BuildButton v-if="loaded" v-bind:targetRepository="targetRepository" v-bind:apiKey="apiKey"/>
        <LineChart style="background-color: white" v-if="loaded" v-bind:chartData="buildTimeChartDataSuccess"
                   v-bind:options="buildTimeChartOptionsSuccess"/>
        <LineChart style="background-color: white" v-if="loaded" v-bind:chartData="buildTimeChartDataUnsuccess"
                   v-bind:options="buildTimeChartOptionsUnsuccess"/>
        <md-list v-if="loaded" id="wah" v-for="build in info" v-bind:key="build.id">
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
    import LineChart from './LineChart';
    import PassFailChart from './PassFailChart';
    import BuildButton from './BuildButton';
    import TravisApiService from '../shared';
    import * as constants from '../../config';

    export default {
        components: {
            PassFailChart,
            BuildButton,
            LineChart,
        },
        props: {
            targetRepository: String,
            travisAPIKey: String,
            repositoryId: Number
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
                this.apiService = new TravisApiService();

                const getPromise = this.apiService.get(url, this.travisAPIKey);
                getPromise.then(result => {
                    this.setData(result);
                }, () => {
                    this.error = 'An error occurred';
                });
                return getPromise;
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
                    datasets: [
                        {
                            label: 'Build Time in seconds (Successful only)',

                            borderColor: '#00ff00',
                            borderWidth: 5,
                            data: successData,
                        },
                    ]
                };
                this.buildTimeChartOptionsSuccess = {responsive: true, maintainAspectRatio: false};

                this.buildTimeChartDataUnsuccess = {
                    labels: unsuccessLabels,
                    datasets: [
                        {
                            label: 'Build Time in seconds (Unsuccessful only)',
                            borderColor: '#ff0000',
                            borderWidth: 5,
                            data: unsuccessfulData,
                        },
                    ]
                };
                this.buildTimeChartOptionsUnsuccess = {responsive: true, maintainAspectRatio: false};
            },
        },
        mounted() {
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

    .display-items {
        display: inline;
    }
</style>
