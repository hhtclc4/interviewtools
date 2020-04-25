import React from "react";
import "./CanOverview.scss";
import NoteandCV from "./NoteandCV";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStickyNote,
  faClipboard,
  faClock,
} from "@fortawesome/free-regular-svg-icons";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import * as actions from "../../../../../../redux/actions/index";

class CanOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenNoteandCV: false,
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
  render() {
    let { color, type, source, from } = this.props;
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
        actionBtnElm = (
          <button
            className="can-action-btn"
            onClick={() => this.chooseEmailHandler(data)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        );
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
    return (
      <div
        className="candidate-overview-container"
        style={type === "partion" ? { marginBottom: "8px" } : {}}
      >
        <div
          className="candidate-partions-container d-flex flex-row p-2 justify-content-between"
          style={{ backgroundColor: color }}
        >
          <div
            className="time-partion"
            style={from === "canPop" ? { display: "none" } : null}
          >
            {from === "control" && type === "partion" ? (
              <FontAwesomeIcon icon={faClock} />
            ) : (
                <> {data.interview_time} </>
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
        </div>
        <hr
          style={type === "partion" ? { display: 'block' } : { display: 'none' }}
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
  };
};
//get data from redux
const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(CanOverview);
