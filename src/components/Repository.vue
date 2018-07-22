<template>
<div>
     <BuildInformation v-bind:repositoryId="repositoryId" v-bind:apiKey="apiKey"/>
</div>
</template>

<script>
import BuildInformation from './BuildInformation'

export default {
    components: {
        BuildInformation
    },
    props: {
        apiKey: String,
        organization: String,
        apiKeyGitHub: String,
        name: String,
        repositoryId: Number
    },
}
</script>

<style scoped>

</style>
