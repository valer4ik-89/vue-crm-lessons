<template>
  <div>
    <app-loader v-if="loading" />
    <div class="app-main-layout" v-else>
      <app-navbar @click="isOpen = !isOpen" />

      <app-sidebar v-model="isOpen" />

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <transition name="fade" mode="out-in">
            <router-view />
          </transition>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          class="btn-floating btn-large blue"
          to="/record"
          v-tooltip:left="'Создать новую запись'"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
import AppNavbar from "../components/app/AppNavbar";
import AppSidebar from "../components/app/AppSidebar";
import errorMixin from "../mixins/error.mixin";

export default {
  name: "main-layout",
  mixins: [errorMixin],
  data() {
    return {
      isOpen: true,
      loading: true
    };
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }
    this.loading = false;
  },
  components: {
    AppNavbar,
    AppSidebar
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>