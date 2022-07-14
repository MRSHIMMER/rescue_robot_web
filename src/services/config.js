// flask内置web服务器
// const devBaseURL = "http://localhost:5000/api";

// 本地gunicorn web服务器(nginx代理后)
const devBaseURL = "http://localhost:5000/api";
// const devBaseURL = "http://172.26.202.254:8001/api";
// const devBaseURL = "http://172.26.194.26:8001/api";

// const proBaseURL = "http://localhost:8001/api";
const proBaseURL = "http://192.168.1.102:8001/api";
export const BASE_URL = process.env.NODE_ENV === "development" ? devBaseURL : proBaseURL;

export const TIMEOUT = 5000;
