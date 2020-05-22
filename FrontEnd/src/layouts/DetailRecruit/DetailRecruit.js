import React from "react";

import { withRouter } from "react-router-dom";

import HomeNav from "../../components/Home/Nav/Nav";
import DetailRecruit from "../../components/Home/HomeBody/DetailRecruit/DetailRecruit";

class DetailRecruitLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="home-container">
        <HomeNav />
        <DetailRecruit />
      </div>
    );
  }
}

export default withRouter(DetailRecruitLayout);
