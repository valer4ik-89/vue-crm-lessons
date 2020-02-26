<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Categories' | localize }}</h3>
    </div>
    <section>
      <app-loader v-if="loading" />
      <div class="row" v-else>
        <category-create @created="addNewCategory" />

        <category-edit
          v-if="categories.length"
          :categories="categories"
          :key="updateCount"
          @updated="updateCategories"
        />
        <p class="center" v-else>{{ 'NoCategories' | localize }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "../components/CategoryCreate";
import CategoryEdit from "../components/CategoryEdit";

export default {
  name: "categories",
  metaInfo() {
    return {
      title: this.$title("Menu_Categories")
    };
  },
  data() {
    return {
      categories: [],
      loading: true,
      updateCount: 0
    };
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");

    this.loading = false;
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
      this.updateCount++;
    },
    updateCategories(category) {
      const idx = this.categories.findIndex(c => c.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      this.updateCount++;
    }
  },
  components: {
    CategoryCreate,
    CategoryEdit
  }
};
</script>

