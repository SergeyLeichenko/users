<template>
  <b-form @submit.prevent="onSubmit">
    <b-form-group id="input-group-2" label="Ім'я:" label-for="input-2">
      <b-form-input
        id="input-2"
        v-model.trim="form.name"
        placeholder="Введіть ім'я"
        required
      />
      <small v-show="!validation.name" class="error-message">
        Ім'я не може бути пустим!
      </small>
    </b-form-group>

    <b-form-group id="input-group-1" label="Email:" label-for="input-1">
      <b-form-input
        id="input-1"
        v-model="form.email"
        type="email"
        placeholder="Введіть email"
        required
      />
      <small v-show="!validation.email" class="error-message">
        Укажіть дійсну електронну адресу.
      </small>
    </b-form-group>

    <b-button type="submit" variant="primary" class="mt-4" :disabled="!validation.name || !validation.email">Додати</b-button>
  </b-form>
</template>

<script>
const emailRE = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
  data() {
    return {
      form: {
        name: "",
        email: null
      }
    }
  },
  computed: {
    validation: function () {
      return {
        name: !!this.form.name.trim(),
        email: emailRE.test(this.form.email)
      }
    },
    isValid: function () {
      let validation = this.validation
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  },
  methods: {
    onSubmit() {
      if (!this.isValid) {
        return
      }
      this.$emit('onSubmit', this.form)
    }
  }
}
</script>

<style>
.error-message {
  color: red;
}
</style>