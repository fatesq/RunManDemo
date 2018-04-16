import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { Carousel, Drawer, List, NoticeBar } from 'antd-mobile';
import { Route, Redirect, Switch, NavLink } from 'dva/router';
import { getRoutes, isWeiXin } from '../utils/utils';
import { getIP } from '../services/api';
import styles from './MobileLayout.less';


@connect(({ global, login, loading }) => ({
  global,
  openid: login.openid,
  login,
  submitting: loading.effects['login/login'],
}))
class MobileLayout extends React.PureComponent {
  state = {
    open: false,
    data: ['/1.jpg', '/2.jpg', '/3.jpg'],
    imgHeight: 176,
  }
  componentWillMount() {
    console.log(this.props)
    if (!this.props.openid) {
      window.location.hash = isWeiXin() ? '/user/login' : '/user/plogin';
    } else {
      this.props.dispatch({ type: 'global/weixinConfig' });
    }
    getIP().then((res) => {
      this.setState({ city: res.city });
    });
  }

  onOpenChange = () => {
    this.setState({ open: !this.state.open });
  }

  render() {
    const sidebar = (
      <List style={{ height: '100%' }}>
        <List.Item
          thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
          multipleLine
        >{localStorage.phone}
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
          <NavLink to="/yf">运费说明</NavLink>
        </List.Item>
        <List.Item>
          <NavLink to="/yj">意见反馈</NavLink>
        </List.Item>
        <div style={{ position: 'fixed', bottom: 0, display: 'flex', width: '100%' }}>
          <div style={{ flex: 1, textAlign: 'center'}}>
            <NavLink to="/zm">
              <img src="/paonanzhaomu.jpg" alt="/" />
            </NavLink>
            <div>跑男招募</div>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <NavLink to="/yq">
              <img src="/yaoqinghaoyou.jpg" alt="/YQ" />
            </NavLink>
            <div>邀请好友</div>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }} onClick={() => { window.location.hash = '/order'; }}>
            <img src="/wodedingdan.jpg" alt="/order" />
            <div>我的订单</div>
          </div>
        </div>
      </List>
    );
    const { routerData, match } = this.props;
    return (
      <div>
        <Drawer
          className={styles.myDrawer}
          drawerBackgroundColor="#FFFFFF"
          style={{ minHeight: document.documentElement.clientHeight }}
          sidebarStyle={{ backgroundColor: '#FFF', width: '60%' }}
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
                  {this.state.city}
                </div>
              </div>
            </div>
          </div>
          {/* <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
            公告: 欢迎使用跑男&#39;欢迎使用跑男.
          </NoticeBar> */}
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
