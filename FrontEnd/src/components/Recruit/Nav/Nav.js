import React from "react";
import "./Nav.scss";
import { withRouter } from "react-router-dom";

class RecruitNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="recruit-nav-container d-flex flex-row justify-content-start p-0">
        <div>
          <img
            className="big-logo"
            src={require("../../../utils/images/logo.png")}
            alt="quiz-icon"
          />
        </div>
      </div>
    );
  }
}

export default withRouter(RecruitNav);
