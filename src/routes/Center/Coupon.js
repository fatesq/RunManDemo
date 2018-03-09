import React from 'react';
import { Tabs, Accordion, List } from 'antd-mobile';


const { Item } = List;
const { Brief } = Item;
export default class Get extends React.PureComponent {
  render() {
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
          <Item align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
            新用户优惠 <Brief>有效日期： 2018.3.28</Brief>
          </Item>
          <Accordion accordion openAnimation={{}} className="my-accordion" onChange={this.onChange}>
            <Accordion.Panel header="可用品类：全品类">
              <div>详细的优惠券内容</div>
            </Accordion.Panel>
          </Accordion>
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
