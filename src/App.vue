<template>
<div id="app">
    <form v-if="!isAuthenticated" novalidate class="md-layout">
        <md-card class="md-layout-item md-size-50 md-small-size-100">
            <md-card-header>
                <div class="md-title">API Key</div>
            </md-card-header>

            <md-card-content>
                <div class="md-layout md-gutter">
                   <div class="md-layout-item md-small-size-100">
                        <md-field>
                            <label for="api-key">GitHub Organization</label>
                            <md-input name="organization" id="organization" v-model="form.organization" autocomplete="off" :disabled="isAuthenticated" />
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100">
                        <md-field>
                            <label for="api-key">Travis CI Api Key</label>
                            <md-input name="api-key" id="api-key" v-model="form.apiKey" autocomplete="off" type="password" :disabled="isAuthenticated" />
                        </md-field>
                    </div>
                </div>
            </md-card-content>

            <md-card-actions>
                <md-button class="md-primary" :disabled="isAuthenticated" v-on:click="checkForm">Login</md-button>
            </md-card-actions>
        </md-card>
    </form>
    <Repositories v-if="isAuthenticated" v-bind:apiKey="form.apiKey" v-bind:organization="form.organization" />
</div>
</template>



<script>
import {
    BuildInformation,
    Repositories
} from './components'

export default {
    name: 'app',
    components: {
        BuildInformation,
        Repositories
    },
    data: () => ({
        form: {
            apiKey: null,
            organization: null,
        },
        isAuthenticated: false,
        apiService: null
    }),
    methods: {
        checkForm() {
            this.isAuthenticated = this.form.apiKey && this.form.organization;
        }
    }
}
</script>


<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.md-layout {
    justify-content: center;
}
</style>
