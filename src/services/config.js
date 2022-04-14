// const devBaseURL = "https://netease-cloud-music-api-mrshimmer.vercel.app/";
// flask内置web服务器
const devBaseURL = "http://localhost:5000";
// const proBaseURL = "https://netease-cloud-music-api-mrshimmer.vercel.app/";
const proBaseURL = "http://localhost:5000";
export const BASE_URL = process.env.NODE_ENV === "development" ? devBaseURL : proBaseURL;

export const TIMEOUT = 5000;
