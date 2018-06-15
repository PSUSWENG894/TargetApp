<template>
  <div id="app">
  <img src="./assets/logo.png">
   <form v-if="!isAuthenticated" novalidate class="md-layout">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">API Key</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="api-key">Travis CI Api Key</label>
                <md-input name="api-key" id="api-key" v-model="form.apiKey" autocomplete="off" :disabled="isAuthenticated" />
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-card-actions>
          <md-button class="md-primary" :disabled="isAuthenticated" v-on:click="checkForm">Submit Api Key</md-button>
        </md-card-actions>
      </md-card>
    </form>
    <BuildInformation v-if="isAuthenticated" targetRepository="PSUSWENG894%2FTravisCI-Lambda" method="builds" v-bind:apiKey="form.apiKey"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import BuildInformation from './components/BuildInformation'
export default {
  name: 'app',
  components: {
    HelloWorld,
    BuildInformation
  },
  data: () => ({
      form: {
        apiKey: null,
      },
      isAuthenticated: false
    }),
  methods: {
    checkForm(){
      if (this.form.apiKey) { this.isAuthenticated = true; }
      return true;
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
  margin-top: 60px;
}
</style>
