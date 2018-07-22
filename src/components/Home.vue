<template>
<div>
    Welcome {{organization}}, to your Travis CI Dashboard. Use the Navigation menu on the left to explore your repositories' build information and user contributions.
</div>
</template>

<script>
export default {
    props: {
        organization: String
    }
}
</script>

<style scoped>

</style>
