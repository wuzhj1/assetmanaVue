import request from "@/utils/request";

export function allTreeCategory() {
    return request({
        url: "/cate//alltreecate",
        method:"get"
    });
}