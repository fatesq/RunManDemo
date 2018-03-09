import React from 'react';
import { Icon, Form } from 'antd';
import { WingBlank, Carousel, Switch, List, InputItem, Stepper, WhiteSpace, Radio, Flex, Modal, Checkbox, DatePicker } from 'antd-mobile';
import { Link } from 'dva/router';
import styles from './index.less';


const { Item } = List;
const { Brief } = Item;
const { RadioItem } = Radio;
const { AgreeItem } = Checkbox;
@Form.create()
export default class Get extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showInsured: false,
      tip: 1,
      weight: 1,
    };
  }
  onChangeWeight = (val) => {
    console.log(val);
    this.setState({ weight: val });
  }
  onChangeTip = (val) => {
    console.log(val);
    this.setState({ tip: val });
  }
  handleShowInsured = () => {
    this.setState({ showInsured: !this.state.showInsured });
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div>
        <Carousel>
          <a style={{ display: 'inline-block', width: '100%', height: 'auto' }}>
            <img
              src="https://fe.imdada.cn/crane/1.10.13/images/bg.337719.jpg"
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                window.dispatchEvent(new Event('resize'));
              }}
            />
          </a>
        </Carousel>
        <WingBlank>
          <List>
            <Item><div className={styles.center}>附近有 <a>3</a> 位跑男为您服务</div></Item>
            <Link to="/map"><Item arrow="horizontal" onClick={() => {}}>物品寄到哪里去</Item></Link>
            <Item arrow="horizontal" onClick={() => {}}>物品从哪寄</Item>
            <Item align="top" multipleLine>
              <DatePicker
                okText="确定"
                dismissText="取消"
                value={this.state.date}
                onChange={date => console.log(date)}
              >
                <div className={styles.center}><Icon type="clock-circle-o" /> 立刻发单</div>
              </DatePicker>
            </Item>
          </List>
          <WhiteSpace size="xs" />
          <List>
            <Item
              extra={
                <Stepper
                  style={{ width: '100%', minWidth: '100px' }}
                  showNumber
                  min={0}
                  value={this.state.weight}
                  onChange={this.onChangeWeight}
                />
              }
            >
              物品重量
            </Item>
            <Item arrow="horizontal" onClick={this.handleShowInsured}>保价</Item>
            <Modal
              popup
              visible={this.state.showInsured}
              onClose={this.handleShowInsured}
              animationType="slide-up"
            >
              <List
                renderHeader={
                  <Flex justify="between">
                    <Flex.Item onClick={this.handleShowInsured}>取消</Flex.Item>
                    <Flex.Item style={{ textAlign: 'center' }}>选择物品信息</Flex.Item >
                    <Flex.Item style={{ textAlign: 'right' }}>确认</Flex.Item >
                  </Flex>
                }
              >
                <Item>
                  5.00元保价
                  <Brief>
                  若商品出现损坏或丢失,最高可获得1000.00元赔付
                  </Brief>
                </Item>
                <Item>
                  5.00元保价
                  <Brief>
                  若商品出现损坏或丢失,最高可获得1000.00元赔付
                  </Brief>
                </Item>
                <Item>
                  5.00元保价
                  <Brief>
                  若商品出现损坏或丢失,最高可获得1000.00元赔付
                  </Brief>
                </Item>
                <Item >
                  <AgreeItem style={{ textAlign: 'center' }} data-seed="logId" onChange={e => console.log('checkbox', e)}>
                    我已阅读并同意<a onClick={(e) => { e.preventDefault(); alert('agree it'); }}>《物品保价协议》</a>
                  </AgreeItem>
                  <Brief style={{ textAlign: 'center' }}>赔付金额以物品实际价格凭证为准,<br /> 不超过所选保价方案赔付金额</Brief>
                </Item>
              </List>
            </Modal>
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
