import request from "@/utils/request";


export function getAllAsset() {
    return request({
        url: "/asset/allasset",
        method:"get"
    })
}