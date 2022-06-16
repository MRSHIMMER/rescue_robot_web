import request from "./request";
import { get_items_command, get_map_items_command } from "../constants/data";

export function getReq() {
  return request({
    url: "/get",
  });
}

export function postReq() {
  return request({
    url: "/post",
    method: "post",
    data: {
      username: "admin",
    },
  });
}

export function sendCommandToRos(command) {
  return request({
    url: "/sendcommand",
    method: "post",
    data: {
      command,
    },
  });
}

export function sendCommandToAdmin(command) {
  return request({
    url: "/sendcommand2admin",
    method: "post",
    data: {
      command,
    },
  });
}

export function getItemReq() {
  return request({
    url: "/getitems",
    method: "post",
    data: {
      command: get_items_command,
    },
  });
}

export function getMapItemReq() {
  return request({
    url: "/getmapitems",
    method: "post",
    data: {
      command: get_map_items_command,
    },
  });
}

// 测试axios请求
export function getTopBanners() {
  return request({
    url: "https://netease-cloud-music-api-mrshimmer.vercel.app/banner",
  });
}
