import React from 'react';
import { Icon } from 'antd';
import { SegmentedControl, NavBar } from 'antd-mobile';

class MobileLayout extends React.PureComponent {
  render() {
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="user" />}
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={<Icon type="message" />}
        >
          <SegmentedControl values={['帮我送', '帮我取', '帮我买', '帮办事']} />
        </NavBar>
        <SegmentedControl values={['帮我送', '帮我取', '帮我买', '帮办事']} />
      </div>
    );
  }
}

export default MobileLayout;
