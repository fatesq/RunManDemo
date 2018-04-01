import React from 'react';
import { connect } from 'dva';
import { Tabs, Card, List, Button } from 'antd-mobile';


const { Item } = List;
const { Brief } = Item;
const status = [{ title: '全部' }, { title: '待接单' }, { title: '待取单' }, { title: '配送中' },
  { title: '已完成' }, { title: '已取消' }];

@connect(({ order, loading, login }) => ({
  order,
  userId: login.id,
  submitting: loading.effects['order/list'],
}))
export default class Get extends React.PureComponent {
  componentWillMount() {
    this.getList();
  }
  getList = (data, index) => {
    this.props.dispatch({
      type: 'order/list',
      payload: {
        userId: this.props.userId,
        bean: 'order',
        method: 'pageOrder',
        page: 1,
        rows: 999,
        orderStatus: index ? index : '',
      },
    });
  }
  toInfo = (orderId) => {
    this.props.dispatch({
      type: 'order/getinfo',
      payload: {
        userId: this.props.userId,
        orderId,
      },
    });
  }
  cancelOrder = (orderId) => {
    this.props.dispatch({
      type: 'order/cancel',
      payload: {
        userId: this.props.userId,
        orderId,
      },
    });
  }
  signOrder = (orderId) => {
    this.props.dispatch({
      type: 'order/sign',
      payload: {
        userId: this.props.userId,
        orderId,
      },
    });
  }
  render() {
    console.log(this.props.order.list);
    return (
      <Tabs
        tabs={status}
        onChange={(tab, index) => this.getList(tab, index)}
      >
        <div style={{ height: '100%', backgroundColor: '#fff' }}>
          { this.props.order.list.map((item) => {
            return (
              <Card>
                <Card.Body>
                  <Item extra={`${status[item.orderStatus].title}`} align="top" multipleLine>
                    单号：<span style={{ fontSize: '12px' }}>{item.orderId}</span>
                    <Brief>
                      <div>地址：{item.receiverAddress}</div>
                      <div>收件人：{item.receiverName}</div>
                      <div>电话：{item.receiverPhone}</div>
                    </Brief>
                  </Item>
                  <Item extra={`合计 ${item.payPrice / 100}`}>{item.createTime}</Item>
                </Card.Body>
                <Card.Footer
                  extra={
                    <div>
                      <Button type="ghost" inline onClick={() => { this.toInfo(item.orderId); }} size="small" style={{ marginRight: '4px' }}>查看订单</Button>
                      {
                        item.orderStatus == 1 ?
                          <Button type="ghost" inline onClick={() => { this.cancelOrder(item.orderId); }} size="small" style={{ marginRight: '4px' }}>取消订单</Button>
                        : ''
                      }
                      {
                        item.orderStatus == 5 ?
                          <Button type="ghost" inline onClick={() => { this.signOrder(item.orderId); }} size="small" style={{ marginRight: '4px' }}>完成订单</Button>
                        : ''
                      }
                    </div>
                  }
                />
              </Card>
            );
          })}
        </div>
      </Tabs>
    );
  }
}
