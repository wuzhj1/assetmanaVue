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
