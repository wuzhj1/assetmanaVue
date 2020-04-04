import request from "@/utils/request";

export function getAllMenus() {
    return request({
        url: "/menu/allmenus",
        method:"get"
    })
}

export function addMenu(data) {
    return request({
      url: "/menu/addmenu",
      method:"post",
      data
    })
}

export function updateMenu(data) {
    return request({
      url: "/menu/updatemenu",
      method: "post",
      data
    });
}

export function deleteMenus(data) {
  return request({
    url: "/menu/deletemenus",
    method: "post",
    data
  });
}