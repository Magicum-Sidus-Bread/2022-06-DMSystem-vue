import service from "utils/request";

/**
 * @description: 获取所有通知
 * @param {*} data
 * @return {*}
 */
export const getNotice = (data) => {
  return service({
    url: "/notice/getNotice",
    method: "post",
    data,
  });
};


/**
 * @description: 确认通知
 * @param {*} data
 * @return {*}
 */
export const confirmNotice = (data) => {
  return service({
    url: "/notice/confirmNotice",
    method: "post",
    data,
  });
};