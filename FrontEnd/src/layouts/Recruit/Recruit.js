import React from "react";
import "./Recruit.scss";
import { withRouter } from "react-router-dom";

import RecruitNav from "../../components/HR/Recruit/Nav/Nav";
import RecruitEditor from "../../components/HR/Recruit/RecruitEditor/RecruitEditor";
class Recruit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="recruit-page containter-fluid">
        <div className="row">
          <div className="col-xl ">
            <RecruitNav />
          </div>
        </div>
        <div className="row">
          <div className="col-xl">
            <RecruitEditor />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Recruit);
