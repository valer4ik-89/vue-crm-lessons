<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ info.bill | currencyFilter }}</h4>
    </div>

    <app-loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      Категорий пока что нет. <router-link to="/categories">Добавить новую категорию</router-link>
    </p>

    <section v-else>
      <div v-for="category in categories" :key="category.id">
        <p>
          <strong>{{ category.title }}:</strong>
          {{ category.spend | currencyFilter }} из {{ category.limit | currencyFilter }}
        </p>
        <div class="progress" v-tooltip="category.tooltip">
          <div 
            class="determinate" 
            :style="{ width: category.progressPercent + '%'}"
            :class="[ category.progressColor ]"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import currencyFilter from '../filters/currency.filter';

export default {
  name: 'planing',
  data() {
    return {
      loading: true,
      categories: []
    }
  },
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.categories = categories.map(cat => {
      const spend = records
        .filter( rec => rec.categoryId === cat.id )
        .filter( rec => rec.type === 'outcome' )
        .reduce((total, record) => {
          return total += +record.amount
        }, 0)
        
      const percent = 100 * spend / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60 
        ? 'green' 
        : percent < 100 
          ? 'yellow'
          : 'red'
      
      const tooltipValue = cat.limit - spend
      const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${ currencyFilter( Math.abs( tooltipValue ) ) }`
      console.log(tooltip);
      

      return {
        ...cat,
        spend,
        progressPercent,
        progressColor,
        tooltip
      }
    })

    this.loading = false
  }
}
</script>