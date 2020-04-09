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
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
class HRCampaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
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
        location: "",
        subjects: [
          {
            id: 0,
            title: "",
          },
        ],
      },
      campaign_id: this.props.match.params.campaign_id,
    };
  }
  componentDidMount() {
    let { campaign_id } = this.state;
    this.props.showCampaign(campaign_id);
    this.props.getInterviews(campaign_id);
    this.props.getAvailableCandidates(campaign_id);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.campaign,
    });
  }
  render() {
    let { data } = this.state;
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
                  <div className="hr-header-title text-truncate">
                    {data.title}
                  </div>
                </div>
                <div className="hr-campaign-header-options  d-flex flex-row  align-items-start justify-content-around">
                  <span className="hr-option-background">
                    <FontAwesomeIcon icon={faTrashAlt} color="#545461" />
                  </span>
                </div>
              </div>
              <div className="hr-campaign-tabs">
                <Tabs selected={0}>
                  <Panel title="Infomation">
                    <HRInfo data={data} />
                  </Panel>
                  <Panel title="Interview">
                    <HRInterview />
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
    getAvailableCandidates: (campaign_id) => {
      dispatch(actions.getAvailableCandidates(campaign_id));
    },
    showCampaign: (campaign_id) => {
      dispatch(actions.showCampaign(campaign_id));
    },

    getInterviews: (campaign_id) => {
      dispatch(actions.getInterviews(campaign_id));
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
