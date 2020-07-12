import React from "react";
import "./Invitation.scss";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/index";
import { withRouter } from "react-router-dom";
import HomeNav from "../Nav/Nav";
import InviteCampOverview from "./CampOverview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
class Invitation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          campaign_id: 0,
          user_id: 0,
          campaign: {
            title: "",
            salary: 0,
            work_description: "",
            location: "",
            user: {
              company: {
                id: 0,
                name: "",
                address: "",
              },
            },
            subjects: [
              {
                id: 0,
                title: "",
              },
            ],
          },
        },
      ],
      indexClick: 0,
    };
  }
  componentDidMount() {
    this.props.getInvitationAPI();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.invitation,
    });
  }
  onClickHandler = (index) => {
    this.setState({
      indexClick: index,
    });
  };
  onClickAcceptHandler = (isAccept, campaign_id) => {
    this.props.acceptOrDeclineInvitation({ isAccept, campaign_id });
  };
  render() {
    let { data, indexClick } = this.state;
    let { campaign } = data[indexClick];
    let campInvitationElm = data.map((invitation, index) => {
      return (
        <InviteCampOverview
          key={`${invitation.campaign_id}${invitation.user_id}`}
          index={index}
          data={invitation.campaign}
          onClickAcceptHandler={this.onClickAcceptHandler}
          onClickHandler={this.onClickHandler}
        />
      );
    });
    return (
      <div className="invitation-container">
        <HomeNav />
        <div className="invitation-body-container">
          <div className="all-invitation-list">
            <p className="i-title">Notification</p>
            <p className="i-count">{data.length} invitations</p>
            <hr />
            {campInvitationElm}
          </div>
          <div className="campaign-show-container">
            {/** */}
            <div className="job-content">
              <div className="comp-img-list d-flex flex-grow justify-content-between">
                <div className="comp-img-crop">
                  <img
                    className="comp-img"
                    alt="company-1"
                    src={require(`../HomeBody/DetailRecruit/images/${
                      campaign.user.company.id !== undefined
                        ? campaign.user.company.id
                        : "0"
                    }.1.jpg`)}
                  />
                  <img
                    className="comp-img"
                    alt="company-1"
                    src={require(`../HomeBody/DetailRecruit/images/${
                      campaign.user.company.id !== undefined
                        ? campaign.user.company.id
                        : "0"
                    }.2.jpg`)}
                  />
                  <img
                    className="comp-img"
                    alt="company-1"
                    src={require(`../HomeBody/DetailRecruit/images/${
                      campaign.user.company.id !== undefined
                        ? campaign.user.company.id
                        : "0"
                    }.3.jpg`)}
                  />
                </div>
              </div>
              <div className="comp-and-job-desc d-flex flex-row">
                <div className="comp-about">
                  <div className="comp-header d-flex flex-row justify-content-center py-2">
                    <img
                      style={{ width: "80%" }}
                      alt="comp-logo"
                      src={
                        campaign.image !== null
                          ? campaign.image
                          : require("../images/news.png")
                      }
                    />
                  </div>
                  <div className="comp-body"></div>
                </div>
                <div className="job-desc-about">
                  <div className="job-title">{campaign.title}</div>
                  <div className="job-subject-list d-flex flex-row justify-content-start">
                    {campaign.subjects.map((subject) => {
                      return (
                        <div key={subject.id} className="job-subject">
                          {subject.title}
                        </div>
                      );
                    })}
                  </div>
                  <div className="job-salary d-flex flex-row">
                    <span className="job-adjust-icon d-flex flex-row justify-content-center">
                      <FontAwesomeIcon
                        icon={faDollarSign}
                        size="sm"
                        color="#FD7E14"
                      />
                    </span>
                    <p>
                      {campaign.salary === 0
                        ? "Agreement"
                        : campaign.salary + " $"}
                    </p>
                  </div>
                  <div className="job-destination d-flex flex-row">
                    <span className="job-adjust-icon d-flex flex-row justify-content-center mr-2">
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        color="#FD7E14"
                        size="lg"
                      />
                    </span>
                    <p>{campaign.user.company.address}</p>
                  </div>

                  <hr />
                  <div className="job-info-and-require"></div>
                  {/* <div className="apply-btn"></div> */}
                </div>
              </div>
            </div>
            {/** */}
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    getInvitationAPI: () => {
      dispatch(actions.getInvitationAPI());
    },
    acceptOrDeclineInvitation: (data) => {
      dispatch(actions.acceptOrDeclineInvitation(data));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    invitation: state.invitation,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Invitation));
