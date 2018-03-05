import React from 'react';
import { findDOMNode } from 'react-dom';
import { SearchBar, ActionSheet, Icon } from 'antd-mobile';
import styles from './index.less';

export default class SearchBox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.map = this.props.__map__; // 接收地图实例
  }
  componentDidMount() {
    window.AMap.service(['AMap.PlaceSearch', 'AMap.Autocomplete', 'AMap.Geolocation'], () => {
      try {
        this.ready(); // 初始化地图插件
      } catch (e) {
        console.error(e);
      }
    });
  }

  ready = () => {
    const { AMap } = window;
    const auto = new AMap.Autocomplete({ input: 'tipinput' }); // 挂查询补全
    const geolocation = new window.AMap.Geolocation(); // 挂定位
    const placeSearch = new AMap.PlaceSearch({ pageSize: 5, pageIndex: 1, map: this.map, panel: 'poiList' }); // 挂搜索
    this.map.addControl(geolocation);
    geolocation.getCurrentPosition();
    AMap.event.addListener(auto, 'select', (e) => { // 监听选择项
      // 设置搜索的城市
      placeSearch.setCity(e.poi.adcode);
      // 开始搜索对应的poi名称
      placeSearch.search(e.poi.name, (status, results) => {
        console.log(status, results);
        // this.showActionSheet(results);
        if (results.pois && results.pois.length > 0) {
          console.log(results);
        }
      });
    });
    AMap.event.addListener(geolocation, 'complete', (e) => { console.log(e); }); // 返回定位信息
    AMap.event.addListener(geolocation, 'error', (e) => { console.log(e); }); // 返回定位出错信息
  }

  render() {
    console.log(this.map);
    return (
      <div>
        <div className={styles.searchBox}>
          <SearchBar ref={(e) => {
                try { e.inputRef.id = 'tipinput'; } catch (error) { console.log(''); }
              }
            }
          />
        </div>
        <div id="panel" className={styles.panel}>
          <a className={styles.showHideBtn}>&nbsp;</a>
          <div id="emptyTip">没有内容！</div>
          <div id="poiList" className={styles.poiList} />
        </div>
      </div>
    );
  }
}
