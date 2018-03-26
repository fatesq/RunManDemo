import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';

export default {
  namespace: 'map',

  state: {
    type: 1,
    send: {
      sendAddress: '',
      sendStreet: '',
      sendFloor: '',
      sendName: '',
      sendPhone: '',
      positionOriginating: '',
    },
    receiver: {
      receiverAddress: '',
      receiverStreet: '',
      receiverFloor: '',
      receiverName: '',
      receiverPhone: '',
      positionDestination: '',
    },
  },

  effects: {
    *send({ payload }, { put, select }) {
      const type = yield select(state => state.map.type);
      console.log(type);
      if (type === 1) {
        const send = yield select(state => state.map.send);
        send.sendStreet = payload.address;
        send.positionOriginating = payload.location;
        send.sendAddress = payload.name;
        yield put({
          type: 'saveSend',
          payload: send,
        });
      } else {
        const send = yield select(state => state.map.send);
        send.receiverStreet = payload.address;
        send.positionDestination = payload.location;
        send.receiverAddress = payload.name;
        yield put({
          type: 'saveReceiver',
          payload: send,
        });
      }
      window.location.hash = '/address';
    },
    *sendInfo({ payload }, { put, select }) {
      const type = yield select(state => state.map.type);
      console.log(type);
      if (type === 1) {
        const send = yield select(state => state.map.send);
        send.sendFloor = payload.floor;
        send.sendName = payload.name;
        send.sendPhone = payload.phone;
        yield put({
          type: 'saveSend',
          payload: send,
        });
      } else {
        const send = yield select(state => state.map.send);
        send.receiverFloor = payload.floor;
        send.receiverName = payload.name;
        send.receiverPhone = payload.phone;
        yield put({
          type: 'saveReceiver',
          payload: send,
        });
      }
      window.location.hash = '/';
    },
    *type({ payload }, { put }) {
      yield put({
        type: 'saveType',
        payload,
      });
      window.location.hash = '/address';
    },
  },

  reducers: {
    saveSend(state, { payload }) {
      return {
        ...state,
        send: { ...payload },
      };
    },
    saveReceiver(state, { payload }) {
      return {
        ...state,
        receiver: { ...payload },
      };
    },
    saveType(state, { payload }) {
      return {
        ...state,
        type: payload,
      };
    },
  },
};
