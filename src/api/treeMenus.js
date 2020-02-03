 import request from "@/utils/request";

export function getTreeMenus() {

    return request({
        url: "/treemenus",
        method:"get"
    });

}