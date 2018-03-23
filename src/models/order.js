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
      // function onBridgeReady() {
      //   alert('api');
      //   WeixinJSBridge.invoke(
      //     'getBrandWCPayRequest', {
      //       appId: 'wx5eec015409094306', // 公众号名称，由商户传入
      //       timeStamp: response.timestamp, // 时间戳，自1970年以来的秒数
      //       nonceStr: response.nonceStr, // 随机串
      //       package: `prepay_id=${response.prepayId}`,
      //       signType: response.signType, // 微信签名方式
      //       paySign: response.sign, // 微信签名
      //     },
      //     (res) => {
      //       alert(window.location.href);
      //       alert('over');
      //       alert(res);
      //       if (res.err_msg === 'get_brand_wcpay_request:cancel') {
      //         alert('取消支付');
      //       } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
      //         alert('支付失败');
      //         window.history.go(-1);
      //       } else {
      //         alert('支付成功');
      //         window.location.hash = '/order';
      //       }
      //     },
      //   );
      // }
      // if (typeof WeixinJSBridge === 'undefined') {
      //   if (document.addEventListener) {
      //     document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
      //   } else if (document.attachEvent) {
      //     document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
      //     document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
      //   }
      // } else {
      //   onBridgeReady();
      // }
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
