import React from 'react';
import { connect } from 'dva';
import { Tabs, Accordion, List } from 'antd-mobile';
import { process } from '../../services/api';


const { Item } = List;
const { Brief } = Item;
@connect(({ login }) => ({
  userId: login.id,
}))
export default class Coupon extends React.PureComponent {
  state={
    rows: [],
  }
  componentWillMount() {
    const info = {
      bean: 'coupon',
      method: 'pageCoupon',
      page: 1,
      rows: 99,
      //  userId: this.props.userId,
      isUsed: 0,
    }
    process(info).then((res) => {
      console.log(res)
      this.setState({ rows: res.rows });
    });
  }
  render() {
    console.log(this.state.rows)
    return (
      <Tabs
        tabs={[
          { title: '未使用' },
          { title: '已使用' },
          { title: '已过期' },
        ]
        }

      >
        <div style={{ height: '100%', backgroundColor: '#fff' }}>
          {
            this.state.rows.map((item) => {
              return (
                <div>
                  <Item align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                    新用户优惠 <Brief>有效日期： {item.invalidTime}</Brief>
                  </Item>
                  <Accordion accordion openAnimation={{}} className="my-accordion" onChange={this.onChange}>
                    <Accordion.Panel header="可用品类：全品类">
                      <div style={{ padding: '0 20px' }}>{item.type == 1 ? '8折' : '优惠'}</div>
                    </Accordion.Panel>
                  </Accordion>
                </div>
              );
            })
          }
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
          暂无内容
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
          暂无内容
        </div>
      </Tabs>
    );
  }
}
