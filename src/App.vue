<template>
<div id="app">
    <rwv-header></rwv-header>
    <router-view></router-view>
</div>
</template>

<script>
import RevHeader from '@/components/TheHeader'
export default {
    name: 'app',
    components: {
      RwvHeader
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
