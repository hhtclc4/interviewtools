import React from "react";
import "./CanOverview.scss";
import NoteandCV from "./NoteandCV";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStickyNote, faClipboard } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

class CanOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenNoteandCV: false,
      active: 0,
      data: {
        candidate_id: 0,
        cv: "CV",
        description: "DESCRIPTION",
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
  render() {
    let { color, type, source, from, partion } = this.props;
    let { data } = this.state;
    // console.log("data", data);
    return (
      <div
        className="candidate-overview-container"
        style={partion === "true" ? { marginBottom: "8px" } : {}}
      >
        <div
          className="candidate-partions-container d-flex flex-row p-2 justify-content-between"
          style={{ backgroundColor: color }}
        >
          <div
            className="time-partion"
            style={
              type === "available" && from !== "control"
                ? { display: "none" }
                : {}
            }
          >
            {data.interview_time}
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
              {partion === "true" ? (
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
              {partion === "true" ? (
                <>DESCRIPTION</>
              ) : (
                  <FontAwesomeIcon icon={faStickyNote} />
                )}
            </button>
          </div>
          <div
            className="subject-partion"
            style={source === "apply" ? { display: "none" } : {}}
          >
            {(partion === "true" && from !== "control") ||
              source === "collect" ? (
                <>Major</>
              ) : (
                <div style={{ minWidth: "0%" }}></div>
              )}
          </div>
          <div
            className="level-partion"
            style={source === "apply" ? { display: "none" } : {}}
          >
            {(partion === "true" && from !== "control") ||
              source === "collect" ? (
                <>Level</>
              ) : (
                <div style={{ minWidth: "0%" }}></div>
              )}
          </div>

          <div className="action-btn-partion"
            style={from === "control" ? { display: 'none', width: 'auto' } : null}
          >

            {((source === "apply" || source === "collect") && partion !== "true") ?
              <button className="can-action-btn"><FontAwesomeIcon icon={faMinus} /></button> :
              <button className="can-action-btn"><FontAwesomeIcon icon={faPlus} /></button>}

          </div>

          {this.state.isOpenNoteandCV ? (
            <NoteandCV
              closePopup={this.toggleNoteandCV}
              openTab={this.state.active}
            />
          ) : null}
        </div>
        <hr
          style={
            partion === "true" ? { display: "block" } : { display: "none" }
          }
        />
      </div>
    );
  }
}

export default CanOverview;
