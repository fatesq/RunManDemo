import React from 'react';
import { Tabs, Card, List, Button } from 'antd-mobile';


const { Item } = List;
const { Brief } = Item;
export default class Get extends React.PureComponent {
  render() {
    return (
      <Tabs
        tabs={[
          { title: '全部' },
          { title: '待接单' },
          { title: '待取单' },
          { title: '配送中' },
          { title: '已完成' },
          { title: '已取消' },
        ]
        }
      >
        <div style={{ height: '100%', backgroundColor: '#fff' }}>
          <Card>
            <Card.Body>
              <Item extra="待接单" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                订单编号：20181111112
                <Brief>
                  <div>地址：莲花新城</div>
                  <div>收件人：多多</div>
                  <div>电话：123456</div>
                </Brief>
              </Item>
              <Item extra="合计 51">2018/2/19 21.51</Item>
            </Card.Body>
            <Card.Footer
              extra={
                <div>
                  <Button type="ghost" inline size="small" style={{ marginRight: '4px' }}>查看订单</Button>
                  <Button type="ghost" inline size="small" style={{ marginRight: '4px' }}>取消订单</Button>
                </div>
              }
            />
          </Card>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
          Content of second tab
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
          Content of third tab
        </div>
      </Tabs>
    );
  }
}
