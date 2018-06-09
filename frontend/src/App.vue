<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <BuildInformation targetRepository="PSUSWENG894%2FTravisCI-Lambda" method="builds"/>
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
