import React from "react";
import "./HomeBody.scss";
import RecruitThumbnail from "../../../utils/RecruitThumbnail/RecruitThumbnail";
import { Tabs, Panel } from "../../../utils/Tab/Tabs";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/index";
import { withRouter } from "react-router-dom";

class HomeBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotTabsCount: 4,
      data: [
        {
          id: 0,
          title: "",
          subject_id: 0,
          company_address: "",
          level_id: 0,
          amount_required: 0,
          work_type_id: 0,
          sex: 0,
          experience: 0,
          salary: 0,
          deadline: "",
          user_id: 0,
          work_description: "",
          candidate_req: "",
          candidate_benefits: "",
        },
      ],
    };
  }

  componentDidMount() {
    this.props.showListCampaign();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.campaign,
    });
    console.log(nextProps);
  }
  render() {
    let { data } = this.state;
    let tabElm = data.map((campaign, index) => {
      return (
        <RecruitThumbnail key={campaign.id} index={index} data={campaign} />
      );
    });
    return (
      <div className="home-body-container container-fluid">
        {/* <video className="video-intro" src={require("../images/outlanders_header.webm")} autoPlay={true} loop={true}></video> */}
        <div className="row">
          <div className="col-2"></div>
          <div className="col-lg-8 py-3 px-0">
            <div className="candidate-job-seek container-fluid">
              <div className="candidate-job-seek-header p-3 d-flex flex-row">
                <img
                  className="candidate-post-icon align-self-center"
                  alt="news"
                  src={require("../images/news.png")}
                />
                <h4 className="flex-grow-1 align-self-center">
                  RECENT HOT JOB
                </h4>
                <h4 className="align-self-center">See all >></h4>
              </div>
              <div className="candidate-job-seek-body">
                <div className="recruit-list">
                  <Tabs selected={0}>
                    <Panel title="">{tabElm}</Panel>
                    <Panel>Tabs2</Panel>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    showListCampaign: () => {
      dispatch(actions.showListCampaign());
    },
  };
};

const mapStateToProps = (state) => {
  return {
    campaign: state.campaign,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HomeBody));
