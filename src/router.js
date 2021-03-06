import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { getRouterData } from './common/router';
import Authorized from './utils/Authorized';
import { isWeiXin } from './utils/utils';
import styles from './index.less';

const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const UserLayout = routerData['/user'].component;
  const BasicLayout = routerData['/'].component;
  const MobileLayout = routerData['/home'].component;
  const type = isWeiXin() ? '/user/login' : '/user/plogin';
  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history} >
        <Switch>
          <Route
            path="/user"
            component={UserLayout}
          />
          <Route
            path="/home"
            component={MobileLayout}
          />
          <AuthorizedRoute
            path="/"
            render={props => <BasicLayout {...props} />}
            // authority={['admin', 'user']}
            // redirectPath={type}
          />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;
