import React from 'react';
import { Route, Redirect, Switch } from 'dva/router';
import { getRoutes } from '../utils/utils';

export default class BlankLayout extends React.PureComponent {
  render() {
    const { routerData, match } = this.props;
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Switch>
          {
            getRoutes(match.path, routerData).map(item =>
              (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              )
            )
          }
          <Redirect exact from="/" to="/home/deliver" />
        </Switch>
      </div>
    );
  }
}
