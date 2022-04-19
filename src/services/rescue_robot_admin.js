import request from "./request";

export function getTest() {
	return request({
		url: "/get",
	});
}

export function postTest() {
	return request({
		url: "/post",
		method: "post",
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

export function sendNavigationCommand2(coordinate) {
	return request({
		url: "/navigation2",
		method: "post",
		data: {
			coordinate,
		},
	});
}

export function sendPatrolCommand() {
	return request({
		url: "/patrol",
	});
}
