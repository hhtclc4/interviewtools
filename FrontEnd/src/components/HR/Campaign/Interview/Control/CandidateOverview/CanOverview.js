import React from "react";
import "./CanOverview.scss";
import NoteandCV from "./NoteandCV";
import InterviewsPopup from '../../../Candidate/InterviewsPopup'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStickyNote,
  faClipboard,
  faClock,
} from "@fortawesome/free-regular-svg-icons";
import { faPlus, faMinus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import * as actions from "../../../../../../redux/actions/index";
import { Menu, Dropdown, Button, Icon } from "antd";

class CanOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenNoteandCV: false,
      isOpenInterviews: false,
      active: 0,
      data: {
        candidate_id: 0,
        cv: "CV",
        description: "NOTE",
        interview_time: "TIME",
        user: {
          id: 0,
          name: "NAME",
          email: "EMAIL",
          phone: "PHONE",
        },
      },
    };
  }
  componentDidMount() {
    let { data } = this.props;
    if (data !== undefined)
      this.setState({
        data,
      });
  }
  toggleNoteandCV = () => {
    let { isOpenNoteandCV } = this.state;

    if (isOpenNoteandCV === true) {
      this.setState({
        isOpenNoteandCV: !isOpenNoteandCV,
      });
    }
  };

  toggleInterviewsPopup = () => {
    let { isOpenInterviews } = this.state;

    if (isOpenInterviews === true) {
      this.setState({
        isOpenInterviews: !isOpenInterviews,
      });
    }
  };
  chooseEmailHandler = async (candidate) => {
    let { interview_id } = this.props;

    candidate.interview_id = interview_id;
    console.log(candidate);
    this.props.updateCandidatesToInterview(candidate);
  };
  removeEmailHandler = async (candidate) => {
    let { interview_id } = this.props;

    candidate.interview_id = null;

    this.props.updateCandidatesToAvailable(candidate, interview_id);
  };
  handleMenuHourClick = (event) => {
    let { data } = this.state;
    this.setState({
      data: {
        ...data,
        interview_time: event.key,
      },
    });
    this.props.updateCandidates({ ...data, interview_time: event.key });
  };

  getHour = () => {
    let listHour = [];
    let { time_from, time_to } = this.props;
    let hour_from = parseInt(`${time_from}`.split(":")[0]);
    let hour_to = parseInt(`${time_to}`.split(":")[0]);
    let minute_from = parseInt(`${time_from}`.split(":")[1]);
    let minute_to = parseInt(`${time_to}`.split(":")[1]);
    //số dư
    let surplus = 0;
    if (minute_to - minute_from < 0) surplus = -1;
    else if (minute_to - minute_from > 0) surplus = 1;
    let hour = hour_from;
    let minute = minute_from;
    for (let i = 0; i <= (hour_to - hour_from) * 2 + surplus; i++) {
      listHour.push(`${hour}:${minute === 0 ? "00" : minute}:00`);
      if (minute === 30) {
        hour++;
        minute = 0;
      } else minute = 30;
    }
    return listHour;
  };
  render() {
    let { color, type, source, from, display } = this.props;
    let { data } = this.state;
    // console.log("data", data);

    let majorStyle;
    if (from === "control" || source === "apply") {
      majorStyle = {
        display: "none",
      };
    } else {
      if (source === "chosen") {
        majorStyle = {
          display: "none",
        };
      } else {
        majorStyle = {};
      }
    }

    let actionBtnElm;
    if (type === "partion") {
      actionBtnElm = <>ACTION</>;
    } else {
      if (source === "apply" || source === "collect") {
        if (from === "hr") {
          actionBtnElm = (
            <button
              className="can-action-btn"
              onClick={() => {
                this.setState({
                  isOpenInterviews: !this.state.isOpenInterviews,
                  active: 0,
                });
                this.toggleInterviewsPopup();
              }}
            >
              <FontAwesomeIcon icon={faUserPlus} />
            </button>
          );
        }
        else {
          actionBtnElm = (
            <button
              className="can-action-btn"
              onClick={() => this.chooseEmailHandler(data)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          );
        }

      } else {
        actionBtnElm = (
          <button
            className="can-action-btn"
            onClick={() => this.removeEmailHandler(data)}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
        );
      }
    }
    let listHour = this.getHour();

    const hour = (
      <Menu onClick={this.handleMenuHourClick}>
        {listHour.map((hour) => {
          return <Menu.Item key={hour}>{hour}</Menu.Item>;
        })}
      </Menu>
    );

    return (
      <div
        className={display ? "candidate-overview-container" : "d-none"}
        style={type === "partion" ? { marginBottom: "8px" } : {}}
      >
        <div
          className="candidate-partions-container d-flex flex-row p-2 justify-content-between"
          style={{ backgroundColor: color }}
        >
          <div
            className="time-partion"
            style={(from === "canPop" || from === "hr") ? { display: "none" } : null}
          >
            {from === "control" && type === "partion" ? (
              <span><FontAwesomeIcon className="mr-1" icon={faClock} />Time</span>
            ) : (
                // <> {data.interview_time} </>
                <>
                  <div className="cni-time-hour">
                    <Dropdown overlay={hour} trigger={["click"]}>
                      <Button style={{ top: "0" }}>
                        {data.interview_time} <Icon type="down" />
                      </Button>
                    </Dropdown>
                  </div>
                </>
              )}
          </div>
          <div className="name-partion">{data.user.name}</div>
          <div className="email-partion">{data.user.email}</div>
          <div className="phone-partion">{data.user.phone}</div>
          <div className="cv-partion">
            <button
              onClick={() => {
                this.setState({
                  isOpenNoteandCV: !this.state.isOpenNoteandCV,
                  active: 0,
                });
                this.toggleNoteandCV();
              }}
              className="cv-btn"
            >
              {type === "partion" ? (
                <>CV</>
              ) : (
                  <FontAwesomeIcon icon={faClipboard} />
                )}
            </button>
          </div>
          <div className="note-partion">
            <button
              onClick={() => {
                this.setState({
                  isOpenNoteandCV: !this.state.isOpenNoteandCV,
                  active: 1,
                });
                this.toggleNoteandCV();
              }}
              className="note-btn"
            >
              {type === "partion" ? (
                <>NOTE</>
              ) : (
                  <FontAwesomeIcon icon={faStickyNote} />
                )}
            </button>
          </div>
          <div className="subject-partion" style={majorStyle}>
            {type === "partion" ? <>Major</> : <>Java</>}
          </div>
          <div className="level-partion" style={majorStyle}>
            {type === "partion" ? <>LEVEL</> : <>Senior</>}
          </div>

          <div
            className="action-btn-partion"
            style={from === "control" ? { display: "none" } : {}}
          >
            {actionBtnElm}
          </div>

          {this.state.isOpenNoteandCV ? (
            <NoteandCV
              closePopup={this.toggleNoteandCV}
              openTab={this.state.active}
            />
          ) : null}

          {this.state.isOpenInterviews ? (
            <InterviewsPopup
              closePopup={this.toggleInterviewsPopup}
              openTab={this.state.active}
            />
          ) : null}
        </div>
        <hr
          style={
            type === "partion" ? { display: "block" } : { display: "none" }
          }
        />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    updateCandidatesToInterview: (candidate) => {
      dispatch(actions.updateCandidatesToInterview(candidate));
    },
    updateCandidatesToAvailable: (candidate, interview_id) => {
      dispatch(actions.updateCandidatesToAvailable(candidate, interview_id));
    },
    updateCandidates: (candidate) => {
      dispatch(actions.updateCandidates(candidate));
    },
  };
};
//get data from redux
const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(CanOverview);
