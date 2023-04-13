import http from "./base-api";

const create = (student) => http.post('/students', student)
.then((res) => res.data)

export default {
  create
}