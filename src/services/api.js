import { stringify } from 'qs';
import request from '../utils/request';

export async function getWeixinConfig() {
  return request('/api/secret/encode', {
    method: 'get',
  });
}

export async function wxlogin(params) {
  return request('/api/frontUser/wxLogin', {
    method: 'POST',
    data: params,
  });
}

export async function sendMessage(params) {
  return request('/api/frontUser/sendMessage', {
    method: 'POST',
    data: params,
  });
}

export async function bindMessage(params) {
  return request('/api/frontUser/bind', {
    method: 'POST',
    data: params,
  });
}

export async function postOrder(params) {
  return request('/api/order/add', {
    method: 'POST',
    data: params,
  });
}
