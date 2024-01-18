import instance from "./instance"

import userModule from "./user"

export default {
  user: userModule(instance)
};