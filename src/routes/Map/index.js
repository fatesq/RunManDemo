import React from 'react';
import { Map } from 'react-amap';
import SearchBox from './SearchBox';
import styles from './index.less';

export default class MapC extends React.PureComponent {
  constructor(props) {
    super(props);
    this.mapEvents = {
      created(map) {
        console.log(map);
        console.log(AMap);
      },
    };
  }
  componentDidMount() {}
  render() {
    return (
      <div id="123" style={{ width: '100%', height: '100%' }}>
        <Map amapkey="788e08def03f95c670944fe2c78fa76f" events={this.mapEvents}>
          <SearchBox />
        </Map>
      </div>
    );
  }
}
