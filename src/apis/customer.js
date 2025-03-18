import service from "utils/request";

/**
 * @description: 获取客户列表
 * @param {*} params
 * @return {*}
 */
export const getCustomerList = (params) => {
  // return service({
  //   url: "/admin/client/userList",
  //   method: "get",
  //   params,
  // });
};

/**
 * @description: 删除客户
 * @param {*} params
 * @return {*}
 */
export const deleteCustomer = (params) => {
  // return service({
  //   url: "/admin/client/delete",
  //   method: "delete",
  //   params,
  // });
};

/**
 * @description: 获取存款初筛结果列表
 * @param {*} params
 * @return {*}
 */
export const getDepositFilterResult = (params) => {
  // return service({
  //   url: "/admin/client/depositFilterResult",
  //   method: "get",
  //   params,
  // });
};

/**
 * @description: 获取贷款初筛结果列表
 * @param {*} params
 * @return {*}
 */
export const getLoanFilterResult = (params) => {
  // return service({
  //   url: "/admin/client/loanFilterResult",
  //   method: "get",
  //   params,
  // });
};

// import axios from "axios";
// import { baseURL } from "utils/request";
// import { TokenKey, getToken, setToken } from "@/utils/auth";
// const req = axios.create({
//   baseURL: baseURL,
//   timeout: 8000,
//   headers: {},
// });
// // 添加请求拦截器
// req.interceptors.request.use(
//   function (config) {
//     config.headers[TokenKey] = getToken() || "";
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

/**
 * @description: 获取客户模板表格
 * @param {*} params
 * @return {*}
 */
export const getCustomerExcelTemplate = () => {
  // return req({
  //   responseType: "blob",
  //   url: "/admin/client/download",
  //   method: "get",
  // });
};
