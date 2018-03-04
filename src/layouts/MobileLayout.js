import React from 'react';
import { Icon } from 'antd';
import { SegmentedControl, NavBar, Drawer, List } from 'antd-mobile';
import { Route, Redirect, Switch, NavLink } from 'dva/router';
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
        {
          // <NavBar
          //   mode="light"
          //   icon={<Icon type="user" />}
          //   onLeftClick={this.onOpenChange}
          //   rightContent={<Icon type="message" />}
          // >
          //   <SegmentedControl values={['帮我送', '帮我取', '帮我买', '帮办事']} style={{ width: '100%' }} />
          // </NavBar>
        }
        <div className={styles['detail-header-bg']}>
          <div id="head" className={styles['header-dom']}>
            <div className={`${styles['mui-flex']} ${styles['main-dom']}`}>
              <div className={styles['left-btns']}>
                <Icon type="user" className={styles.icon} onClick={this.onOpenChange} />
              </div>
              <ul className={`${styles.cells} ${styles['header-nav']}`}>
                <NavLink to="/home/deliver" activeClassName={styles.actives} ><li data-index="0" data-x="0" className="active">帮我送</li></NavLink>
                <NavLink to="/home/get" activeClassName={styles.actives} ><li data-index="1" data-x="75">帮我取</li></NavLink>
                <NavLink to="/home/buy" activeClassName={styles.actives} ><li data-index="2" data-x="150">帮我买</li></NavLink>
                <NavLink to="/home/todo" activeClassName={styles.actives} ><li data-index="3" data-x="225">帮办事</li></NavLink>
              </ul>
              <div className={styles['right-btns']}>
                <Icon type="message" className={styles.icon} />
              </div>
            </div>
          </div>
        </div>
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
            <Redirect exact from="/" to="/deliver" />
          </Switch>
        </Drawer>
      </div>
    );
  }
}

export default MobileLayout;
