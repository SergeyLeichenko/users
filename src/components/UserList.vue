<template>
  <div class="container mt-3 mb-4">
    <div class="col-lg-9 mt-4 mt-lg-0">

      <b-alert
        :show="dismissCountDown"
        variant="warning"
        @dismissed="dismissCountDown=0"
      >
        {{ notification }}
      </b-alert>

      <div class="add-user-btn">
        <b-button v-b-modal.modal-create-user>Додати користувача</b-button>
      </div>

      <div class="search-user mb-4">
        <b-input-group>
          <b-form-input type="text" v-model="searchUser" placeholder="Пошук..." />
        </b-input-group>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="user-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
            <table class="table manage-candidates-top mb-0">
              <thead>
                <tr>
                  <th>Користувачі</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user) in searchUserName" :key="user.id" class="candidates-list">
                  <td class="title">
                    <div class="thumb">
                      <img class="img-fluid" :src="user.avatar" :alt="user.first_name">
                    </div>
                    <div class="candidate-list-details">
                      <div class="candidate-list-info">
                        <div class="candidate-list-title">
                          <h5 class="mb-0"><a href="#" v-b-modal.modalPopover @click="detailUser(user)">{{ user.first_name }}</a></h5>
                        </div>
                        <div class="candidate-list-option">
                          <ul class="list-unstyled">
                            <li>{{ user.email }}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <ul class="list-unstyled mb-0 d-flex justify-content-end">
                      <li>
                        <b-icon icon="trash-fill" aria-hidden="true" scale="1.2" class="icon-remove"
                          @click="deleteUser(user.id)"></b-icon>
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <b-modal id="modalPopover" centered title="Деталі" ok-only>
      <UserDetail :user_data="user" />
    </b-modal>

    <b-modal id="modal-create-user" centered title="Додати користувача" hide-footer>
      <FormAddUser @onSubmit="onSubmit" />
    </b-modal>

  </div>
</template>

<script>
import UserDetail from "@/components/UserDetail.vue"
import FormAddUser from "@/components/FormAddUser.vue"
export default {
  components: {
    UserDetail,
    FormAddUser
  },
  data() {
    return {
      showModalForm: true,
      users: [],
      user: {},
      notification: "",
      dismissSecs: 5,
      dismissCountDown: 0,
      searchUser: ""
    }
  },
  computed: {
    // search user
    searchUserName() {
      return this.users.filter((elem) => {
        return elem.first_name.toLowerCase().includes(this.searchUser.toLowerCase())
      })
    },
  },
  methods: {
    // get users
    getUsers() {
      this.$api.user.get().then((res) => {
        this.users = res.data.data
      })
    },
    // delete user
    deleteUser(id) {
      this.$api.user.delete(id).then((res) => {
        if (res.status === 204) {
          const removeUser = this.users.filter(el => el.id !== id)
          this.users = removeUser
        }
      })
    },
    // deteil user
    detailUser(user) {
      this.user = user
    },
    // create user
    onSubmit(data) {
      this.$api.user.create({
        data: data
      }).then((res) => {
        if (res.status === 201) {
          this.notification = "Користувача успішно створено"
          this.dismissCountDown = this.dismissSecs
        }
      })
      this.$bvModal.hide("modal-create-user")
    }
  },  
  mounted() {
    this.getUsers()
  }
}
</script>

<style>
@import url("../assets/css/userList.css")
</style>