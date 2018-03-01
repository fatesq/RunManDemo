import React from 'react';
import { Map } from 'react-amap';
import styles from './index.less';

export default class MapC extends React.PureComponent {
  componentDidMount() {}
  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Map amapkey="788e08def03f95c670944fe2c78fa76f" />
      </div>
    );
  }
}
