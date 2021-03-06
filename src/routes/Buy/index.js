import React from 'react';
import { connect } from 'dva';
import { Icon, Form } from 'antd';
import { Switch, List, TextareaItem, InputItem, Stepper, WhiteSpace, Radio, Flex, Modal, Tag, Checkbox, DatePicker } from 'antd-mobile';
import moment from 'moment';
import styles from './index.less';
import { isWeiXin } from '../../utils/utils';

const { Item } = List;
const { Brief } = Item;
const { AgreeItem } = Checkbox;
const { RadioItem } = Radio;
const GOODS = ['随意购', '超市代购', '买烟买酒', '日常用品', '买早餐', '买宵夜', '买水果', '买药品'];
const INSURED = [
  { value: 0, label: '5.00元保价', num: 5, extra: '若商品出现损坏或丢失,最高可获得1000.00元赔付' },
  { value: 1, label: '3.00元保价', num: 3, extra: '若商品出现损坏或丢失,最高可获得300.00元赔付' },
  { value: 2, label: '1.00元保价', num: 1, extra: '若商品出现损坏或丢失,最高可获得100.00元赔付' },
  { value: 3, label: '不保价', num: 0, extra: '若商品出现损坏或丢失,最高可获得30元优惠赔付券' },
];
const now = moment().format('YYYY-MM-DD HH:mm');
@connect(({ home, login, map, loading }) => ({
  home,
  config: home.config,
  results: home.results,
  map,
  userId: login.id,
  submitting: loading.effects['login/login'],
}))
@Form.create()
export default class Buy extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: false,
      showInsured: false,
      time: now, // 下单时间
      extra: 0, // 小费
      orderType: 3, // 帮我送
      payType: 2, // 支付类型:微信
      goodsType: 0, // 商品类型
      goodsValue: 0, // 价格区间
      goodsWeight: 5, // 重量
      insuredType: 3, // 保价类型
      signFace: 1,
      nightCost: 0,
      buyCost: 0,
      baseWeight: 0,
      weightCost: 0,
      baseDistance: 0,
      distanceCost: 0,
      timeAmount: 0,
      showTime: '立即发单',
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'home/config',
      payload: {
        city: '南京',
      },
    }).then(() => {
      const { buyCost, nightCost, baseWeight, weightCost, baseDistance, distanceCost } = this.props.config;
      this.setState({ buyCost, nightCost, baseWeight, weightCost, baseDistance, distanceCost });
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
    this.setState({ time: moment(val).format('YYYY-MM-DD HH:mm') });
    this.setState({ showTime: moment(val).format('YYYY-MM-DD HH:mm') });
  }
  handleSignFace = (val) => {
    this.setState({ signFace: val ? 1 : 2 });
  }
  handleSend = (type) => {
    localStorage.page = 3;
    this.props.dispatch({
      type: 'map/type',
      payload: type,
    });
  }
  handlePayType = (val) => {
    this.setState({ payType: val });
  }
  handleShowM = () => {
    this.setState({ showM: !this.state.showM });
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
    = distanceCost * Math.round((distance / 1000) > baseDistance ? (distance / 1000) - baseDistance : 0);
    const payPrice = ((extra * 100) + (buyCost * 100)
    + ((weightCost * 100) * (goodsWeight > baseWeight ? goodsWeight - baseWeight : 0)) + (nightCost * 100)
    + ((distanceCost * 100) * Math.round((distance / 1000) > baseDistance ? (distance / 1000) - baseDistance : 0))
    + (INSURED[insuredType].num * 100)) / 100;
    const info = {
      useId: this.props.userId,
      orderType: this.state.orderType,
      departureTime: this.state.time,
      goodsType,
      goodsValue: this.props.form.getFieldsValue().price,
      goodsWeight,
      payType,
      insuredType,
      signFace,
      extra: extra * 100,
      payPrice,
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
    const { showInsured, extra, payType, goodsType, goodsValue,
      goodsWeight, insuredType, signFace, nightCost, buyCost, baseWeight, weightCost,
      baseDistance, distanceCost, distance, showTime } = this.state;

    const payPrice = ((extra * 100) + (buyCost * 100)
    + ((weightCost * 100) * (goodsWeight > baseWeight ? goodsWeight - baseWeight : 0)) + (nightCost * 100)
    + ((distanceCost * 100) * Math.round((distance / 1000) > baseDistance ? (distance / 1000) - baseDistance : 0))
    + (INSURED[insuredType].num * 100)) / 100;
    const distanceAmount
    = distanceCost * Math.round((distance / 1000) > baseDistance ? (distance / 1000) - baseDistance : 0);
    return (
      <div>
        <List>
          <Item><div className={styles.center}>附近有 <a>3</a> 位跑男为您服务</div></Item>
          <Item arrow="horizontal" onClick={() => this.handleSend(1)}>
            { this.props.map.send.positionOriginating ? this.props.map.send.sendAddress : '选择购买地址' }
          </Item>
          <Item arrow="horizontal" onClick={() => this.handleSend(2)}>
            { this.props.map.send.positionDestination ? this.props.map.receiver.receiverAddress : '选择收货地址' }
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
              <div className={styles.center}><Icon type="clock-circle-o" /> {showTime}</div>
            </DatePicker>
          </Item>
        </List>
        <WhiteSpace size="xs" />
        <List>
          <div className={styles['tag-container']}>
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
          </div>
          <TextareaItem
            title="购买物品"
            {...getFieldProps('account', {
              // initialValue: 'little ant',
              rules: [
                { required: true, message: '请输入您需要购买的商品' },
              ],
            })}
            clear
            error={!!getFieldError('account')}
            onErrorClick={() => {
              alert(getFieldError('account').join('、'));
            }}
            placeholder="请输入您需要购买的商品"
            autoHeight
          />
          <InputItem
            {...getFieldProps('price')}
            clear
            error={!!getFieldError('price')}
            onErrorClick={() => {
              alert(getFieldError('price').join('、'));
            }}
            placeholder="根据票据线下支付"
          >物品价格
          </InputItem>
          <Item
            extra={
              <Stepper
                style={{ width: '100%', minWidth: '100px' }}
                showNumber
                min={0}
                value={goodsWeight}
                onChange={this.onChangWeight}
              />
            }
          >
            物品重量
          </Item>
          {/* {<Item arrow="horizontal" extra={INSURED[insuredType].label} onClick={this.handleShowInsured}>保价</Item>
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
          </Modal>} */}
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
          { /* <Item extra={`￥ ${nightCost}`}>夜班津贴</Item>
          <Item extra={`￥ ${buyCost}`}>跑腿费</Item> */}
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
              <div onClick={this.handleShowM} style={{ paddingLeft: '10px' }}><img src="/jiagemingxi.jpg" alt="" width="15" height="15" /> 价格明细</div>
              <Modal
                popup
                visible={this.state.showM}
                onClose={this.handleShowM}
                animationType="slide-up"
              >
                <List
                  renderHeader={
                    <Flex justify="between">
                      <Flex.Item onClick={this.handleShowM}>取消</Flex.Item>
                      <Flex.Item style={{ textAlign: 'center' }}>价格明细</Flex.Item >
                      <Flex.Item style={{ textAlign: 'right' }} onClick={this.handleShowM}>确认</Flex.Item >
                    </Flex>
                  }
                >
                  <Item extra={`${payPrice} 元`}>需要支付金额</Item>
                  <Item extra={`${Number(distanceAmount) + Number(buyCost)} 元`}>跑腿费</Item>
                  <Item extra={`${((weightCost * 100) * (goodsWeight > baseWeight ? goodsWeight - baseWeight : 0)) / 100} 元`}>重量</Item>
                  <Item extra={`${INSURED[insuredType].num} 元`}>保价</Item>
                  <Item extra={`${extra} 元`}>小费</Item>
                  <Item extra={`${nightCost} 元`}>夜班津贴</Item>
                  {
                    /* <Item extra={`${buyCost} 元`}>基础服务费</Item> */
                  }
                </List>
              </Modal>
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
