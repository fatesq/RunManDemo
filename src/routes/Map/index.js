import React from 'react';
import { connect } from 'dva';

@connect(({ map }) => ({ map }))
export default class MapC extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const iframe = document.getElementById('test').contentWindow;
    window.addEventListener('message', (e) => {
      const loc = event.data;
      if (loc && loc.module == 'locationPicker') { // 防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
        this.props.dispatch({
          type: 'map/send',
          payload: { ...e.data },
        });
      }                           
    }, false);
  }
  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <iframe
          id="test"
          src="http://apis.map.qq.com/tools/locpicker?search=1&type=1&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp"
          width="100%"
          height="100%"
          frameBorder="0"
        >
        </iframe>
      </div>
    );
  }
}
