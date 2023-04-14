import http from "./base-api";

const create = (student) => http.post('/students', student)
.then((res) => res.data)

const login = (student) => http.post('/login', student)
.then((res) => res.data )

export default {
  create,
  login
}