import React from "react";
import "./HR.scss";
import HRNav from "./Nav/Nav";
import CampaignOverview from "./CampaignOverview/CampaignOverview";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/index";
import { withRouter } from "react-router-dom";
import HomeNav from '../Home/Nav/Nav'


class HRstaff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
          location: "",
          subjects: [
            {
              id: 0,
              title: "",
            },
          ],
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
        <CampaignOverview key={campaign.id} index={index} data={campaign} />
      );
    });
    return (
      <div className="hr-page-container">
        <HRNav />
        <div className="hr-page-grid">
          <div
            className="row"
            style={{ minHeight: "100%", height: "fit-content" }}
          >
            <div className="col-sm-1"></div>
            <div className="col-sm-10 hr-manage-container">
              <div className="hr-manage-header d-flex flex-row justify-content-between">
                <p className="hr-campaign-count align-self-center">
                  All campaigns ({data.length})
                </p>
                <button className="hr-create-campaign-btn align-self-center"
                  onClick={() => {
                    this.props.history.push("/recruit_signup");
                  }}
                >
                  Create new campaign
                </button>
              </div>

              <div className="hr-manage-body d-flex flex-row">
                <div className="hr-created-list  d-flex flex-column mt-4">
                  {tabElm}
                </div>
                <div className="hr-manage-stat-container mt-4">
                  <div className="hr-manage-stat"></div>
                </div>
              </div>
            </div>
            <div className="col-sm-1"></div>
          </div>
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
)(withRouter(HRstaff));
