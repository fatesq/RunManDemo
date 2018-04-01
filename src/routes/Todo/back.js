import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Icon, Form } from 'antd';
import { Switch, List, InputItem, Stepper, WhiteSpace, Radio, Flex, Modal, Tag, Checkbox, DatePicker } from 'antd-mobile';
import { isWeiXin } from '../../utils/utils';
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
const now = moment().format('YYYY-MM-DD HH:MM:SS');
console.log(now)
@connect(({ home, login, map, loading }) => ({
  home,
  config: home.config,
  results: home.results,
  map,
  userId: login.id,
  submitting: loading.effects['login/login'],
}))
@Form.create()
export default class Todo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      radio: 1,
      showInfo: false,
      showInsured: false,
      time: now, // 下单时间
      extra: 1, // 小费
      orderType: 1, // 帮我送
      payType: 2, // 支付类型:微信
      goodsType: 5, // 商品类型
      goodsValue: '0-50元', // 价格区间
      goodsWeight: 1, // 重量
      insuredType: 3, // 保价类型
      signFace: 1,
      nightCost: 0,
      buyCost: 0,
      baseWeight: 0,
      weightCost: 0,
      baseDistance: 0,
      distanceCost: 0,
      timeAmount: 0,
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'home/config',
      payload: {
        city: '南京',
      },
    }).then(() => {
      const { giveCost, nightCost, baseWeight, weightCost, baseDistance, distanceCost } = this.props.config;
      this.setState({ buyCost: giveCost, nightCost, baseWeight, weightCost, baseDistance, distanceCost });
    });
    if (this.props.map.send.positionOriginating && this.props.map.receiver.positionDestination) {
      this.props.dispatch({
        type: 'home/getlenth',
        payload: {
          origins: this.props.map.send.positionOriginating,
          destination: this.props.map.receiver.positionDestination,
        },
      }).then(() => {
        const { distance } = this.props.results[0];
        this.setState({ distance });
      });
    }
  }
  onRadioChange = (radio) => {
    this.setState({ radio });
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
    this.setState({ time: moment(val).format('YYYY-MM-DD HH:MM:SS') });
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
    if (!this.props.map.send.positionOriginating) {
      alert('未选择发件地址');
      return;
    }
    if (!this.props.map.receiver.positionDestination) {
      alert('未选择收件地址');
      return;
    }
    const { extra, payType, goodsType, goodsValue,
      goodsWeight, insuredType, signFace, nightCost, buyCost, baseWeight, weightCost,
      baseDistance, distanceCost, distance, timeAmount } = this.state;
    const distanceAmount
    = (distanceCost * 100) * Math.round((distance / 1000) > 3 ? (distance / 1000) - 3 : 0);
    const payPrice = ((extra * 100) + (buyCost * 100) + (baseWeight * 100) + (baseDistance * 100)
    + ((weightCost * 100) * (goodsWeight > 5 ? goodsWeight - 5 : 0))
    + distanceAmount
    + (INSURED[insuredType].num * 100));
    const info = {
      useId: this.props.userId,
      orderType: this.state.orderType,
      departureTime: this.state.time,
      goodsType,
      goodsValue,
      goodsWeight,
      payType,
      insuredType,
      signFace,
      extra: extra * 100,
      payPrice: 1,
      distanceAmount,
      timeAmount,
      nightShift: nightCost * 100,
      city: '南京',
      distance,
      tip: this.props.form.getFieldsValue().account,
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
    const { showInfo, showInsured, extra, payType, goodsType, goodsValue,
      goodsWeight, insuredType, signFace, nightCost, buyCost, baseWeight, weightCost,
      baseDistance, distanceCost, distance } = this.state;

    const payPrice = ((extra * 100) + (buyCost * 100) + (baseWeight * 100) + (baseDistance * 100)
    + ((weightCost * 100) * (goodsWeight > 5 ? goodsWeight - 5 : 0))
    + ((distanceCost * 100) * Math.round((distance / 1000) > 3 ? (distance / 1000) - 3 : 0)) 
    + (INSURED[insuredType].num * 100)) / 100;
    return (
      <div>
        <List>
          <Item><div className={styles.center}>附近有 <a>3</a> 位跑男为您服务</div></Item>
          <Item>
            <Flex>
              <Flex.Item>
                <Radio checked={this.state.radio === 0} name="logId" onChange={() => this.onRadioChange(0)}>
                  需要取资料
                </Radio>
              </Flex.Item>
              <Flex.Item style={{ textAlign: 'right' }}>
                <Radio className={styles['my-radio']} checked={this.state.radio === 1} name="logId" onChange={() => this.onRadioChange(1)}>
                  不需要取资料
                </Radio>
              </Flex.Item>
            </Flex>
          </Item>
          <Item arrow="horizontal" onClick={() => this.handleSend(1)}>
            { this.props.map.send.positionOriginating ? this.props.map.send.sendAddress : this.state.radio == 0 ? '取资料地址' : '办事地址' }
          </Item>
          <Item arrow="horizontal" onClick={() => this.handleSend(2)}>
            { this.props.map.send.positionDestination ? this.props.map.receiver.receiverAddress : '物品送到哪里去' }
          </Item>
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
                <Flex.Item className={styles.column} ><Icon type="appstore" /><span>{GOODS[goodsType]}</span></Flex.Item>
                <Flex.Item className={styles.column} ><Icon type="pay-circle" /><span>{goodsValue}</span></Flex.Item>
                <Flex.Item className={styles.column} ><Icon type="tag" /><span>{goodsWeight}公斤</span></Flex.Item>
              </Flex>
            </Brief>
          </Item>
          <Modal
            popup
            visible={showInfo}
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
                          selected={goodsType === index}
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
                          selected={goodsValue === i}
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
                    value={goodsWeight}
                    onChange={this.onChangWeight}
                  />
                  <div>5公斤以内不加价（最大15公斤）</div>
                </Brief>
              </Item>
            </List>
          </Modal>
          <Item arrow="horizontal" extra={INSURED[insuredType].label} onClick={this.handleShowInsured}>保价</Item>
          <Modal
            popup
            visible={showInsured}
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
                  checked={insuredType === i.value}
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
                  initialValue: signFace === 1,
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
                value={extra}
                onChange={this.onChangeTip}
              />
            }
          >
            小费
          </Item>
          <Item extra={`￥ ${nightCost}`}>夜班津贴</Item>
          <Item extra={`￥ ${buyCost}`}>跑腿费</Item>
        </List>
        <WhiteSpace size="xs" />
        <List>
          <Item>
            支付方式
            <RadioItem
              style={{ paddingLeft: 0 }}
              checked={payType === 2}
              onChange={() => { this.handlePayType(2); }}
            >
              <Icon type="wechat" style={{ color: '#1aad19' }} />&nbsp;微信支付
            </RadioItem>
            {
              isWeiXin() ?
              '' :
                (
                  <RadioItem
                    style={{ paddingLeft: 0 }}
                    checked={payType === 1}
                    onChange={() => { this.handlePayType(1); }}
                  >
                    <Icon type="alipay-circle" style={{ color: '#7EC0EE' }} />&nbsp;支付宝
                  </RadioItem>
                ) 
            }
          </Item>
        </List>
        <WhiteSpace />
        <div className={styles.actionBarContainer}>
          <div className={styles.actionBarWrap}>
            <div className={styles.left}>
              共 { payPrice } 元
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
