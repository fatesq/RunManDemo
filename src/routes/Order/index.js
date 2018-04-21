import React from 'react';
import { connect } from 'dva';
import { Tabs, Card, List, Button, Modal, Flex, TextareaItem } from 'antd-mobile';
import { Rate } from 'antd';
import { comment } from '../../services/api'


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
  state = {
    id: '',
    show: false,
    val: 5,
    txt: '',
  }
  componentWillMount() {
    this.getList();
  }
  getList = (data, index) => {
    let info = {
      userId: this.props.userId,
      bean: 'order',
      method: 'pageOrder',
      page: 1,
      rows: 999,
    };
    if (index) {
      info.orderStatus = index;
    }
    this.props.dispatch({
      type: 'order/list',
      payload: info,
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
  Comment = (id, stars) => {
    if (stars) {
      alert('您已经评价过了');
    } else {
      this.setState({ id, show: true });
    }
  }
  handleComment = () => {
    const info = {
      orderId: this.state.id,
      comment: this.state.txt,
      stars: this.state.val,
    }
    comment(info).then((res) => {
      if (res.status == '00') {
        this.setState({ show: false });
      } else {
        alert(res.msg)
        this.setState({ show: false });
      }
    })
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
                <Modal
                  popup
                  visible={this.state.show}
                  onClose={() => { this.setState({ show: false }); }}
                  animationType="slide-up"
                >
                  <List
                    renderHeader={
                      <Flex justify="between">
                        <Flex.Item onClick={() => { this.setState({ show: false }); }}>取消</Flex.Item>
                        <Flex.Item style={{ textAlign: 'center' }}>评价跑男</Flex.Item >
                        <Flex.Item style={{ textAlign: 'right' }} onClick={this.handleComment}>确认</Flex.Item >
                      </Flex>
                    }
                  >
                    <Rate value={this.state.val} onChange={(val) => { this.setState({ val }); }} />
                    <TextareaItem
                      title="其他想说的:"
                      clear
                      placeholder="点击输入其他的评价描述"
                      autoHeight
                      rows="3"
                      onChange={(txt) => { this.setState({ txt }); }}
                    />
                  </List>
                </Modal>
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
                        item.orderStatus == 3 ?
                          <Button type="ghost" inline onClick={() => { this.signOrder(item.orderId); }} size="small" style={{ marginRight: '4px' }}>完成订单</Button>
                        : ''
                      }
                      {
                        item.orderStatus == 4 ?
                          <Button type="ghost" inline onClick={() => { this.Comment(item.orderId, item.stars); }} size="small" style={{ marginRight: '4px' }}>评价跑男</Button>
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
