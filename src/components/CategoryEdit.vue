<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ 'Edit' | localize }}</h4>
      </div>

      <form @submit.prevent="onCategoryEdited">
        <div class="input-field">
          <select ref="select" v-model="currentCategory">
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.title }}</option>
          </select>
          <label>{{ 'SelectCategory' | localize }}</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{invalid: ($v.title.$dirty && !$v.title.required)}"
          />
          <label for="name">{{ 'Name' | localize }}</label>
          <span
            v-if="($v.title.$dirty && !$v.title.required)"
            class="helper-text invalid"
          >{{ 'Message_CategoryTitle' | localize }}</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: ($v.limit.$dirty && !$v.limit.minValue)}"
          />
          <label for="limit">{{ 'Limit' | localize }}</label>
          <span
            class="helper-text invalid"
            v-if="($v.limit.$dirty && !$v.limit.minValue)"
          >{{ 'Message_MinValue' | localize }} {{ $v.limit.$params.minValue.min }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ 'Update' | localize }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import localize from '../filters/localize.filter'

export default {
  props: ['categories'],
  data() {
    return {
      select: null,
      title: '',
      limit: 100,
      currentCategory: null
    }
  },
  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },
  methods: {
    async onCategoryEdited() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const categoryData = {
          id: this.currentCategory,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message(localize('Category_HasBeenUpdated'))
        this.$emit('updated', categoryData)
      } catch (error) {}
    }
  },
  watch: {
    currentCategory(catId) {
      const { title, limit } = this.categories.find(c => c.id === catId)
      this.title = title
      this.limit = limit
    }
  },
  created() {
    const { id, title, limit } = this.categories[0]
    this.currentCategory = id
    this.title = title
    this.limit = limit
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select)
    console.log(this.select)
    M.updateTextFields()
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>