<template>
<div>
    <BuildInformation v-bind:repositoryId="repositoryId" v-bind:travisAPIKey="travisAPIKey" />
</div>
</template>

<script>
import BuildInformation from './BuildInformation'

export default {
    components: {
        BuildInformation
    },
    props: {
        travisAPIKey: String,
        gitOrg: String,
        gitAPIKey: String,
        name: String,
        repositoryId: Number
    },
}
</script>

<style scoped>

</style>
