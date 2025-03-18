import service from "utils/request";

/**
 * @description: 新建文献库
 * @param {*} data
 * @return {*}
 */
export const makelib = (data) => {
  return service({
    url: "/team/lib/makelib",
    method: "post",
    data,
  });
};



/**
 * @description: 获取团队所有文献库
 * @param {*} data
 * @return {*}
 */
export const getlib = (data) => {
  return service({
    url: "/team/lib/getlib",
    method: "post",
    data,
  });
};