import React from "react";
import "./Nav.scss";
import { withRouter } from "react-router-dom";

class HRNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="hr-nav-container">
        <div className="logo">
          <img
            alt="logo"
            className="big-logo"
            src={require("../../../utils/images/logo.png")}
            style={{ height: "56px" }}
            onClick={() => this.props.history.push("/")}
          />
        </div>
        <button
          className="hr-create-campaign-btn align-self-center"
          onClick={() => {
            this.props.history.push("/recruit_create");
          }}
        >
          Create new campaign
        </button>
      </div>
    );
  }
}

export default withRouter(HRNav);
