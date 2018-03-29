import React from 'react';
import { connect } from 'dva';
import { Icon, Form } from 'antd';
import { Switch, List, InputItem, Stepper, WhiteSpace, Radio, Flex, Modal, Tag, Checkbox, DatePicker } from 'antd-mobile';
import moment from 'moment';
import styles from './index.less';


const { Item } = List;
const { Brief } = Item;
const { AgreeItem } = Checkbox;
const { RadioItem } = Radio;
const GOODS = ['文件', '鲜花', '蛋糕', '水果生鲜', '食品饮料', '其他'];
const PRICE = ['0-50元', '50-100元', '100-300元', '300-500元', '500以上'];
const INSURED = [
  { value: 0, label: '5.00元保价', num: 5, extra: '若商品出现损坏或丢失,最高可获得1000.00元赔付' },
  { value: 1, label: '3.00元保价', num: 3, extra: '若商品出现损坏或丢失,最高可获得300.00元赔付' },
  { value: 2, label: '1.00元保价', num: 1, extra: '若商品出现损坏或丢失,最高可获得100.00元赔付' },
  { value: 3, label: '不保价', num: 0, extra: '若商品出现损坏或丢失,最高可获得30元优惠赔付券' },
];
const nowTimeStamp = Date.now();
const now = moment(nowTimeStamp);
@connect(({ home, login, map, loading }) => ({
  home,
  config: home.config,
  map,
  userId: login.id,
  submitting: loading.effects['login/login'],
}))
@Form.create()
export default class Deliver extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: false,
      showInsured: false,
      time: now, // 下单时间
      extra: 1, // 小费
      orderType: 0, // 帮我送
      payType: 2, // 支付类型:微信
      goodsType: 5, // 商品类型
      goodsValue: '0-50元', // 价格区间
      goodsWeight: 1, // 重量
      insuredType: 3, // 保价类型
      signFace: 1,
      nightCost: 2,
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'home/config',
      payload: {
        city: '南京',
      },
    }).then(() => {
      const { nightCost } = this.props.config;
      this.setState({ nightCost });
    });
    this.props.dispatch({
      type: 'home/getlenth',
      payload: {
        origins: '118.783132,32.038221',
        destination: '118.768461,32.041279',
      },
    });
  }
  onChangeTip = (val) => {
    this.setState({ extra: val });
  }
  onChangWeight = (val) => {
    this.setState({ goodsWeight: val });
  }
  onChangeInsured = (val) => {
    this.setState({ insuredType: val });
  }

  handleShowBasic = () => {
    this.setState({ showInfo: !this.state.showInfo });
  }
  handleShowInsured = () => {
    this.setState({ showInsured: !this.state.showInsured });
  }
  handleGoodsType = (val) => {
    this.setState({ goodsType: val });
  }
  handleGoodsValue = (val) => {
    this.setState({ goodsValue: val });
  }
  handleTime = (val) => {
    this.setState({ time: val });
  }
  handleSignFace = (val) => {
    this.setState({ signFace: val ? 1 : 2 });
  }
  handleSend = (type) => {
    this.props.dispatch({
      type: 'map/type',
      payload: type,
    });
  }
  handlePayType = (val) => {
    this.setState({ payType: val });
  }

  handleSubmit = () => {
    const info = {
      orderType: this.state.orderType,
      departureTime: this.state.time,
      extra: this.state.extra,
      payType: this.state.payType,
      goodsType: this.state.goodsType,
      goodsValue: this.state.goodsValue,
      goodsWeight: this.state.goodsWeight,
      insuredType: this.state.insuredType,
      signFace: this.state.signFace,
      nightShift: '1',
      payPrice: '1',
      useId: this.props.userId,
      city: '南京',
      ...this.props.map.send,
      ...this.props.map.receiver,
    };
    this.props.dispatch({
      type: 'home/submit',
      payload: {
        order: { ...info },
      },
    });
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div>
        <List>
          <Item><div className={styles.center}>附近有 <a>3</a> 位跑男为您服务</div></Item>
          <Item arrow="horizontal" onClick={() => this.handleSend(1)}>物品从哪寄</Item>
          <Item arrow="horizontal" onClick={() => this.handleSend(2)}>物品寄到哪里去</Item>
          <Item align="top" multipleLine>
            <DatePicker
              // value={this.state.time}
              okText="确定"
              dismissText="取消"
              format="YYYY-MM-DD HH:mm"
              // mode="datatime"
              onOk={this.handleTime}
            >
              <div className={styles.center}><Icon type="clock-circle-o" /> 立刻发单</div>
            </DatePicker>
          </Item>
        </List>
        <WhiteSpace size="xs" />
        <List>
          <Item onClick={this.handleShowBasic}>
            选择物品信息
            <Brief>
              <Flex style={{ textAlign: 'center' }}>
                <Flex.Item className={styles.column} ><Icon type="appstore" /><span>{GOODS[this.state.goodsType]}</span></Flex.Item>
                <Flex.Item className={styles.column} ><Icon type="pay-circle" /><span>{this.state.goodsValue}</span></Flex.Item>
                <Flex.Item className={styles.column} ><Icon type="tag" /><span>{this.state.goodsWeight}公斤</span></Flex.Item>
              </Flex>
            </Brief>
          </Item>
          <Modal
            popup
            visible={this.state.showInfo}
            onClose={this.handleShowBasic}
            animationType="slide-up"
          >
            <List
              renderHeader={
                <Flex justify="between">
                  <Flex.Item onClick={this.handleShowBasic}>取消</Flex.Item>
                  <Flex.Item style={{ textAlign: 'center' }}>选择物品信息</Flex.Item >
                  <Flex.Item style={{ textAlign: 'right' }} onClick={this.handleShowBasic} >确认</Flex.Item >
                </Flex>
              }
            >
              <Item multipleLine>
                物品类型
                <Brief>
                  <Flex wrap="wrap">
                    {GOODS.map((i, index) => {
                      return (
                        <Tag
                          className={styles.goodsTag}
                          selected={this.state.goodsType === index}
                          key={i}
                          onChange={() => this.handleGoodsType(index)}
                        >{i}
                        </Tag>
                      );
                    })}
                  </Flex>
                </Brief>
              </Item>
              <Item multipleLine>
                物品价值
                <Brief>
                  <Flex wrap="wrap">
                    {PRICE.map((i) => {
                      return (
                        <Tag
                          className={styles.goodsTag}
                          selected={this.state.goodsValue === i}
                          key={i}
                          onChange={() => this.handleGoodsValue(i)}
                        >{i}
                        </Tag>
                      );
                    })}
                  </Flex>
                </Brief>
              </Item>
              <Item multipleLine>
                物品重量
                <Brief style={{ textAlign: 'center' }}>
                  <Stepper
                    style={{ width: '100%', maxWidth: '50%' }}
                    showNumber
                    min={1}
                    max={15}
                    value={this.state.goodsWeight}
                    onChange={this.onChangWeight}
                  />
                  <div>5公斤以内不加价（最大15公斤）</div>
                </Brief>
              </Item>
            </List>
          </Modal>
          <Item arrow="horizontal" extra={INSURED[this.state.insuredType].label} onClick={this.handleShowInsured}>保价</Item>
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
                  <Flex.Item style={{ textAlign: 'right' }} onClick={this.handleShowInsured}>确认</Flex.Item >
                </Flex>
              }
            >
              {INSURED.map(i => (
                <RadioItem
                  key={i.value}
                  checked={this.state.insuredType === i.value}
                  onChange={() => this.onChangeInsured(i.value)}
                >
                  {i.label}<List.Item.Brief>{i.extra}</List.Item.Brief>
                </RadioItem>
              ))}
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
                  initialValue: this.state.signFace === 1,
                  valuePropName: 'checked',
                })}
                onClick={this.handleSignFace}
              />
            }
          >
              当面签收
          </Item>
          <InputItem
            {...getFieldProps('account', {
              // initialValue: 'little ant',
              rules: [
                { required: true, message: '请输入备注信息' },
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
                value={this.state.extra}
                onChange={this.onChangeTip}
              />
            }
          >
            小费
          </Item>
          <Item extra={`￥ ${this.state.nightCost}`}>夜班津贴</Item>
          <Item extra={`￥ ${1}`}>跑腿费</Item>
        </List>
        <WhiteSpace size="xs" />
        <List>
          <Item>
            支付方式
            <RadioItem
              style={{ paddingLeft: 0 }}
              checked={this.state.payType === 2}
              onChange={() => { this.handlePayType(2); }}
            >
              <Icon type="wechat" style={{ color: '#1aad19' }} />&nbsp;微信支付
            </RadioItem>
          </Item>
        </List>
        <WhiteSpace />
        <div className={styles.actionBarContainer}>
          <div className={styles.actionBarWrap}>
            <div className={styles.left}>
              共 { this.state.extra} 元
            </div>
            <div className={styles.trade} onClick={this.handleSubmit}>
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
