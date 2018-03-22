import { routerRedux } from 'dva/router';
import { wxPay } from '../services/api';

export default {
  namespace: 'order',

  state: {
    obj: '',
  },

  effects: {
    *info({ payload }, { put }) {
      yield put({
        type: 'saveInfo',
        payload,
      });
    },
    *pay({ payload }, { call, put }) {
      const response = yield call(wxPay, payload);
      console.log(response);
      alert('支付前');
      window.wx.chooseWXPay({
        timestamp: response.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。
        nonceStr: response.nonceStr, // 支付签名随机串，不长于 32 位
        package: `prepay_id=${response.prepayId}`, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
        signType: response.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: response.sign, // 支付签名
        success: function(res){
          alert(JSON.stringify(res));
          alert('成功');
          // if (res.errMsg === 'chooseWXPay:ok') {
          //   routerRedux.push('/order');
          // }
        },
        cancel: (res) => {
          alert(JSON.stringify(res));
          alert('取消');
        },
        fail: (res) => {
          alert(JSON.stringify(res));
          alert('失败');
        },
        trigger: (res) => {
          alert(JSON.stringify(res));
          alert('trigger');
        },
        complete: (res) => {
          alert(JSON.stringify(res));
          alert('complete');
        },
        ok: (res) => {
          alert(JSON.stringify(res));
          alert('ok');
        },
      });
    },
  },

  reducers: {
    saveInfo(state, action) {
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
