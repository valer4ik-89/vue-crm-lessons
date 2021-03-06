<template>
  <div>
    <div class="page-title">
      <h3>{{"Menu_NewRecord" | localize}}</h3>
    </div>

    <app-loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      {{ "NoCategories" | localize }}
      <router-link to="/categories">{{ "AddFirst" | localize }}</router-link>
    </p>
    <form class="form" v-else @submit.prevent="onCreateRecord">
      <div class="input-field">
        <select ref="select" v-model="currentCategory">
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.title }}</option>
        </select>
        <label>{{ 'SelectCategory' | localize }}</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" v-model="type" />
          <span>{{ 'Income' | localize }}</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" v-model="type" />
          <span>{{ 'Outcome' | localize }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: ($v.amount.$dirty && !$v.amount.minValue)}"
        />
        <label for="amount">{{ 'Amount'|localize }}</label>
        <span
          class="helper-text invalid"
          v-if="($v.amount.$dirty && !$v.amount.minValue)"
        >{{ 'Message_MinValue'|localize }} {{ $v.amount.$params.minValue.min }}</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: ($v.description.$dirty && !$v.description.required)}"
        />
        <label for="description">{{ 'Description'|localize }}</label>
        <span
          class="helper-text invalid"
          v-if="($v.description.$dirty && !$v.description.required)"
        >{{ 'Message_EnterDescription'|localize }}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Create'|localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  name: 'Record',
  metaInfo() {
    return {
      title: this.$title('Menu_NewRecord')
    }
  },
  data() {
    return {
      loading: true,
      categories: [],
      currentCategory: null,
      select: null,
      type: 'outcome',
      amount: 1,
      description: ''
    }
  },
  validations: {
    amount: { minValue: minValue(1) },
    description: { required }
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type == 'income') {
        return true
      }
      return this.info.bill >= this.amount
    }
  },
  methods: {
    async onCreateRecord() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.currentCategory,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })

          const bill =
            this.type === 'income'
              ? this.info.bill + this.amount
              : this.info.bill - this.amount

          await this.$store.dispatch('updateInfo', { bill })
          this.$message('Запись успешно создана')
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (error) {}
      } else {
        this.$message(
          `Нема, детка, денег (нехватает ${this.amount - this.info.bill})...`
        )
      }
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false

    if (this.categories.length) {
      this.currentCategory = this.categories[0].id
    }

    setTimeout(() => {
      M.updateTextFields()
      this.select = M.FormSelect.init(this.$refs.select)
    }, 0)
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>