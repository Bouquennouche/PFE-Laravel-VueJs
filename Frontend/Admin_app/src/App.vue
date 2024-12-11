<template>
  <div id="app" class="app d-flex">
    <sidebar-vue v-if="!isLoginRoute" />
    <router-view />
  </div>
</template>

<script>
import SidebarVue from "./components/Sidebar.vue";

export default {
  name: "app",
  components: { SidebarVue },
  computed: {
    isLoginRoute() {
      return this.$route.name == "login";
    },
  },
};
</script>

<style lang="scss">
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
