<template>
<div>
    <BuildInformation v-bind:targetRepository="targetRepository" v-bind:repositoryId="repositoryId" v-bind:travisAPIKey="travisAPIKey" v-bind:gitAPIKey="gitAPIKey" v-bind:gitOrg="gitOrg"/>
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
        targetRepository: String,
        repositoryId: Number
    },
    mounted() {
        console.log(this.props);
    }
}
</script>

<style scoped>

</style>
