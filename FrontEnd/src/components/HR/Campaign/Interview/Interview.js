import React from "react";
import "./Interview.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import { fakeEmails } from "./FakeEmails";

import InterviewControl from "./Control/Control";
import { withRouter } from "react-router-dom";
import InterviewPopup from "./CreateInterviewPopup";

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

      interviews: [
        {
          id: 0,
          name: "",
          date: "2020-01-01",
          time: "12:00:00",
          campaign_id: "",
          group_candidates: [
            {
              candidate_id: 0,
              cv: "",
              description: "",
              interview_time: "12:00:00",
              user: {
                id: 0,
                name: "",
                email: "",
                phone: "",
              },
            },
          ],
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
    this.props.showInterviews();
    this.props.getAvailableCandidates();
  }

  UNSAFE_componentWillMount() { }
  componentWillUnmount() {
    this._isMounted = false;
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
    this.setState({
      interviews: nextProps.interview,
    });
  }

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
    let {
      isFocusCreater,
      isFocusEmails,
      interviews,
      campaign_id,
    } = this.state;
    console.log("data", interviews);

    let interviewElm = interviews.map((interview, index) => {
      return (
        <InterviewControl key={interview.id} index={index} data={interview} />
      );
    });
    return (
      <div className="hr-interview-container container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="interview-header-inner d-flex flex-row justify-content-between">
              <div className="interview-header py-2">Interview editor</div>
              <button
                className="interview-create-btn py-2"
                onClick={() => {
                  this.setState({
                    isShowPopup: !this.state.isShowPopup,
                  });
                  this.toggleInterviewPopup();
                }}
              >
                <span>
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{ marginRight: "5px" }}
                  />
                </span>
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
              <div className="interview-thumbnails-list">{interviewElm}</div>
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
    getAvailableCandidates: () => {
      dispatch(actions.getAvailableCandidates());
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
    interview: state.interview,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HRInterview));
