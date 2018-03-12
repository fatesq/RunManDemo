import React from 'react';
import { findDOMNode } from 'react-dom';
import { SearchBar, Modal, ListView, List } from 'antd-mobile';
import styles from './index.less';

const { Item } = List;
const { Brief } = Item;

export default class SearchBox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.map = this.props.__map__; // 接收地图实例
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      showInsured: false,
      text: '',
      list: [],
      dataSource,
      isLoading: true,
    };
  }

  componentDidMount() {
    console.log(navigator.geolocation.getCurrentPosition);
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
    const geolocation = new window.AMap.Geolocation({
      enableHighAccuracy: true, // 是否使用高精度定位，默认:true
      timeout: 10000, // 超过10秒后停止定位，默认：无穷大
      maximumAge: 0, // 定位结果缓存0毫秒，默认：0
      convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
      showButton: true, // 显示定位按钮，默认：true
      buttonPosition: 'LB', // 定位按钮停靠位置，默认：'LB'，左下角
      buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
      showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
      panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
      zoomToAccuracy: true, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    }); // 挂定位
    const placeSearch = new AMap.PlaceSearch({ pageSize: 5, pageIndex: 1, citylimit: true, map: this.map }); // 挂搜索
    this.map.addControl(geolocation);
    geolocation.getCurrentPosition();
    // console.log(geolocation.getCurrentPosition());
    AMap.event.addListener(auto, 'select', (e) => { // 监听选择项
      // 设置搜索的城市
      this.setState({ text: e.poi.name });
      placeSearch.setCity(e.poi.adcode);
      // 开始搜索对应的poi名称
      placeSearch.search(e.poi.name, (status, results) => {
        console.log(status, results, 55);
        // this.showActionSheet(results);
        this.handleShowInsured();
        if (results.poiList.pois && results.poiList.pois.length > 0) {
          this.setState({
            list: results.poiList.pois,
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
          });
        }
      });
    });
    AMap.event.addListener(geolocation, 'complete', (e) => { console.log(e); }); // 返回定位信息
    AMap.event.addListener(geolocation, 'error', (e) => { console.log(e); }); // 返回定位出错信息
  }

  handleShowInsured = () => {
    this.setState({ showInsured: !this.state.showInsured });
  }

  handleEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    // setTimeout(() => {
    //   this.rData = { ...this.rData, ...genData(++pageIndex) };
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRows(this.rData),
    //     isLoading: false,
    //   });
    // }, 1000);
  }

  render() {
    console.log(this.state.dataSource);
    return (
      <div>
        <div className={styles.searchBox}>
          <SearchBar
            value={this.state.text}
            onChange={(e) => { this.setState({ text: e }); }}
            ref={(e) => {
                try { e.inputRef.id = 'tipinput'; } catch (error) { console.log(''); }
              }
            }
          />
        </div>
        <div id="panel" className={styles.panel}>
          <a className={styles.showHideBtn}>&nbsp;</a>
          <div id="emptyTip">没有内容！</div>
          <div id="poiList">没有内容！</div>
        </div>
        {
          <Modal
            popup
            visible={this.state.showInsured}
            onClose={this.handleShowInsured}
            animationType="slide-up"
          >
            <ListView
              ref={el => this.lv = el}
              dataSource={this.state.dataSource}
              renderFooter={() => (
                <div style={{ padding: 30, textAlign: 'center' }}>
                  {this.state.isLoading ? 'Loading...' : 'Loaded'}
                </div>
              )}
              renderRow={(rowData, sectionID, rowID) => {
                console.log(rowData, sectionID, rowID, 'row');
                return (
                  <Item key={rowID} arrow="horizontal" multipleLine onClick={() => {}}>
                    {rowData.name}
                    <Brief>
                      {rowData.pname + rowData.cityname + rowData.adname + rowData.address }
                    </Brief>
                  </Item>
                );
              }}
              style={{
                height: this.state.height,
                overflow: 'auto',
              }}
              pageSize={4}
              onScroll={() => { console.log('scroll'); }}
              scrollRenderAheadDistance={500}
              onEndReached={this.handleEndReached}
              onEndReachedThreshold={10}
            />
          </Modal>
        }
      </div>
    );
  }
}
