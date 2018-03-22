import React from 'react';

export default class MapC extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <div>
        <iframe
          id="test"
          src="https://m.amap.com/picker/?center=116.3972,39.9696&key=608d75903d29ad471362f8c58c550daf"
          width="100%"
          height="100%"
          frameBorder="0"
        >
        </iframe>
      </div>
    );
  }
}
