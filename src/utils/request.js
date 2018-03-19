import { notification } from 'antd';
import { routerRedux } from 'dva/router';
import qs from 'qs';
import axios from 'axios';
import store from '../index';

function fetch(url, options) {
  const {
    method = 'GET',
    data,
  } = options;
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, { params: data });
    case 'delete':
      return axios.delete(url, qs.stringify(data));
    case 'head':
      return axios.head(url, qs.stringify(data));
    case 'form':
      return axios.post(url, qs.stringify(data));
    case 'post':
      return axios.post(url, data);
    case 'put':
      return axios.put(url, qs.stringify(data));
    case 'patch':
      return axios.patch(url, qs.stringify(data));
    default:
      return axios(options);
  }
}
// 请求响应信息
const codeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据,的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
};

axios.interceptors.response.use((response) => {
  // 处理响应数据
  return response;
}, (err) => {
  if (err && err.response) {
    const { response } = err;
    const errortext = codeMessage[response.status] || response.statusText;
    notification.error({
      message: `请求错误 ${response.status}: ${response.url}`,
      description: errortext,
    });
    const error = new Error(errortext);
    error.name = response.status;
    error.response = response;
    throw error;
  }
  return Promise.reject(err);
});


// 请求体
export default function request(url, options) {
  return fetch(url, options)
    .then((response) => {
      const { statusText, status } = response;
      let data = options.fetchType === 'JSOP' ? response.data.query.results.json : response.data;
      if (data instanceof Array) data = { list: data };
      return Promise.resolve({
        success: true,
        message: statusText,
        statusCode: status,
        ...data,
      });
    }).catch((e) => {
      const { dispatch } = store;
      const status = e.name;
      console.log(e, e.name, 44);
      if (status === 401) {
        dispatch({
          type: 'login/logout',
        });
        return;
      }
      if (status === 403) {
        dispatch(routerRedux.push('/exception/403'));
        return;
      }
      if (status <= 504 && status >= 500) {
        dispatch(routerRedux.push('/exception/500'));
        return;
      }
      if (status >= 404 && status < 422) {
        dispatch(routerRedux.push('/exception/404'));
      }
    });
}
