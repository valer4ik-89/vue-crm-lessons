<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <app-loader v-if="loading" />

    <p class="center" v-else-if="!recordsReverse.length">
      Записей пока что нет.
      <router-link to="record">Сделайте первую запись</router-link>
    </p>

    <section v-else>
      <history-table :records="recordsReverse" />
    </section>
  </div>
</template>

<script>
import HistoryTable from "../components/HistoryTable";

export default {
  name: "history",
  data: () => ({
    loading: true,
    records: [],
    categories: []
  }),
  async mounted() {
    const records = await this.$store.dispatch("fetchRecords");
    this.categories = await this.$store.dispatch("fetchCategories");
    this.records = records.map(record => {
      return {
        ...record,
        categoryName: this.categories.find(c => c.id == record.categoryId)
          .title,
        typeClass: record.type === "income" ? "green" : "red",
        typeText: record.type === "income" ? "Доход" : "Расход"
      };
    });
    this.loading = false
  },
  computed: {
    recordsReverse() {
      return this.records.slice().reverse();
    }
  },
  components: {
    HistoryTable
  }
};
</script>