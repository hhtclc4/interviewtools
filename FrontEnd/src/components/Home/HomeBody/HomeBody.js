import React from "react";
import "./HomeBody.scss";
import RecruitThumbnail from "../../../utils/RecruitThumbnail/RecruitThumbnail";
import { Tabs, Panel } from "../../../utils/Tab/Tabs";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/index";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";

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
      data: nextProps.campaigns,
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
            <div className="candidate-job-search-container mx-3 mb-5">
              <div className="candidate-job-search">
                <input className="search-ipt" placeholder="Search jobs ..." />
                <button className="search-btn">Search</button>
              </div>
            </div>
            <div className="candidate-job-seek container-fluid">
              <div className="candidate-job-seek-header p-2 d-flex flex-row">
                <div
                  className="candidate-post-icon align-self-center"
                >
                  <FontAwesomeIcon icon={faNewspaper} size="2x" color="white" className="align-self-center" /></div>
                <h5 className="flex-grow-1 align-self-center">
                  RECENT HOT JOB
                </h5>
                <h5 className="align-self-center">See all</h5>
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
            <div className="candidate-job-hire d-flex flex-row px-2 flex-wrap">
              <div className="hire-text d-flex flex-row" >
                <span className="mr-2">How we</span>
                <p className="trans-text">hire</p>
                <div className="trans-bg-text">
                  hire
                </div>
              </div>
              <div className="hire-steps d-flex flex-row flex-wrap ml-auto">
                <div className="hire-step mr-4 ">
                  <h4><b>Step 1</b></h4>
                  <img alt="step" src={require("../images/step1.png")} className="step-img" />
                  <p>
                    Test with Online Quizzes by Department Head
                  </p>
                </div>
                <div className="hire-step">
                  <h4><b>Step 2</b></h4>
                  <img alt="step" src={require("../images/step2.png")} className="step-img" />
                  <p>
                    Interview directly Department Head
                  </p>
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
    campaigns: state.campaigns,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HomeBody));
