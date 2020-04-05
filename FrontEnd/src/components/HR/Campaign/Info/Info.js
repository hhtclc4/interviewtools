import React from "react";
import { withRouter } from "react-router-dom";

class HRInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div>Info here</div>;
  }
}

export default withRouter(HRInfo);
