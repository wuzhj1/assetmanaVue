import request from "@/utils/request";

export function getAllRoles() {
  return request({
    url: "/role/allroles",
    method: "get"
  });
}

export function addrole(data) {
  return request({
    url: "/role/addrole",
    method: "post",
    data
  });
}

export function deleteRole(data) {
  return request({
    url: "/role/delete",
    method: "post",
    data: data
  });
}

export function updateRole(data) {
  return request({
    url: "/role/update",
    method: "post",
    data: data
  });
}