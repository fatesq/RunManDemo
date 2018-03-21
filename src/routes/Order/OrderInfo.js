import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd-mobile';

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
    return (
      <div>
        测试支付{this.props.obj.orderId}
        <Button onClick={this.handlePay}>确定支付</Button>
      </div>
    );
  }
}
