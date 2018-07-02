<template>
<div id="app">
    <router-view></router-view>
    <!-- <Repositories v-if="isAuthenticated" v-bind:apiKey="form.apiKey" v-bind:organization="form.organization" v-bind:apiKeyGitHub="form.apiKeyGitHub" /> -->
</div>
</template>

<script>
export default {
    name: 'app',
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
