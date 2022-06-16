import {
  sendCommandToRos,
  sendCommandToAdmin,
  getItemReq,
  getMapItemReq,
} from "../services/rescue_robot_admin";
import {
  start_slam_command,
  stop_slam_command,
  save_map_command,
  load_map_command,
  start_nav_command,
  stop_nav_command,
  forward_command,
  back_command,
  right_command,
  left_command,
  stop_command,
  initial_pose_command,
  start_nav_admin_command,
  start_patrol_admin_command,
  PatrolPoints,
} from "../constants/data";

export function startSlam() {
  let slamselect = document.getElementById("slam_method");
  let slamindex = slamselect.selectedIndex;
  let method = slamselect.options[slamindex].value;
  let slam_command = start_slam_command;
  slam_command.params.slammethod = method;
  sendCommandToRos(slam_command);
}

export async function stopSlam() {
  let slamselect = document.getElementById("slam_method");
  let slamindex = slamselect.selectedIndex;
  let method = slamselect.options[slamindex].value;
  let inputEle = document.getElementById("save_map_path");

  let stopslam_command = stop_slam_command;
  stopslam_command.params.slammethod = method;
  stopslam_command.params.mapname = inputEle.value;

  if (method === "rtab_map") {
    let savedMap = await getMapItemReq();
    if (savedMap.indexOf(inputEle.value) !== -1) {
      alert("结束rtabmap slam失败!  已保存同名的地图文件，请更换名字后重试!  ");
      return;
    }
  }
  sendCommandToRos(stopslam_command);
}

export async function getItems() {
  let rep = await getItemReq();
  // let rep = await sendCommandToRos(get_items_command);
  // let rep = {
  // 	items: [
  // 		{ name: "item1", x: 0, y: 0 },
  // 		{ name: "item2", x: 10, y: 0 },
  // 		{ name: "item3", x: 10, y: 5 },
  // 		{ name: "item1", x: 0, y: 0 },
  // 		{ name: "item2", x: 10, y: 0 },
  // 		{ name: "item3", x: 10, y: 5 },
  // 		{ name: "item1", x: 0, y: 0 },
  // 		{ name: "item2", x: 10, y: 0 },
  // 		{ name: "item3", x: 10, y: 5 },
  // 	],
  // };
  console.log(rep);
  if (rep.items) {
    if (document.getElementById("itemsWrap")) {
      let oldItemsWrap = document.getElementById("itemsWrap");
      oldItemsWrap.parentNode.removeChild(oldItemsWrap);
    }
    let itemsEle = document.getElementById("items");
    let itemsWrap = document.createElement("div");
    itemsWrap.id = "itemsWrap";
    itemsEle.appendChild(itemsWrap);
    for (const item of rep.items) {
      let itemEle = document.createElement("li");
      itemEle.appendChild(
        document.createTextNode(`name: ${item.name}，x: ${item.x}，y: ${item.y}`)
      );
      itemsWrap.appendChild(itemEle);
    }
  }
}

export async function saveMap() {
  let slamselect = document.getElementById("slam_method");
  let slamindex = slamselect.selectedIndex;
  let method = slamselect.options[slamindex].value;
  let inputEle = document.getElementById("save_map_path");
  // if (method === "rtab_map") {
  //   alert("注意:  使用rtabmap进行SLAM时，保存地图将关闭SLAM! ");
  // }
  if (inputEle.value === "") {
    alert("请输入地图名后再保存！");
    return;
  }

  let savedMap = await getMapItemReq();
  console.log(savedMap);

  let save_command = save_map_command;
  save_command.params.filename = inputEle.value;
  save_command.params.method = method;

  let temp = "";
  temp = inputEle.value + ".pgm";
  // if (method === "rtab_map") {
  //   temp = inputEle.value + ".db";
  // } else {
  //   temp = inputEle.value + ".pgm";
  // }
  if (
    Object.keys(savedMap).length === 0 ||
    (savedMap.mapitems && savedMap.mapitems.length === 0)
  ) {
    console.log("maps空 直接保存");
    sendCommandToRos(save_command);
  } else {
    for (let mapname of savedMap.mapitems) {
      if (mapname === temp) {
        alert("已有同名的地图文件，请更换");
        return;
      }
    }
    console.log("maps非空 且无同名 保存");
    sendCommandToRos(save_command);
  }
}

export async function getMap() {
  let mapEle = document.getElementById("load_map_name");
  let rep = await getMapItemReq();
  if (rep === {}) {
    console.log("获取失败");
  } else {
    console.log(rep);
    // mapEle.removeChild(mapEle.firstChild);
    mapEle.innerHTML = "";
    for (let mapname of rep.mapitems) {
      if (mapname.indexOf(".db") === -1) {
        if (mapname.indexOf(".yaml") === -1) {
          let temp = document.createElement("option");
          temp.setAttribute("value", mapname);
          temp.innerHTML = mapname;
          mapEle.appendChild(temp);
        }
      }
    }
  }
}

export async function loadMap() {
  let mapEle = document.getElementById("load_map_name");
  let slamindex = mapEle.selectedIndex;
  let map_name = mapEle.options[slamindex].value;
  let map_command = load_map_command;
  map_command.params.mapname = map_name;
  sendCommandToRos(map_command);
}

export function startNav() {
  let x_y_inputEle = document.getElementById("nav_x_y");
  let nav_command = start_nav_command;
  nav_command.params.x = x_y_inputEle.value.split("/")[0];
  nav_command.params.y = x_y_inputEle.value.split("/")[1];
  nav_command.params.r = x_y_inputEle.value.split("/")[2];
  // nav_command.params.w = x_y_inputEle.value.split("/")[3];
  sendCommandToRos(nav_command);
}

export function startNavAdmin() {
  let x_y_inputEle = document.getElementById("admin_nav_x_y_r");
  let nav_admin_command = start_nav_admin_command;
  nav_admin_command.x = x_y_inputEle.value.split("/")[0];
  nav_admin_command.y = x_y_inputEle.value.split("/")[1];
  nav_admin_command.r = x_y_inputEle.value.split("/")[2];
  sendCommandToAdmin(nav_admin_command);
}

export function addPatrolPoint() {
  let x_y_inputEle = document.getElementById("patrol_x_y_r");
  let point = { id: 0, x: 0, y: 0, r: 0 };
  point.id = parseInt(100 * Math.random());
  point.x = x_y_inputEle.value.split("/")[0];
  point.y = x_y_inputEle.value.split("/")[1];
  point.r = x_y_inputEle.value.split("/")[2];
  PatrolPoints.push(point);
  renderPointsList();
}

function renderPointsList() {
  let pointsEle = document.getElementById("points");
  pointsEle.innerHTML = "";
  let pointsWrap = document.createElement("div");
  pointsWrap.id = "pointsWrap";
  pointsEle.appendChild(pointsWrap);
  for (const point of PatrolPoints) {
    let pointEle = document.createElement("li");
    pointEle.id = point.id;
    pointEle.onclick = (e) => removePoint(e.target.id);
    pointEle.appendChild(
      document.createTextNode(`x: ${point.x}，y: ${point.y}, r: ${point.r}`)
    );
    pointsWrap.appendChild(pointEle);
  }
}
function removePoint(id) {
  let index = PatrolPoints.findIndex((element) => element.id === id);
  PatrolPoints.splice(index, 1);
  renderPointsList();
}

export function startPatrolAdmin() {
  let patrol_admin_command = start_patrol_admin_command;
  patrol_admin_command.patrol_point = PatrolPoints;
  // console.log(patrol_admin_command);

  sendCommandToAdmin(patrol_admin_command);
}

export function stopNav() {
  sendCommandToRos(stop_nav_command);
}

// 前后左右按钮的控制逻辑
// 1、单次点击移动按钮
export function move_btn_click(moveFlag) {
  if (moveFlag === "forward") {
    // console.log("前进");
    sendCommandToRos(forward_command);
  }
  if (moveFlag === "left") sendCommandToRos(left_command);
  if (moveFlag === "right") sendCommandToRos(right_command);
  if (moveFlag === "back") sendCommandToRos(back_command);
  if (moveFlag === "stop") sendCommandToRos(stop_command);
}

let timeObj;

// 2、按住移动按钮
export function interval_btn(moveFlag) {
  timeObj = setInterval(() => {
    if (moveFlag === "forward") {
      console.log("前进");
      sendCommandToRos(forward_command);
    }
    if (moveFlag === "left") sendCommandToRos(left_command);
    if (moveFlag === "right") sendCommandToRos(right_command);
    if (moveFlag === "back") sendCommandToRos(back_command);
    if (moveFlag === "stop") sendCommandToRos(stop_command);
  }, 250);
}
export function clear_interval() {
  console.log("关闭定时器");
  clearInterval(timeObj);
  // clearInterval(keyObj);
}

//3、按住键盘wasde
// 因为定时器间隔的关系，短时间连续单次点击键盘方向键可能会不发出命令
let keyArr = ["w", "a", "d", "s", "e"];
let keyControlFlag = "";
let keyTime = false;
setInterval(() => {
  if (keyTime) {
    if (keyControlFlag === "w") {
      console.log("前进");
      sendCommandToRos(forward_command);
    }
    if (keyControlFlag === "a") sendCommandToRos(left_command);
    if (keyControlFlag === "d") sendCommandToRos(right_command);
    if (keyControlFlag === "s") sendCommandToRos(back_command);
    if (keyControlFlag === "e") sendCommandToRos(stop_command);
  }
}, 250);
document.onkeydown = (event) => {
  keyTime = true;
  for (let key of keyArr) {
    if (event.key === key) {
      // console.log(key + "方向键按下");
      keyControlFlag = key;
    }
  }
};
document.onkeyup = (event) => {
  // console.log("into keyup");
  for (let key of keyArr) {
    if (event.key === key) {
      console.log(key + "方向键松开");
      keyTime = false;
    }
  }
};
//TODO  松开按键，则发送cmd_vel 0

export function initial_pose_func() {
  let positionEle = document.getElementById("initial_pose");
  let pose = {
    position: {
      x: 0,
      y: 0,
    },
    orientation: {
      // z: 0,
      // w: 0,
      r: 0,
    },
  };
  pose.position.x = positionEle.value.split("/")[0];
  pose.position.y = positionEle.value.split("/")[1];
  pose.orientation.r = positionEle.value.split("/")[2];

  console.log(pose);
  let pose_command = initial_pose_command;
  pose_command.params.pose = pose;
  sendCommandToRos(pose_command);
}
