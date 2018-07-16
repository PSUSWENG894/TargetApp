<template>
<div>

    <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
            <div class="md-title">API Key</div>
        </md-card-header>

        <md-card-content>
            <form class="md-layout md-gutter" novalidate v-on:submit.prevent="onSubmit(organization, apiKey, apiKeyGitHub)">
                <div class="md-layout-item md-small-size-100">
                    <md-field>
                        <label for="organization">GitHub Organization</label>
                        <md-input name="organization" id="organization" v-model="organization" autocomplete="off" />
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100">
                    <md-field>
                        <label for="api-key">Travis CI Api Key</label>
                        <md-input name="api-key" id="api-key" v-model="apiKey" autocomplete="off" type="password" />
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100">
                    <md-field>
                        <label for="api-key-github">GitHub Api Token</label>
                        <md-input name="api-key-github" id="api-key-github" v-model="apiKeyGitHub" autocomplete="off" type="password" />
                    </md-field>
                </div>
                <button class="btn btn-lg btn-primary pull-xs-right">
                    Sign in
                </button>
            </form>
        </md-card-content>

//        <md-card-actions>
//            <md-button class="md-primary" v-on:click="checkForm">Login</md-button>
//        </md-card-actions>
    </md-card>

</div>
</template>

<script>
  import { mapState } from 'vuex'
  import { LOGIN } from '@/store/actions.type'
  export default {
    name: 'RwvLogin',
    data: () => ({
        return: {
            apiKey: null,
            organization: null,
            apiKeyGitHub: null
        }
    }),
    methods: {
      onSubmit (organization, apiKey, apiKeyGitHub) {
        this.$store
          .dispatch(LOGIN, { organization, apiKey, apiKeyGitHub })
          .then(() => this.$router.push({ name: 'dashboard' }))
      }
    },
    computed: {
      ...mapState({
        errors: state => state.auth.errors
      })
    }
  }
</script>

<style scoped>

</style>
