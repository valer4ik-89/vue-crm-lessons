<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p class="currency-line">
          <span>{{ userBill | currencyFilter() }}</span>
        </p>
        <p 
          class="currency-line"
          v-for="(currency, idx) in rates"
          :key="idx"
          >
          <span>{{ getCurrency(currency.val) | currencyFilter(currency.to) }} </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates'],
  data() {
    return {
      userCurrency: "UAH"
    }
  },
  computed: {
    userBill(){ 
      return this.$store.getters.info.bill
    }
  },
  methods: {
    getCurrency(currency){
      return this.userBill * currency
    },

  }
}
</script>