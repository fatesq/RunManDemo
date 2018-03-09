import React from 'react';
import { Tabs, Accordion, List } from 'antd-mobile';


const { Item } = List;
const { Brief } = Item;
export default class Get extends React.PureComponent {
  render() {
    return (
      <List renderHeader={() => '2月'} className="my-list">
        <Item extra={<div>帮我送<div style={{ marginTop: 6 }}>$12</div></div>} align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
          2018.2.9 周五 3:38
          <Brief>
            <div>莲花新城</div>
            <div>奥体名作</div>
          </Brief>
        </Item>
        <Item extra={<div>帮我送<div style={{ marginTop: 6 }}>$12</div></div>} align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
          2018.2.9 周五 3:38
          <Brief>
            <div>莲花新城</div>
            <div>奥体名作</div>
          </Brief>
        </Item>
        <Item extra={<div>帮我送<div style={{ marginTop: 6 }}>$12</div></div>} align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
          2018.2.9 周五 3:38
          <Brief>
            <div>莲花新城</div>
            <div>奥体名作</div>
          </Brief>
        </Item>
        <Item extra={<div>帮我送<div style={{ marginTop: 6 }}>$12</div></div>} align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
          2018.2.9 周五 3:38
          <Brief>
            <div>莲花新城</div>
            <div>奥体名作</div>
          </Brief>
        </Item>
      </List>
    );
  }
}
