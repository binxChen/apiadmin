import API from '../api/API.js'
const api = new API();
//获取个人项目
export const getMenu = (id) => api.get({api:'/p/u/'+id});
//获取个人信息
export const getUserInfo = (id) => api.get({api:'/users/u/'+id});
//登录检查
export const login = (param) => api.post({api:'/users/login',param : param});

