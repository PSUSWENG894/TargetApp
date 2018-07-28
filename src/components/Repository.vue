<template>
<div>
    <BuildInformation v-bind:targetRepository="targetRepository" v-bind:repositoryId="repositoryId" v-bind:travisAPIKey="travisAPIKey" />
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
