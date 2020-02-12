<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import errorMixin from '../mixins/error.mixin';

export default {
  mixins: [errorMixin]
}
</script>