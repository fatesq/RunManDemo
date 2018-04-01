import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { Carousel, Drawer, List } from 'antd-mobile';
import { Route, Redirect, Switch, NavLink } from 'dva/router';
import { getRoutes, isWeiXin } from '../utils/utils';
import styles from './MobileLayout.less';


@connect(({ global, login, loading }) => ({
  global,
  openid: login.openid,
  submitting: loading.effects['login/login'],
}))
class MobileLayout extends React.PureComponent {
  state = {
    open: false,
    data: ['/1.jpg', '/2.jpg', '/3.jpg'],
    imgHeight: 176,
  }
  componentWillMount() {
    if (!this.props.openid) {
      window.location.hash = isWeiXin() ? '/user/login' : '/user/plogin';
    } else {
      this.props.dispatch({ type: 'global/weixinConfig' });
    }
  }

  onOpenChange = () => {
    this.setState({ open: !this.state.open });
  }

  render() {
    const sidebar = (
      <List>
        <List.Item
          thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
          multipleLine
        >15850777777
        </List.Item>
        <List.Item>
          <NavLink to="/coupon">优惠券与管理</NavLink>
        </List.Item>
        <List.Item>
          <NavLink to="/bills">发票与报销</NavLink>
        </List.Item>
        <List.Item>
          <NavLink to="/order">我的订单</NavLink>
        </List.Item>
        <List.Item>
          运费说明
        </List.Item>
        <List.Item>
          意见反馈
        </List.Item>
      </List>
    );
    const { routerData, match } = this.props;
    return (
      <div>
        <Drawer
          className={styles.myDrawer}
          drawerBackgroundColor="#FFFFFF"
          style={{ minHeight: document.documentElement.clientHeight }}
          sidebarStyle={{ backgroundColor: '#FFF' }}
          enableDragHandle
          sidebar={sidebar}
          open={this.state.open}
          onOpenChange={this.onOpenChange}
        >
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
          <Carousel
            autoplay={false}
            infinite
            selectedIndex={1}
            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
            afterChange={index => console.log('slide to', index)}
          >
            {this.state.data.map(val => (
              <a
                key={val}
                // href="http://www.alipay.com"
                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
              >
                <img
                  src={val}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top' }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
              </a>
            ))}
          </Carousel>
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
