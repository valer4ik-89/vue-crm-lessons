<template>
  <div>
    <div class="page-title">
      <h3>{{"Bill" | localize}}</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <app-loader v-if="loading" />

    <div class="row" v-else>
      <home-bill :rates="currency.rates" />

      <home-currency :rates="currency.rates" :date="currency.date" />
    </div>
  </div>
</template>

<script>
import HomeBill from '../components/HomeBill'
import HomeCurrency from '../components/HomeCurrency'

export default {
  name: 'Home',
  metaInfo() {
    return {
      title: this.$title('Menu_Bill')
    }
  },
  data() {
    return {
      loading: true,
      currency: null
    }
  },
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  },
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  },
  components: {
    HomeBill,
    HomeCurrency
  }
}
</script>

