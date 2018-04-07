import { routerRedux } from 'dva/router';
import { wxPay, getOrder, process, cancelOrder, signOrder, aliPay } from '../services/api';
import { isWeiXin } from '../utils/utils';

export default {
  namespace: 'order',

  state: {
    obj: '',
    list: [],
  },

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(process, payload);
      yield put({
        type: 'saveList',
        payload: response.rows,
      });
    },
    *info({ payload }, { put }) {
      console.log(payload, 'info')
      yield put({
        type: 'saveInfo',
        payload,
      });
    },
    *getinfo({ payload }, { call, put }) {
      const response = yield call(getOrder, payload);
      yield put({
        type: 'saveInfo',
        payload: response,
      });
      window.location.hash = '/orderInfo';
    },
    *pay({ payload }, { call, put }) {
      if (payload.payType == 2) {
        const response = yield call(wxPay, payload);
        if (isWeiXin()) {
          window.wx.chooseWXPay({
            timestamp: response.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。
            nonceStr: response.nonceStr, // 支付签名随机串，不长于 32 位
            package: `prepay_id=${response.prepayId}`, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType: response.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: response.sign, // 支付签名
            success: (res) => {
              console.log(res);
              window.location.hash = '/order';
            },
            cancel: (res) => {
              console.log(res);
              alert('取消');
            },
            fail: (res) => {
              console.log(res);
              alert('失败');
            },
          });
        } else {
          iOSNative.mobilePay(payload.orderId);
        }
      } else {
        const response = yield call(aliPay, { orderId: payload.orderId });
        Native.AliPay(response);
      }
    },
    *cancel({ payload }, { call, put }) {
      const res = yield call(cancelOrder, payload);
      if (res.status == '00') {
        window.location.hash = '/order';
      } else {
        alert(res.msg);
      }
    },
    *sign({ payload }, { call, put }) {
      yield call(signOrder, payload);
    },
  },

  reducers: {
    saveList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveInfo(state, action) {
      console.log(action, 'action')
      return {
        ...state,
        obj: action.payload.obj,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
