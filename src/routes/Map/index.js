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
    document.getElementById('test').onload = () => {
      iframe.postMessage('', 'https://m.amap.com/picker/');
    };
    window.addEventListener('message', (e) => {
      console.log(e);
      this.props.dispatch({
        type: 'map/send',
        payload: { ...e.data },
      });
    }, false);
  }
  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <iframe
          id="test"
          src="https://m.amap.com/picker/?key=608d75903d29ad471362f8c58c550daf"
          width="100%"
          height="100%"
          frameBorder="0"
        >
        </iframe>
      </div>
    );
  }
}
