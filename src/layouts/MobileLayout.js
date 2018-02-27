import React from 'react';
import { Icon } from 'antd';
import { SegmentedControl, NavBar, Drawer, List } from 'antd-mobile';
import { Route, Redirect, Switch } from 'dva/router';
import { getRoutes } from '../utils/utils';
import styles from './MobileLayout.less';

class MobileLayout extends React.PureComponent {
  state = {
    open: false,
  }
  onOpenChange = () => {
    this.setState({ open: !this.state.open });
  }

  render() {
    const sidebar = (
      <List>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i, index) => {
          if (index === 0) {
            return (
              <List.Item
                key={index}
                thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                multipleLine
              >Category
              </List.Item>
            );
          }
          return (
            <List.Item
              key={index}
              thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
            >Category{index}
            </List.Item>
          );
        })}
      </List>
    );
    const { routerData, match } = this.props;
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="user" />}
          onLeftClick={this.onOpenChange}
          rightContent={<Icon type="message" />}
        >
          <SegmentedControl values={['帮我送', '帮我取', '帮我买', '帮办事']} style={{ width: '100%' }} />
        </NavBar>
        <Drawer
          className={styles.myDrawer}
          style={{ minHeight: document.documentElement.clientHeight }}
          enableDragHandle
          sidebar={sidebar}
          open={this.state.open}
          onOpenChange={this.onOpenChange}
        >
          <Switch>
            {getRoutes(match.path, routerData).map(item =>
              (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              )
            )}
            <Redirect exact from="/" to="/dashboard/analysis" />
          </Switch>
        </Drawer>
      </div>
    );
  }
}

export default MobileLayout;
