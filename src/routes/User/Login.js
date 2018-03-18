import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Checkbox, Alert, Icon } from 'antd';
import Login from '../../components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  state = {
    type: 'mobile',
    pageType: true,
  }
  componentWillMount() {
    console.log(window.localStorage.code);
    this.props.dispatch({
      type: 'login/login',
      payload: {
        code: window.localStorage.code,
        // type,
      },
    });
  }

  onTabChange = (type) => {
    this.setState({ type });
  }

  onGetCaptcha = () => {
    alert('短信发送');
  }

  handlePageType = () => {
    this.setState({ pageType: !this.state.pageType });
  }

  handleSubmit = (err, values) => {
    const { type } = this.state;
    console.log(values);
    if (!err) {
      this.props.dispatch({
        type: 'login/login',
        payload: {
          ...values,
          // type,
        },
      });
    }
  }

  renderMessage = (content) => {
    return (
      <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    );
  }

  render() {
    const { login, submitting } = this.props;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
        >
          {
            login.status === 'error' &&
            login.type === 'mobile' &&
            !login.submitting &&
            this.renderMessage('验证码错误')
          }
          <Mobile name="mobile" />
          <Captcha name="captcha" onGetCaptcha={this.onGetCaptcha} />
          <Submit loading={submitting}>绑定手机号</Submit>
          {/* <div style={{ textAlign: 'center' }}>
            <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>
              <a>同意服务条款</a>
            </Checkbox>
            <div className={styles.other} style={{ textAlign: 'center' }}>
              {
                this.state.pageType
                ?
                  <span>没有账号?<a onClick={this.handlePageType}>去注册</a></span>
                :
                  <span>注册过?<a onClick={this.handlePageType}>点击登陆</a></span>
              }
            </div>
          </div> */}
        </Login>
      </div>
    );
  }
}
