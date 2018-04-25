import React from 'react';
import { Icon, NavBar, Tabs } from 'antd-mobile';
import { process } from '../../services/api';

const tabs = [
  { title: '我的邀请' },
  { title: '奖励明细' },
];
const u = navigator.userAgent;
const app = navigator.appVersion;
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // g
const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
export default class YQ extends React.PureComponent {
  state = {
    list1: [],
    list2: [],
  }
  componentWillMount() {
    process({
      bean: 'user',
      method: 'pageUser',
      invitorPhone: localStorage.phone,
      page: 1,
      rows: 99,
    }).then((res) => {
      this.setState({ list1: res.rows });
    });
    process({
      bean: 'bounty',
      method: 'pageBounty',
      invitorPhone: localStorage.phone,
      page: 1,
      rows: 99,
    }).then((res) => {
      this.setState({ list2: res.rows });
    });
  }
  Share = (type) => {
    const info = {
      title: '巴比跑腿',
      URL: `http://39.107.112.14:6479/getshare?phone=${localStorage.phone}`,
      type,
      content: '巴比跑腿',
    };
    if (isAndroid) {
      window.android.WeChatShare(JSON.stringify(info));
    }
    if (isIOS) {
      Native.WeChatShare(info);
    } else {
      window.wx.onMenuShareTimeline({
        title: '巴比跑腿', // 分享标题
        link: `http://39.107.112.14:6479/getshare?phone=${localStorage.phone}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: '', // 分享图标
        success: function () {
        // 用户确认分享后执行的回调函数
          alert('分享成功');
        }
      });
    }
  }
  render() {
    return (
      <div style={{ width: '100%', textAlign: 'center' }} >
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => { window.location.hash = '/'; }}
        >邀请好友
        </NavBar>
        <div>
          <div style={{ backgroundColor: '#FFF', paddingBottom: '20px' }}>
            <img style={{ width: '100%', maxWidth: '750px', height: 'auto', margin: '0 auto' }} src="/one.jpg" alt="" />
            <div style={{ display: 'flex', backgroundColor: '#FFF', margin: '20px', padding: '10px' }}>
              <div style={{ flex: 1 }}>
                <img src="/i1.png" style={{ width: '50px', height: '50px' }} alt="" onClick={() => this.Share(1)} />
              </div>
              <div style={{ flex: 1 }}>
                <img src="/i2.jpg" style={{ width: '50px', height: '50px' }} alt="" onClick={() => this.Share(2)} />
              </div>
              <div style={{ flex: 1 }}>
                <img src="/i3.png" style={{ width: '50px', height: '50px' }} alt="" />
              </div>
            </div>
          </div>
          <Tabs tabs={tabs}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
              {
                this.state.list1 ?
                (
                  this.state.list1.map((item) => {
                    return (
                      <p style={{ padding: '5px' }}>{item.bountyDesc}</p>
                    );
                  })
                )
                : '您还没有奖励'
              }
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
              {
                this.state.list2 ?
                (
                  this.state.list2.map((item)=> {
                    return (
                      <p style={{ padding: '5px' }}>{item.bountyDesc}</p>
                    );
                  })
                )
                : '您还没有奖励'
              }
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
}
