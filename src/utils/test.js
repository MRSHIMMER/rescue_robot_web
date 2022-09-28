import { getTopBanners, getReq, postReq } from "../services/rescue_robot_admin";

// get post测试
export async function getTest() {
  const rep = await getReq();
  alert(rep);
  console.log(rep);
}

export async function postTest() {
  const rep = await postReq();
  alert(rep);
  console.log(rep);
}
export async function getBanners() {
  const res = await getTopBanners();
  if (res.code === 200) alert("axios请求测试成功");
  else alert("axios请求测试错误");
  console.log(res);
}

// let teststr = 'sdss\\ss"dsa';
// let reg = /\\/g;
// let test = teststr.replace(reg, "");
// console.log(teststr);
// console.log(test);
