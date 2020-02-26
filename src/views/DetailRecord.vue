<template>
  <div>
    <app-loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{"Menu_History" | localize}}</router-link>
        <a class="breadcrumb">{{ recordType }}</a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="[record.type == 'outcome' ? 'red' : 'green']">
            <div class="card-content white-text">
              <p>{{ "Description" | localize }}: {{ record.description }}</p>
              <p>{{ "Amount" | localize }}: {{ record.amount | currencyFilter}}</p>
              <p>{{ "Category" | localize }}: {{ record.categoryName }}</p>

              <small>{{ record.date | date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>Запись не найдена</p>
  </div>
</template>

<script>
import localize from '../filters/localize.filter'

export default {
  name: 'detail',
  metaInfo() {
    return {
      title: this.$title('Detail_Title')
    }
  },
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch(
      'fetchCategoryById',
      record.categoryId
    )

    this.record = {
      ...record,
      categoryName: category.title
    }

    this.loading = false
  },
  computed: {
    recordType() {
      return this.record.type == 'outcome'
        ? localize('Outcome')
        : localize('Income')
    }
  }
}
</script>