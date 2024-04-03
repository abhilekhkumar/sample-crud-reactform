import Api from "./Api";

//to get list of users
export function getUserList() {
  return Api.get("/persons");
}
//add a user
export function addUser(data) {
  return Api.post("/persons", JSON.stringify(data));
}
//update user information
export function updateUser(id, data) {
  return Api.put("/persons/" + id, JSON.stringify(data));
}
//delete user data
export function deleteUser(id) {
  return Api.delete("/persons/" + id);
}
