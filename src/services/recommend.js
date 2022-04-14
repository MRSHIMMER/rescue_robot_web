import request from "./request";

export function getTopBanners() {
	return request({
		url: "https://netease-cloud-music-api-mrshimmer.vercel.app/banner",
	});
}
