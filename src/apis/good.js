import service from "utils/request";

/**
 * @description: 新建存款
 * @param {*} data
 * @return {*}
 */
export const addDeposit = (data) => {
  return service({
    url: "/admin/good/addDeposit",
    method: "post",
    data,
  });
};

/**
 * @description: 获取存款列表
 * @param {*} params
 * @return {*}
 */
export const getDepositList = (params) => {
  // return service({
  //   url: "/admin/good/getDepositList",
  //   method: "get",
  //   params,
  // });
};

/**
 * @description: 获取存款详情
 * @param {*} params
 * @return {*}
 */
export const getDepositDetail = (params) => {
  // return service({
  //   url: "/admin/good/getDepositDetail",
  //   method: "get",
  //   params,
  // });
};

/**
 * @description: 修改存款信息
 * @param {*} data
 * @return {*}
 */
export const updateDeposit = (data) => {
  // return service({
  //   url: "/admin/good/updateDeposit",
  //   method: "put",
  //   data,
  // });
};

/**
 * @description: 删除存款
 * @param {*} params
 * @return {*}
 */
export const deleteDeposit = (params) => {
  // return service({
  //   url: "/admin/good/deleteDeposit",
  //   method: "delete",
  //   params,
  // });
};

/**
 * @description: 新建贷款
 * @param {*} data
 * @return {*}
 */
export const addLoan = (data) => {
  // return service({
  //   url: "/admin/good/addLoan",
  //   method: "post",
  //   data,
  // });
};

/**
 * @description: 获取贷款列表
 * @param {*} params
 * @return {*}
 */
export const getLoanList = (params) => {
  // return service({
  //   url: "/admin/good/getLoanList",
  //   method: "get",
  //   params,
  // });
};

/**
 * @description: 获取贷款详情
 * @param {*} params
 * @return {*}
 */
export const getLoanDetail = (params) => {
  // return service({
  //   url: "/admin/good/getLoanDetail",
  //   method: "get",
  //   params,
  // });
};

/**
 * @description: 修改贷款信息
 * @param {*} data
 * @return {*}
 */
export const updateLoan = (data) => {
  // return service({
  //   url: "/admin/good/updateLoan",
  //   method: "put",
  //   data,
  // });
};

/**
 * @description: 删除贷款
 * @param {*} params
 * @return {*}
 */
export const deleteLoan = (params) => {
  // return service({
  //   url: "/admin/good/deleteLoan",
  //   method: "delete",
  //   params,
  // });
};

/**
 * @description: 获取存款订单列表
 * @param {*} params
 * @return {*}
 */
export const getDepositOrderList = (params) => {
  // return service({
  //   url: "/admin/good/getDepositListById",
  //   method: "get",
  //   params,
  // });
};

/**
 * @description: 获取贷款订单列表
 * @param {*} params
 * @return {*}
 */
export const getLoanOrderList = (params) => {
  // return service({
  //   url: "/admin/good/getLoanListById",
  //   method: "get",
  //   params,
  // });
};

/**
 * @description: 获取所有订单列表
 * @param {*} params
 * @return {*}
 */
 export const getOrderList = (params) => {
    // return service({
    //   url: "admin/good/getOrderList",
    //   method: "get",
    //   params,
    // });
  };
  
  