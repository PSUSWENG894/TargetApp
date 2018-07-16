<template>
  <div>
    <router-link to="/dashboard" v-if="isLoggedIn">Dashboard</router-link>
    <router-link to="/login" v-if="!isLoggedIn">Login</router-link>
    <a href="#" v-if="isLoggedIn" @click="logout">Logout</a> 
  </div>   
</template>

<script>
export default {
  name: 'main-nav',
  props: {
    isLoggedIn: String
  },
  data: function() {
    return {
      isLoggedIn: null
    }
  },
  mounted() {},
  methods: {
    logout() {
     this.$store.dispatch('logout');
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  display: inline;
}
</style>
