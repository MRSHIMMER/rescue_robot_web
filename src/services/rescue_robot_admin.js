import request from "./request";

export function getTest() {
	return request({
		url: "/get",
	});
}

export function postTest() {
	return request({
		url: "/post",
		data: {
			username: "admin",
		},
	});
}

export function sendNavigationCommand() {
	return request({
		url: "/navigation",
	});
}
