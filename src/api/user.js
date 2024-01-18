export default function (instance) {
  return {
    get() {
      return instance.get("/users")
    },
    delete(id) {
      return instance.delete(`/users${id}`)
    },
    create() {
      return instance.post("/users")
    }
  }
}