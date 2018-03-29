import { routerRedux } from 'dva/router';
import { postOrder, length, getConfig } from '../services/api';

export default {
  namespace: 'home',

  state: {
    sendType: '',
    results: [],
    config: undefined,
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
    *getlenth({ payload }, { call, put }) {
      payload.key = '19da76076593935ade0d45601a59fe01';
      const response = yield call(length, payload);
      console.log(response);
      yield put({
        type: 'saveCurrentUser',
        payload: response.results,
      });
    },
    *config({ payload }, { call, put }) {
      const response = yield call(getConfig, payload);
      yield put({
        type: 'saveConfig',
        payload: response.obj,
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
    saveConfig(state, action) {
      return {
        ...state,
        config: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        results: action.payload,
      };
    },
  },
};
