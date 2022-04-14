// const devBaseURL = "https://netease-cloud-music-api-mrshimmer.vercel.app/";
// flask内置web服务器
const devBaseURL = "http://localhost:8001/api";
// const proBaseURL = "https://netease-cloud-music-api-mrshimmer.vercel.app/";
const proBaseURL = "http://localhost:8001/api";
export const BASE_URL = process.env.NODE_ENV === "development" ? devBaseURL : proBaseURL;

export const TIMEOUT = 5000;
