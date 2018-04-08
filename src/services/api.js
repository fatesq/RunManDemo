import { stringify } from 'qs';
import request from '../utils/request';

export async function getIP() {
  return request('http://restapi.amap.com/v3/ip?key=19da76076593935ade0d45601a59fe01', {
    method: 'get',
  });
}

export async function getWeixinConfig() {
  return request('/api/secret/encode', {
    method: 'get',
  });
}

export async function plogin(params) {
  return request('/api/frontUser/AppLogin', {
    method: 'POST',
    data: params,
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

export async function getOrder(params) {
  return request('/api/order/getOrder', {
    method: 'POST',
    data: params,
  });
}

export async function wxPay(params) {
  return request('/api/order/wxPay', {
    method: 'POST',
    data: params,
  });
}

export async function aliPay(params) {
  return request('/api/order/alipaySign', {
    method: 'POST',
    data: params,
  });
}

export async function process(params) {
  return request('/api/process', {
    method: 'GET',
    data: params,
  });
}

export async function cancelOrder(params) {
  return request('/api/order/cancelOrder', {
    method: 'POST',
    data: params,
  });
}


export async function signOrder(params) {
  return request('/api/order/signOrder', {
    method: 'POST',
    data: params,
  });
}


export async function length(params) {
  return request('http://restapi.amap.com/v3/distance', {
    method: 'GET',
    data: params,
  });
}

export async function getConfig(params) {
  return request('api/config/getConfig', {
    method: 'POST',
    data: params,
  });
}

export async function coupon(params) {
  return request('api/coupon/select', {
    method: 'POST',
    data: params,
  });
}

export async function invoice(params) {
  return request('api/order/invoice', {
    method: 'POST',
    data: params,
  });
}

export async function comment(params) {
  return request('api/order/comment', {
    method: 'POST',
    data: params,
  });
}
