import React from "react";
import "./Interview.scss";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { fakeEmails } from "./FakeEmails";
import InterviewThumbnail from "./Thumbnail/Thumbnail";
import { Menu, Dropdown, Button, Icon } from "antd";
import { withRouter } from "react-router-dom";
import InterviewPopup from "./Popup";
import { connect } from "react-redux";
import * as actions from "../../../../redux/actions/index";
class HRInterview extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      campaign_id: 1,
      candidateEmails: [
        {
          email: "",
        },
      ],
      interview: {
        id: 0,
        name: "",
        date: "",
        time: "",
        campaign_id: "",
      },

      chosenEmails: [],
      isFocusCreater: false,
      isFocusEmails: false,
      isShowPopup: false, // State for Popup
    };
  }
  componentDidMount() {
    this._isMounted = true;
    let candidateEmails = this.state;
    candidateEmails = fakeEmails;
    let { campaign_id } = this.state;
    if (this._isMounted) {
      this.setState({
        candidateEmails: candidateEmails,
      });
    }
    this.props.getCandidate(campaign_id);
  }

  UNSAFE_componentWillMount() { }
  componentWillUnmount() {
    this._isMounted = false;
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps.group_candidates);
    this.setState({
      candidateEmails: nextProps.group_candidates,
    });
  }
  chooseEmailHandler = async (email) => {
    console.log("clicked", email);
    for (let i = 0; i < this.state.candidateEmails.length; i++) {
      if (email.email === this.state.candidateEmails[i].email) {
        email.isChosen = 1;
        let tempArr = [...this.state.candidateEmails];
        tempArr.splice(i, 1);

        var tempArr2 = [...this.state.chosenEmails];
        tempArr2.push(email);
        this.setState({
          candidateEmails: tempArr,
          chosenEmails: tempArr2,
        });
      }
    }
    console.log("candidates", this.state.candidateEmails);
    console.log("chosen", this.state.chosenEmails);
  };

  removeEmailHandler = async (email) => {
    for (let i = 0; i < this.state.chosenEmails.length; i++) {
      if (email.email === this.state.chosenEmails[i].email) {
        email.isChosen = 0;
        let tempArr = [...this.state.chosenEmails];
        tempArr.splice(i, 1);

        var tempArr2 = [...this.state.candidateEmails];
        tempArr2.push(email);
        this.setState({
          candidateEmails: tempArr2,
          chosenEmails: tempArr,
        });
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

  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">1st menu item</Menu.Item>
        <Menu.Item key="2">2nd menu item</Menu.Item>
        <Menu.Item key="3">3rd item</Menu.Item>
      </Menu>
    );
    // console.log("mounted", this.state.candidateEmails)
    // console.log("chosen", this.state.chosenEmails)
    let { isFocusCreater, isFocusEmails } = this.state;
    return (
      <div className="hr-interview-container container-fluid ">
        <div className="row">
          <div className="col-md-9">
            <div className="creater-container">
              <div className="create-new-interview-period-container d-flex flex-column">
                <div className="interview-section-title">
                  Create New Interview Period
                </div>
                <div className="create-new-interview-period d-flex flex-row justify-content-between p-3 flex-wrap">
                  <div className="cni-name mb-2 mr-2">
                    <p>Set interview name</p>
                    <input
                      className="interview-period-attribute"
                      placeholder="Enter interview name..."
                    />
                  </div>
                  <div className="cni-time mb-2 mr-2">
                    <p>Pick interview time</p>
                    <div className="cin-time-attribute d-flex flex-row">
                      <div className="cni-time-week-day">
                        <Dropdown
                          overlay={menu}
                          trigger={["click"]}
                          className="mr-1"
                        >
                          <Button style={{ top: "0" }}>
                            Week day <Icon type="down" />
                          </Button>
                        </Dropdown>
                      </div>
                      <div className="cni-time-month">
                        <Dropdown
                          overlay={menu}
                          trigger={["click"]}
                          className="mr-1"
                        >
                          <Button style={{ top: "0" }}>
                            Month <Icon type="down" />
                          </Button>
                        </Dropdown>
                      </div>
                      <div className="cni-time-day">
                        <Dropdown
                          overlay={menu}
                          trigger={["click"]}
                          className="mr-1"
                        >
                          <Button style={{ top: "0" }}>
                            Day <Icon type="down" />
                          </Button>
                        </Dropdown>
                      </div>
                      <div className="cni-time-hour">
                        <Dropdown overlay={menu} trigger={["click"]}>
                          <Button style={{ top: "0" }}>
                            Hour <Icon type="down" />
                          </Button>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                  <div className="cni-target mb-2 mr-2">
                    <p>Set interview target</p>
                    <div className="cni-targer-attribute">
                      <input
                        className="interview-period-attribute-count mr-1"
                        placeholder="from"
                      />
                      <input
                        className="interview-period-attribute-count"
                        placeholder="to"
                      />
                    </div>
                  </div>
                  <div className="cni-btn align-self-center mt-3 mb-5">
                    <button
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
                      Create interview
                    </button>
                  </div>
                </div>
              </div>
              <div className="interview-section-title">
                Initialized Interview Period
              </div>
              <div className=" initialized-interviews d-flex flex-row flex-wrap">
                <InterviewThumbnail />
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
                    {this.state.candidateEmails.map((candidate, index) => {
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
                  <div className="interview-section-title">
                    Chosen Emails for <button>save</button>
                  </div>

                  <div className="chosen-application">
                    {this.state.chosenEmails.length ? (
                      this.state.chosenEmails.map((email) => {
                        return (
                          <div
                            key={email.email}
                            className="chosen-email d-flex flex-row flex-wrap justify-content-between"
                          >
                            <p>
                              <FontAwesomeIcon icon={faEnvelope} />
                              {email.email}
                            </p>
                            <button
                              className="remove-email"
                              onClick={(e) => this.removeEmailHandler(email)}
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

            <div
              className="creater-focus-overlay"
              style={
                isFocusCreater || isFocusEmails
                  ? { display: "block", overflow: "auto" }
                  : { display: "none" }
              }
            ></div>
          </div>
          <div className="initialized-interviews col-sm-3">
            <div className="interview-section-title">
              Created Interview Period
            </div>
            <InterviewThumbnail />
            <InterviewThumbnail />
          </div>
        </div>
        {this.state.isShowPopup ? (
          <InterviewPopup closePopup={this.toggleInterviewPopup} />
        ) : null}
      </div>
    );
  }
}
//send action to redux
const mapDispatchToProps = (dispatch, props) => {
  return {
    getCandidate: (campaign_id) => {
      dispatch(actions.getCandidate(campaign_id));
    },
    createInterview: (data) => {
      dispatch(actions.createInterview(data));
    },
  };
};
//get data from redux
const mapStateToProps = (state) => {
  return {
    group_candidates: state.group_candidates,
    interview: state.interview,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HRInterview));
