<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Menu_Planning'|localize }}</h3>
      <h4>{{ info.bill | currencyFilter }}</h4>
    </div>

    <app-loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      {{ 'NoCategories'|localize }}.
      <router-link to="/categories">{{ 'AddFirst'|localize }}</router-link>
    </p>

    <section v-else>
      <div v-for="category in categories" :key="category.id">
        <p>
          <strong>{{ category.title }}:</strong>
          {{ category.spend | currencyFilter }} {{'Of'|localize}} {{ category.limit | currencyFilter }}
        </p>
        <div class="progress" v-tooltip="category.tooltip">
          <div
            class="determinate"
            :style="{ width: category.progressPercent + '%'}"
            :class="[ category.progressColor ]"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import currencyFilter from '../filters/currency.filter'
import localize from '../filters/localize.filter'

export default {
  name: 'planing',
  metaInfo() {
    return {
      title: this.$title('Menu_Planning')
    }
  },
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
        .filter(rec => rec.categoryId === cat.id)
        .filter(rec => rec.type === 'outcome')
        .reduce((total, record) => {
          return (total += +record.amount)
        }, 0)

      const percent = (100 * spend) / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor =
        percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'

      const tooltipValue = cat.limit - spend
      const tooltip = `${
        tooltipValue < 0 ? localize('MoreThan') : localize('Stayed')
      } ${currencyFilter(Math.abs(tooltipValue))}`
      console.log(tooltip)

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