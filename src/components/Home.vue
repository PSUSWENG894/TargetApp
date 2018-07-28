<template>
<div>
    Welcome {{initialGitOrg}}, to your Travis CI Dashboard. Use the Navigation menu on the left to explore your repositories' build information and user contributions.
</div>
</template>

<script>
export default {
    props: {
        initialGitOrg: String
    }
}
</script>

<style scoped>

</style>
