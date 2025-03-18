import service from "utils/request";

/**
 * @description: 获取list列表
 * @param {*} data
 * @return {*}
 */
export const getFiles = (data) => {
  return service({
    url: "/pdfmanager",
    method: "post",
    data,
  });
};

/**
 * @description: 获取team所有成员
 * @param {*} data
 * @return {*}
 */
/* export const getAllTeamers = (data) => {
  return service({
    url: "/team/getAllTeamers",
    method: "post",
    data,
  });
}; */