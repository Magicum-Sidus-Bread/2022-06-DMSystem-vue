import service from "utils/request";

/**
 * @description: 获取 User信息
 * @param {*} data
 * @return {*}
 */
export const getUserInfo = (data) => {
  return service({
    url: "/user/info",
    method: "post",
    data,
  });
};



/**
 * @description: 修改个人信息
 * @param {*} data
 * @return {*}
 */
export const editinfo = (data) => {
  return service({
    url: "/user/editinfo",
    method: "post",
    data,
  });
};


/**
 * @description: 修改密码
 * @param {*} data
 * @return {*}
 */
export const editpassword = (data) => {
  return service({
    url: "/user/editpassword",
    method: "post",
    data,
  });
};