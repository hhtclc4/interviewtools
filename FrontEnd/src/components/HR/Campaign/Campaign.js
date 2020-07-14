import React from "react";
import "./Campaign.scss";
import { Tabs, Panel } from "../../../utils/Tab/Tabs";
import HRInfo from "./Info/Info";
import HRInterview from "./Interview/Interview";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/index";
import HRNav from "../Nav/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faCalendarCheck,
} from "@fortawesome/free-regular-svg-icons";
import { faInfo, faTasks, faUsers } from "@fortawesome/free-solid-svg-icons";
import CompletedInterview from "./CompletedInterview/CompletedInterview";
import HRCandidate from "./Candidate/Candidate";

class HRCampaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      campaign_id: this.props.match.params.campaign_id,
    };
  }
  componentDidMount() {
    let { campaign_id } = this.state;
    this.props.getInterviews(campaign_id);
    this.props.getAvailableCandidatesAPI(campaign_id);
    this.props.getCompletedInterviewsAPI(campaign_id);
    this.props.getCollectedCandidatesAPI();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.campaign.title,
    });
  }
  render() {
    let { title } = this.state;
    return (
      <div className="hr-campaign-container">
        <HRNav />
        <div className="hr-campaign-grid">
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-xl-10">
              <div className="hr-campaign-header p-2 d-flex flex-row">
                <div className="hr-crop-img">
                  <img
                    className="hr-recruit-img"
                    alt="recruit"
                    src={require("../images/Interview.png")}
                  />
                </div>

                <div className="hr-campaign-header-info">
                  <div className="hr-header-title text-truncate">{title}</div>
                </div>
                <div className="hr-campaign-header-options  d-flex flex-row  align-items-start justify-content-around">
                  <span className="hr-option-background">
                    <FontAwesomeIcon icon={faTrashAlt} color="#545461" />
                  </span>
                </div>
              </div>
              <div className="hr-campaign-tabs">
                <Tabs selected={0}>
                  <Panel
                    title="Infomation"
                    iconAwe={<FontAwesomeIcon icon={faInfo} color="#337ab7" />}
                  >
                    <HRInfo />
                  </Panel>
                  <Panel
                    title="Interview"
                    iconAwe={
                      <FontAwesomeIcon
                        icon={faTasks}
                        color="#337ab7"
                        size="lg"
                      />
                    }
                  >
                    <HRInterview />
                  </Panel>
                  <Panel
                    title="Completed Interview"
                    iconAwe={
                      <FontAwesomeIcon
                        icon={faCalendarCheck}
                        color="#4caf50"
                        size="lg"
                      />
                    }
                  >
                    <CompletedInterview />
                  </Panel>
                  <Panel
                    title="Candidate"
                    iconAwe={
                      <FontAwesomeIcon
                        icon={faUsers}
                        color="#337ab7"
                        size="lg"
                      />
                    }
                  >
                    <HRCandidate />
                  </Panel>
                </Tabs>
              </div>
            </div>
            <div className="col-sm-1"></div>
          </div>
        </div>
      </div>
    );
  }
}
//send action to redux
const mapDispatchToProps = (dispatch, props) => {
  return {
    getAvailableCandidatesAPI: (campaign_id) => {
      dispatch(actions.getAvailableCandidatesAPI(campaign_id));
    },
    getInterviews: (campaign_id) => {
      dispatch(actions.getInterviews(campaign_id));
    },
    getCompletedInterviewsAPI: (campaign_id) => {
      dispatch(actions.getCompletedInterviewsAPI(campaign_id));
    },
    getCollectedCandidatesAPI: () => {
      dispatch(actions.getCollectedCandidatesAPI());
    },
  };
};
//get data from redux
const mapStateToProps = (state) => {
  return {
    campaign: state.campaign,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HRCampaign));
