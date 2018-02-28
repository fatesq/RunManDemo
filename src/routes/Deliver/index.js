import React from 'react';
import { Icon, Form } from 'antd';
import { WingBlank, Carousel, Switch, List } from 'antd-mobile';
import { Route } from 'dva/router';
import styles from './index.less';


const { Item } = List;
@Form.create()
export default class Deliver extends React.PureComponent {
  state = {
    data: ['1', '2', '3'],
    imgHeight: 176,
  }
  render() {
    const { getFieldProps } = this.props.form;
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
            <Item arrow="horizontal" onClick={() => {}}>物品寄到哪里去</Item>
            <Item arrow="horizontal" onClick={() => {}}>物品从哪寄</Item>
            <Item align="top" multipleLine>
              <div className={styles.center}><Icon type="clock-circle-o" /> 立刻发单</div>
            </Item>
          </List>
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
              placeholder="please input account"
            >Account
            </InputItem>
          </List>
        </WingBlank>
      </div>
    );
  }
}
