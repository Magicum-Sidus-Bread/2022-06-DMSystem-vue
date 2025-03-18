import axios from "axios";
import { useRouter } from "vue-router";
import { TokenKey, getToken, setToken, removeToken } from "@/utils/auth";

const router = useRouter();


export const baseURL ="http://10.131.167.11:8082"
 // export const baseURL ="http://localhost:8082"


const service = axios.create({
  baseURL: baseURL,
  timeout: 15000,
  headers: {},
});

// 添加请求拦截器
// service.interceptors.request.use(
//   function (config) {
//     for (const key in config.params) {
//       if (Object.hasOwnProperty.call(config.params, key)) {
//         const element = config.params[key];
//         if (element === null || element === "") {
//           delete config.params[key];
//         }
//       }
//     }
//     config.headers[TokenKey] = getToken() || "";
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    if (response.data.code !== 0) {
      ElMessage.error({
        showClose: true,
        message: response.data.msg,
        type: "error",
      });
      if (response.data.code === 400) {
        // removeToken();
        router.go(0);//刷新
      }
    }
    // if (Object.prototype.hasOwnProperty.call(response.headers, TokenKey)) {
    //   setToken(response.headers[TokenKey]);
    // }
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default service;
