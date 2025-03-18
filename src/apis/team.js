import service from "utils/request";

/**
 * @description: 获取team列表
 * @param {*} data
 * @return {*}
 */
export const getTeams = (data) => {
  return service({
    url: "/team/getTeams",
    method: "post",
    data,
  });
};

/**
 * @description: 获取team所有成员
 * @param {*} data
 * @return {*}
 */
export const getAllTeamers = (data) => {
  return service({
    url: "/team/getAllTeamers",
    method: "post",
    data,
  });
};



/**
 * @description: 创建团队
 * @param {*} data
 * @return {*}
 */
export const createTeam = (data) => {
  return service({
    url: "/team/createTeam",
    method: "post",
    data,
  });
};


/**
 * @description: 添加团队成员
 * @param {*} data
 * @return {*}
 */
export const addTeamer = (data) => {
  return service({
    url: "/team/addTeamer",
    method: "post",
    data,
  });
};


/**
 * @description: 修改成员权限
 * @param {*} data
 * @return {*}
 */
export const addAdminister = (data) => {
  return service({
    url: "/team/addAdminister",
    method: "post",
    data,
  });
};

export const addteamer = (data) => {
  return service({
    url: "/team/addTeamer",
    method: "post",
    data,
  });
};


/**
 * @description: 删除成员
 * @param {*} data
 * @return {*}
 */
export const deleteTeamer = (data) => {
  return service({
    url: "/team/deleteTeamer",
    method: "post",
    data,
  });
};


/**
 * @description: 删除团队
 * @param {*} data
 * @return {*}
 */
export const deleteteam = (data) => {
  return service({
    url: "/team/deleteteam",
    method: "post",
    data,
  });
};