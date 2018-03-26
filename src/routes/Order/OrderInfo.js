import React from 'react';
import { connect } from 'dva';
import { Button, List, InputItem } from 'antd-mobile';

const { Item } = List;
const { Brief } = Item;
const orderType = ['帮我送', '帮我取', '帮我买', '帮办事'];
const orderStatus = ['待接单', '待取单', '配送中', '已完成', '已取消'];
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
      },
    });
  }
  render() {
    const { obj } = this.props;
    return (
      <div>
        <Item extra={<div>{orderStatus[obj.orderStatus - 1]}<div style={{ marginTop: 6 }}>价格: ￥{obj.payPrice / 100}</div></div>} align="top" multipleLine>
          {orderType[obj.orderType]}
          <Brief>
            <div>订单号: {obj.orderId}</div>
          </Brief>
        </Item>
        <InputItem value={obj.sendName} editable={false}>发件人</InputItem>
        <InputItem value={obj.sendPhone} editable={false} >联系方式</InputItem>
        <InputItem value={obj.sendAddress} editable={false}>发件地址</InputItem>
        <InputItem value={obj.receiverName} editable={false}>收件人</InputItem>
        <InputItem value={obj.receiverPhone} editable={false} >联系方式</InputItem>
        <InputItem value={obj.receiverAddress} editable={false}>收件地址</InputItem>
        <InputItem value={`${obj.goodsWeight}斤`} editable={false}>物品重量</InputItem>
        <InputItem value={obj.signFace == 1 ? '是' : '否'} editable={false}>需要收件人当面签收</InputItem>
        <InputItem value={obj.receiverAddress} editable={false}>保价</InputItem>
        <InputItem value={obj.receiverAddress} editable={false}>收件地址</InputItem>
        <Button onClick={this.handlePay}>确定支付</Button>
      </div>
    );
  }
}
