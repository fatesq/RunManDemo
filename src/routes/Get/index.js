import React from 'react';
import { Icon, Form } from 'antd';
import { WingBlank, Carousel, Switch, List, InputItem, Stepper, WhiteSpace, Radio } from 'antd-mobile';
import { Link } from 'dva/router';
import styles from './index.less';


const { Item } = List;
const { Brief } = Item;
const { RadioItem } = Radio;
@Form.create()
export default class Get extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: ['1', '2', '3'],
      imgHeight: 176,
      tip: 0,
    };
  }
  onChangeTip = (val) => {
    console.log(val);
    this.setState({ tip: val });
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div>
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
              href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
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
        <WingBlank>
          <List>
            <Item><div className={styles.center}>附近有 <a>3</a> 位跑男为您服务</div></Item>
            <Link to="/map"><Item arrow="horizontal" onClick={() => {}}>物品寄到哪里去</Item></Link>
            <Item arrow="horizontal" onClick={() => {}}>物品从哪寄</Item>
            <Item align="top" multipleLine>
              <div className={styles.center}><Icon type="clock-circle-o" /> 立刻发单</div>
            </Item>
          </List>
          <WhiteSpace size="xs" />
          <List>
            <Item> &nbsp;</Item>
            <Item arrow="horizontal" onClick={() => {}}>保价</Item>
            <Item
              extra={
                <Switch
                  {...getFieldProps('Switch1', {
                    initialValue: true,
                    valuePropName: 'checked',
                  })}
                  onClick={(checked) => { console.log(checked); }}
                />
              }
            >
                当面签收
            </Item>
            <InputItem
              {...getFieldProps('account', {
                // initialValue: 'little ant',
                rules: [
                  { required: true, message: 'Please input account' },
                  { validator: this.validateAccount },
                ],
              })}
              clear
              error={!!getFieldError('account')}
              onErrorClick={() => {
                alert(getFieldError('account').join('、'));
              }}
              placeholder="请输入您的备注信息"
            >备注信息
            </InputItem>
          </List>
          <WhiteSpace size="xs" />
          <List>
            <Item
              extra={
                <Stepper
                  style={{ width: '100%', minWidth: '100px' }}
                  showNumber
                  min={0}
                  value={this.state.tip}
                  onChange={this.onChangeTip}
                />
              }
            >
              小费
            </Item>
            <Item extra={`￥ ${1}`}>夜班津贴</Item>
            <Item extra={`￥ ${1}`}>跑腿费</Item>
          </List>
          <WhiteSpace size="xs" />
          <List>
            <Item>
              支付方式
              <RadioItem
                style={{ paddingLeft: 0 }}
                checked
                onChange={() => { }}
              >
                <Icon type="wechat" style={{ color: '#1aad19' }} />&nbsp;微信支付
              </RadioItem>
            </Item>
          </List>
          <WhiteSpace />
        </WingBlank>
        <div className={styles.actionBarContainer}>
          <div className={styles.actionBarWrap}>
            <div className={styles.left}>
              1234
            </div>
            <div className={styles.trade}>
              <a className={styles.buy} role="button">
                发布
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
