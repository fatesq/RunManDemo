import React from 'react';

export default class MapC extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const iframe = document.getElementById('test').contentWindow;
    document.getElementById('test').onload = () => {
      iframe.postMessage('hello', 'https://m.amap.com/picker/');
    };
    window.addEventListener('message', (e) => { 
      alert('您选择了:' + e.data.name + ',' + e.data.location)
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
