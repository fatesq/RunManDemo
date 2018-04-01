import React from 'react';
import { connect } from 'dva';
import { Button, List, TextareaItem, WhiteSpace, InputItem } from 'antd-mobile';

const { Item } = List;
const { Brief } = Item;
const orderType = ['帮我送', '帮我取', '帮我买', '帮办事'];
const orderStatus = ['待接单', '待取单', '配送中', '已完成', '已取消'];
const INSURED = [
  { value: 0, label: '5.00元保价', num: 5, extra: '若商品出现损坏或丢失,最高可获得1000.00元赔付' },
  { value: 1, label: '3.00元保价', num: 3, extra: '若商品出现损坏或丢失,最高可获得300.00元赔付' },
  { value: 2, label: '1.00元保价', num: 1, extra: '若商品出现损坏或丢失,最高可获得100.00元赔付' },
  { value: 3, label: '不保价', num: 0, extra: '若商品出现损坏或丢失,最高可获得30元优惠赔付券' },
];
@connect(({ order, loading }) => ({
  obj: order.obj,
  submitting: loading.effects['order/info'],
}))
export default class OrderInfo extends React.PureComponent {
  handlePay = () => {
    console.log(this.props.userId);
    this.props.dispatch({
      type: 'order/pay',
      payload: {
        orderId: this.props.obj.orderId,
        payType: this.props.obj.payType,
      },
    });
  }
  render() {
    const { obj } = this.props;
    console.log(obj)
    return (
      <div>
        <Item extra={<div>{orderStatus[Number(obj.orderStatus) - 1]}<div style={{ marginTop: 6 }}>价格: ￥{obj.payPrice / 100}</div></div>} align="top" multipleLine>
          {orderType[obj.orderType]}
          <Brief>
            <div>订单号: {obj.orderId}</div>
          </Brief>
        </Item>
        {/* <InputItem value={obj.sendName} editable={false}>发件人</InputItem>
        <InputItem value={obj.sendPhone} editable={false} >联系方式</InputItem> */}
        <InputItem value={obj.sendAddress} editable={false}>发件地址:</InputItem>
        {/* <InputItem value={obj.receiverName} editable={false}>收件人</InputItem>
        <InputItem value={obj.receiverPhone} editable={false} >联系方式</InputItem> */}
        <InputItem value={obj.receiverAddress} editable={false}>收件地址:</InputItem>
        <InputItem value={obj.departureTime} editable={false}>接单时间:</InputItem>
        <InputItem value={`${obj.goodsWeight}kg`} editable={false}>物品重量:</InputItem>
        <InputItem value={obj.signFace == 1 ? '是' : '否'} editable={false}>需要收件人当面签收:</InputItem>
        <InputItem value={INSURED[obj.insuredType].label} editable={false}>保价:</InputItem>
        <TextareaItem title="备注信息:" value={obj.tip} editable={false} autoHeight />
        <InputItem value={`￥${obj.extra / 100}`} editable={false}>小费:</InputItem>
        <InputItem value={`￥${obj.nightShift / 100}`} editable={false}>夜班费:</InputItem>
        <WhiteSpace />
        {obj.payStatus != 1 ? <Button type="primary" onClick={this.handlePay}>确定支付</Button> : ''}
        <WhiteSpace />
        {obj.orderStatus == 1 ? <Button type="warning" onClick={this.handlePay}>取消订单</Button> : ''}
        {obj.orderStatus == 5 ? <Button type="primary" onClick={this.handlePay}>确认收货</Button> : ''}
      </div>
    );
  }
}
