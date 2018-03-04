import React from 'react';
import styles from './index.less';

export default class SearchBox extends React.PureComponent {
  map = this.props.__map__;
  componentDidMount() {
    window.AMap.service(['AMap.PlaceSearch', 'AMap.Autocomplete'], () => {
      try {
        this.ready();
      } catch (e) {
        console.error(e);
      }
    });
  }

  ready = () => {
    const { AMap } = window;
    const auto = new AMap.Autocomplete({ input: 'tipinput' });
    const placeSearch = new AMap.PlaceSearch({
      pageSize: 5,
      pageIndex: 1,
      map: this.map,
      panel: 'poiList',
    });
    AMap.event.addListener(auto, 'select', (e) => {
      console.log(e);
      // 设置搜索的城市
      placeSearch.setCity(e.poi.adcode);
      // 开始搜索对应的poi名称
      placeSearch.search(e.poi.name, (status, results) => {
        console.log(status, results);
        if (results.pois && results.pois.length > 0) {
          console.log(results);
        }
      });
    });
  }

  render() {
    console.log(this.map);
    return (
      <div>
        <div className={styles.searchBox}>
          <input id="tipinput" className={styles.tipinput} type="input" placeholder="请输入关键字搜索" />
          <div>
            <div>&#10005;</div>
          </div>
        </div>
        <div id="panel" className={styles.panel}>
          <div id="emptyTip">没有内容！</div>
          <div id="poiList" />
        </div>
      </div>
    );
  }
}
