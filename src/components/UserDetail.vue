<template>
  <div>
    <table class="table">
      <tbody>
        <tr class="candidates-list">
          <td class="title">
            <div class="thumb text-center">
              <img class="img-fluid" :src="user_data.avatar" :alt="user_data.first_name">
            </div>
            <div class="candidate-list-details ml-4">
              <div class="candidate-list-info">
                <div class="candidate-list-title">
                  <h5 class="mb-0">{{ user_data.first_name }}</h5>
                </div>
                <div class="candidate-list-option">
                  <ul class="list-unstyled d-flex flex-column mb-4">
                    <li><strong>email:</strong> {{ user_data.email }}</li>
                    <li class="d-flex">
                      <strong>Телефон:</strong>
                    </li>
                    <li>
                      <strong>Адреса:</strong>
                    </li>
                  </ul>
                  <div class="form">
                    <div class="form-input d-flex flex-row mb-3">
                      <b-form-input type="number" placeholder="Номер телефону" />
                      <b-button variant="outline-primary" size="sm">Редагувати</b-button>
                    </div>
                    <div class="form-input d-flex flex-row">
                      <b-form-input type="number" placeholder="Адреса" />
                      <b-button variant="outline-primary" size="sm">Редагувати</b-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    user_data: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}  
</script>

<style>
.table {
  width: 100%;
}
</style>