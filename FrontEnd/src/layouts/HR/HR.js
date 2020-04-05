import React from "react";
import "./HR.scss";
import HRstaff from "../../components/HR/HR";
import { withRouter } from "react-router-dom";

class HRlayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="hr-layout-container container-fluid p-0">
        <HRstaff />
      </div>
    );
  }
}

export default withRouter(HRlayout);
