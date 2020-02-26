<template>
  <div>
    <div class="page-title">
      <h3>{{ "History_Title" | localize }}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <app-loader v-if="loading" />

    <p class="center" v-else-if="!recordsReverse.length">
      {{ "NoRecords" | localize }}.
      <router-link to="record">{{ "AddFirst" | localize }}</router-link>
    </p>

    <section v-else>
      <history-table :records="items" />

      <paginate
        class="center"
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Back' | localize"
        :next-text="'Forward' | localize"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      ></paginate>
    </section>
  </div>
</template>

<script>
import paginetionMixin from '../mixins/pagination.mixin'
import localize from '../filters/localize.filter'
import HistoryTable from '../components/HistoryTable'
import { Bar } from 'vue-chartjs'

export default {
  name: 'history',
  metaInfo() {
    return {
      title: this.$title('Menu_History')
    }
  },
  extends: Bar,
  mixins: [paginetionMixin],
  data: () => ({
    loading: true,
    records: []
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.setup(categories)
    this.loading = false
  },
  methods: {
    setup(categories) {
      this.setupPagination(
        this.records.map(record => {
          return {
            ...record,
            categoryName: categories.find(c => c.id == record.categoryId).title,
            typeClass: record.type === 'income' ? 'green' : 'red',
            typeText:
              record.type === 'income'
                ? localize('Income')
                : localize('Outcome')
          }
        })
      )
      this.renderChart({
        labels: categories.map(c => c.title),
        datasets: [
          {
            label: localize('CostsForCategories'),
            data: categories.map(c => {
              return this.records.reduce((total, r) => {
                if (r.categoryId == c.id && r.type === 'outcome') {
                  total += r.amount
                }
                return total
              }, 0)
            }),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      })
    }
  },
  computed: {
    recordsReverse() {
      return this.records.slice().reverse()
    }
  },
  components: {
    HistoryTable
  }
}
</script>

