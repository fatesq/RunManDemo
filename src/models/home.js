import { routerRedux } from 'dva/router';
import { postOrder } from '../services/api';

export default {
  namespace: 'home',

  state: {
    sendType: '',
    sendInfo: {
      sendAddress: '',
      sendFloor: '',
      sendName: '',
      sendPhone: '',
    },
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(postOrder, payload);
      yield put({
        type: 'order/info',
        payload: response,
      });
      yield put(routerRedux.push('/orderInfo'));
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
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
