import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import { wxlogin, plogin, sendMessage, bindMessage } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    openid: localStorage.openid,
    id: localStorage.userid,
  },

  effects: {
    *plogin({ payload }, { call, put }) {
      const response = yield call(plogin, payload);
      if (response.obj && response.obj.wxAccount) {
        yield put({
          type: 'changeOpenId',
          payload: response.obj,
        });
        // localStorage.openid = response.obj.openid;
        // localStorage.userid = response.obj.id;
        localStorage.phone = response.obj.phone;
      }
      // Login successfully
      if (response.status === '00' && response.obj.phone) {
        reloadAuthorized();
        window.location.hash = '/home/deliver';
      }
      if (response.status !== '00') {
        Toast.fail('获取信息失败', 2);
        window.wx.closeWindow();
      }
      if (response.status === '00' && !response.obj.phone) {
        Toast.info('请先绑定手机号', 1);
      }
    },
    *login({ payload }, { call, put }) {
      const response = yield call(wxlogin, payload);
      if (response.obj && response.obj.wxAccount) {
        yield put({
          type: 'changeOpenId',
          payload: response.obj,
        });
        localStorage.openid = response.obj.openid;
        localStorage.userid = response.obj.id;
        localStorage.phone = response.obj.phone;
      }
      // Login successfully
      if (response.status === '00' && response.obj.phone) {
        reloadAuthorized();
        window.location.hash = '/home/deliver';
      }
      if (response.status !== '00') {
        Toast.fail(response.msg, 2);
      }
      // if (response.status !== '00') {
      //   Toast.fail('获取信息失败', 2);
      //   window.wx.closeWindow();
      // }
      // if (response.status === '00' && !response.obj.phone) {
      //   Toast.info('请先绑定手机号', 1);
      // }
    },
    *message({ payload }, { call }) {
      yield call(sendMessage, payload);
    },
    *bind({ payload }, { call }) {
      const response = yield call(bindMessage, payload);
      if (response.status === '00') {
        reloadAuthorized();
        window.location.hash = '/home/deliver';
      } else {
        Toast.fail(response.msg, 1);
      }
    },
  },

  reducers: {
    changeOpenId(state, { payload }) {
      setAuthority('user');
      return {
        ...state,
        openid: payload.openId,
        id: payload.id,
      };
    },
  },
};
