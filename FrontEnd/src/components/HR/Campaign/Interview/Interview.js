import React from "react";
import "./Interview.scss";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
// import { fakeEmails } from "./FakeEmails";
import InterviewThumbnail from "./Thumbnail/Thumbnail";
import InterviewControl from './Control/Control';
import { withRouter } from "react-router-dom";
import InterviewPopup from "./Popup";
import CanOverview from '../../CandidateOverview/CanOverview';

import { connect } from "react-redux";
import * as actions from "../../../../redux/actions/index";

class HRInterview extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      campaign_id: this.props.match.params.campaign_id,
      availableCandidates: [
        {
          cv: "",
          description: "",
          user: {
            id: 0,
            name: "",
            email: "",
            password: "",
          },
        },
      ],
      interviewCandidates: [
        {
          cv: "",
          description: "",
          user: {
            id: 0,
            name: "",
            email: "",
            password: "",
          },
        },
      ],
      interviews: [
        {
          id: 0,
          name: "",
          date: "2020-01-01",
          time: "12:00:00",
          campaign_id: "",
        },
      ],
      isFocusCreater: false,
      isFocusEmails: false,
      isShowPopup: false, // State for Popup
      interviewForcus: {
        interview_id: -1,
        name: "",
      },
    };
  }
  componentDidMount() {
    this._isMounted = true;
    // let { campaign_id } = this.state;
    this.props.showInterviews();
  }

  UNSAFE_componentWillMount() { }
  componentWillUnmount() {
    this._isMounted = false;
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
    this.setState({
      availableCandidates: nextProps.availableCandidates,
      interviewCandidates: nextProps.interviewCandidates,
      interviews: nextProps.interview,
    });
  }
  chooseEmailHandler = async (candidate) => {
    let { interview_id } = this.state.interviewForcus;
    for (let i = 0; i < this.state.availableCandidates.length; i++) {
      if (candidate.user.id === this.state.availableCandidates[i].user.id) {
        candidate.interview_id = interview_id;
        let tempArr = [...this.state.availableCandidates];
        tempArr.splice(i, 1);
        var tempArr2 = [...this.state.interviewCandidates];
        tempArr2.push(candidate);
        this.setState({
          availableCandidates: tempArr,
          interviewCandidates: tempArr2,
        });
        this.props.updateCandidatesToInterview(candidate);
      }
    }
  };

  removeEmailHandler = async (candidate) => {
    for (let i = 0; i < this.state.interviewCandidates.length; i++) {
      if (candidate.user.id === this.state.interviewCandidates[i].user.id) {
        candidate.interview_id = null;
        let tempArr = [...this.state.interviewCandidates];
        tempArr.splice(i, 1);
        var tempArr2 = [...this.state.availableCandidates];
        tempArr2.push(candidate);
        this.setState({
          availableCandidates: tempArr2,
          interviewCandidates: tempArr,
        });
        this.props.updateCandidatesToAvailable(candidate);
      }
    }
  };

  handleMenuClick = (e) => {
    //function of ant design
    console.log("click", e);
  };

  handleClickCreateNew = (isFocusCreater, isFocusEmails) => {
    this.setState({
      isFocusEmails: false,
    });
    //this.outsideClick.current.click();
  };

  toggleInterviewPopup = () => {
    let { isShowPopup } = this.state;

    if (isShowPopup === true) {
      this.setState({
        isShowPopup: !isShowPopup,
      });
    }
  };
  onClickChooseInterview = (interview_id, name) => {
    let { campaign_id } = this.state;
    this.setState({
      interviewForcus: {
        interview_id,
        name,
      },
    });
    this.props.getInterviewCandidates(campaign_id, interview_id);
  };

  render() {
    let {
      isFocusCreater,
      isFocusEmails,
      interviews,
      interviewForcus,
      campaign_id,
    } = this.state;
    let interviewElm = interviews.map((interview, index) => {
      return (
        <InterviewThumbnail
          key={interview.id}
          index={index}
          data={interview}
          onClickChooseInterview={this.onClickChooseInterview}
          interviewForcus={interviewForcus}
        />
      );
    });
    return (
      <div className="hr-interview-container container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="creater-container d-none">
              <div className="interview-section-title">
                Create New Interview Period
              </div>
              <div className=" initialized-interviews d-flex flex-row flex-wrap">
                {interviewElm}
                <div className="initialized-interview-container d-flex flex-row mr-2 mb-2 justify-content-center">
                  <button
                    className="adjust-icon-btn align-self-center"
                    onClick={() => {
                      this.setState({
                        isShowPopup: !this.state.isShowPopup,
                      });
                      this.toggleInterviewPopup();
                    }}
                    style={
                      this.state.isFocusCreater || isFocusEmails
                        ? {
                          zIndex: "15",
                          position: "relative",
                          display: "block",
                        }
                        : null
                    }
                  >
                    <FontAwesomeIcon
                      className="adjust-icon"
                      icon={faPlus}
                      size="3x"
                      color="#339AF0"
                    />
                  </button>
                </div>
              </div>
              <div
                className="screen-dedicate d-flex flex-row flex-wrap justify-content-between"
                style={
                  isFocusEmails
                    ? { position: "relative", zIndex: "15", overflow: "hidden" }
                    : null
                }
              >
                <div className="all-application-container">
                  <div className="interview-section-title">
                    Available Emails
                  </div>
                  <div className="all-application">
                    {this.state.availableCandidates.map((candidate, index) => {
                      if (index % 2 === 0) {
                        var eStyle = "#d8d8d8";
                      } else {
                        eStyle = "#f2f2f2";
                      }
                      return (
                        <div
                          key={candidate.user.id}
                          className="pre-email d-flex flex-row justify-content-between"
                          style={{ backgroundColor: eStyle }}
                        >
                          <p>
                            <FontAwesomeIcon icon={faEnvelope} />{" "}
                            {candidate.user.email}
                          </p>
                          <button
                            className="choose-email"
                            disabled={
                              interviewForcus.interview_id === -1 ? true : false
                            }
                            style={
                              interviewForcus.interview_id === -1
                                ? { opacity: "0.5" }
                                : null
                            }
                            onClick={(e) => this.chooseEmailHandler(candidate)}
                          >
                            <FontAwesomeIcon
                              icon={faPlus}
                              size="lg"
                              color="white"
                            />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="chosen-application-container">
                  <div className="interview-section-title d-flex flex-row justify-content-between">
                    <p> Chosen Emails for {interviewForcus.name}</p>
                  </div>

                  <div
                    className="chosen-application"
                    style={
                      interviewForcus.interview_id === -1
                        ? { opacity: "0.7" }
                        : { opacity: "1" }
                    }
                  >
                    {this.state.interviewCandidates.length ? (
                      this.state.interviewCandidates.map((candidate) => {
                        return (
                          <div
                            key={candidate.user.id}
                            className="chosen-email d-flex flex-row flex-wrap justify-content-between"
                          >
                            <p>
                              <FontAwesomeIcon icon={faEnvelope} />
                              {candidate.user.email}
                            </p>
                            <button
                              className="remove-email"
                              onClick={(e) =>
                                this.removeEmailHandler(candidate)
                              }
                            >
                              <FontAwesomeIcon
                                icon={faMinus}
                                size="lg"
                                color="white"
                              />
                            </button>
                          </div>
                        );
                      })
                    ) : (
                        <div>NO email was chosen</div>
                      )}
                  </div>
                </div>
              </div>
            </div>

            <div className="interview-header-inner d-flex flex-row justify-content-between">
              <div className="interview-header py-2">
                Interview editor
              </div>
              <button className="interview-create-btn py-2"
                onClick={() => {
                  this.setState({
                    isShowPopup: !this.state.isShowPopup,
                  });
                  this.toggleInterviewPopup();
                }}
              >
                <span><FontAwesomeIcon icon={faPlus} style={{ marginRight: '5px' }} /></span>
                New interview
              </button>
            </div>
            <hr />

            {/* <div className="interview-available-candidates">
              <div className="interview-section-title">
                Available candidates
              </div>
              <div className="interview-candidate-list">
                <CanOverview />
              </div>
            </div> */}

            <div className="interview-thumbnails-list-container">
              <div className="interview-section-title">
                Created interviews list
              </div>
              <div className="interview-thumbnails-list">
                <InterviewControl />
                <InterviewControl />
              </div>
            </div>
            <div
              className="creater-focus-overlay"
              style={
                isFocusCreater || isFocusEmails
                  ? { display: "block", overflow: "auto" }
                  : { display: "none" }
              }
            ></div>
          </div>
          {/* <div className="initialized-interviews col-sm-3">
            <div className="interview-section-title">
              Created Interview Period
            </div>
            {interviewElm}
          </div> */}
        </div>
        {this.state.isShowPopup ? (
          <InterviewPopup
            closePopup={this.toggleInterviewPopup}
            campaign_id={campaign_id}
          />
        ) : null}
      </div>
    );
  }
}
//send action to redux
const mapDispatchToProps = (dispatch, props) => {
  return {
    showInterviews: () => {
      dispatch(actions.showInterviews());
    },
    getInterviewCandidates: (campaign_id, interview_id) => {
      dispatch(actions.getInterviewCandidates(campaign_id, interview_id));
    },

    updateCandidatesToInterview: (data) => {
      dispatch(actions.updateCandidatesToInterview(data));
    },
    updateCandidatesToAvailable: (data) => {
      dispatch(actions.updateCandidatesToAvailable(data));
    },
  };
};
//get data from redux
const mapStateToProps = (state) => {
  return {
    availableCandidates: state.availableCandidates,
    interviewCandidates: state.interviewCandidates,
    interview: state.interview,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HRInterview));
