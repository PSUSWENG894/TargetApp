<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand"
        :to="{ name: 'dashboard' }">
        conduit
      </router-link>
      <ul v-if="!isAuthenticated" class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'auth' }">
            <i class="ion-compose"></i>Authenticate
          </router-link>
        </li>
      </ul>
      <ul v-else class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'dashboard' }">
            Dashboard
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'RwvHeader',
    computed: {
      ...mapGetters([
        'currentUser',
        'isAuthenticated'
      ])
    }
  }
</script>
