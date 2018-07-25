<template>
<div>

    <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
            <div class="md-title">API Key</div>
        </md-card-header>

        <md-card-content>
            <form class="md-layout md-gutter" novalidate>
                <div class="md-layout-item md-small-size-100">
                    <md-field>
                        <label for="api-key">GitHub Organization</label>
                        <md-input name="organization" id="organization" v-model="form.organization" autocomplete="off" />
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100">
                    <md-field>
                        <label for="api-key">Travis CI Api Key</label>
                        <md-input name="api-key" id="api-key" v-model="form.apiKey" autocomplete="off" type="password" />
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100">
                    <md-field>
                        <label for="api-key-github">GitHub Api Token</label>
                        <md-input name="api-key-github" id="api-key-github" v-model="form.apiKeyGitHub" autocomplete="off" type="password" />
                    </md-field>
                </div>
            </form>
        </md-card-content>

        <md-card-actions>
            <md-button class="md-primary" v-on:click="checkForm">Login</md-button>
        </md-card-actions>
    </md-card>

</div>
</template>

<script>
export default {
    data: () => ({
        form: {
            apiKey: null,
            organization: null,
            apiKeyGitHub: null
        },
        apiService: null
    }),
    methods: {
        checkForm() {
            if (this.form.apiKey && this.form.organization && this.form.apiKeyGitHub) {
                //Navigate to dashboard
                const params = {
                    gitOrg: this.form.organization,
                    initialGitOrg: this.form.organization,
                    initialGitAPIKey: this.form.apiKeyGitHub,
                    initialTravisAPIKey: this.form.apiKey,
                };

                this.$store.commit('setGitOrg', params.initialGitOrg)
                this.$store.commit('setGitAPI', params.initialGitAPIKey)
                this.$store.commit('setTravisAPI', params.initialTravisAPIKey)

                this.$router.push({
                    name: 'dashboard-home',
                    params: params
                });
            } else {
                alert('Must complete entire Authorization form to Login.')
            }

        }
    },
    mounted() {
        if (this.$store.state.gitOrgName && this.$store.state.gitAPIKey && this.$store.state.travisAPIKey) {
            const params = {
                gitOrg: this.$store.state.gitOrgName,
                initialGitOrg: this.$store.state.gitOrgName,
                initialGitAPIKey: this.$store.state.gitAPIKey,
                initialTravisAPIKey: this.$store.state.travisAPIKey,
            };

            this.$router.push({
                    name: 'dashboard-home',
                    params: params
            });
        }
    },
}
</script>

<style scoped>

</style>
