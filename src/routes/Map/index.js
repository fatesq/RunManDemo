import React from 'react';
import { Map } from 'react-amap';
import SearchBox from './SearchBox';
import styles from './index.less';

export default class MapC extends React.PureComponent {
  constructor(props) {
    super(props);
    this.mapEvents = {
      created(map) {
        map.setZoom(14);
      },
    };
    this.plugins = [{
      name: 'ToolBar',
      options: {
        locate: false,
      },
    }];
  }
  componentDidMount() {}
  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Map amapkey="788e08def03f95c670944fe2c78fa76f" events={this.mapEvents} plugins={this.plugins} >
          <SearchBox />
        </Map>
      </div>
    );
  }
}
