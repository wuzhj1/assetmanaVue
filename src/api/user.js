import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/api/login",
    method: "post",
    data
  });
}

export function getInfo() {
  return request({
    url: "/api/info",
    method: "get",
    // params: { token },
    // headers:{
    //   "token":token
    // },
    baseURL: "http://127.0.0.1:8080"
  });
}

export function logout() {
  return request({
    url: "/api/logout",
    method: "get",
    baseURL: "http://127.0.0.1:8080"
  });
}

export function getAllUsers() {
  return request({
    url: "/api/getallusers",
    method:"get"
  })
}

export function addUser(data) {
  return request({
    url: "/api/adduser",
    method: "post",
    data:data
  })
}

export function deleteUser(data) {
  return request({
    url: "/api/deleteuser",
    method: "post",
    data:data
  })
}

export function updateUser(data) {
  return request({
    url: "/api/updateuser",
    method: "post",
    data:data
  })
}

export function userDefaultRole(data) {
  return request({
    url: "/api/userdefaultrole",
    method: "post",
    data:data
  })
}

export function setUserRole(data) {
  return request({
    url: "/api/setuserrole",
    method: "post",
    data:data
  })
}

