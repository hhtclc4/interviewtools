import React from "react";
import "./Collect.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faClipboard,
  faStickyNote,
} from "@fortawesome/free-regular-svg-icons";
import { faPhone, faCheck } from "@fortawesome/free-solid-svg-icons";
import PopUp from "../../../../utils/PopUp/PopUp";
import AutoNoteAndCV from "./NoteAndCV/NoteAndCV";
class CollectedCan extends React.Component {
  state = {
    isShowNoteAndCv: false,
    isOpenPopup: false,
    active: 0,
    data: {
      name: "",
      email: "",
      phone: "",
      avatar: "",
      education: {
        degree: 0,
      },
      subjects: [{ id: 0, title: "", skills: {} }],

      employments: [
        {
          position: 0,
        },
      ],
      type: 0,
      description: "",
      job_title: "",
    },
  };
  componentDidMount() {
    this.setState({
      data: this.props.data,
    });
  }
  togglePopUp = () => {
    this.setState({
      isShowNoteAndCv: !this.state.isShowNoteAndCv,
      isOpenPopup: !this.state.isOpenPopup,
    });
  };
  render() {
    let { isShowNoteAndCv, active, data } = this.state;
    let subjectsELM = data.subjects.map((subject) => {
      return (
        <div key={subject.id} className="can-skill mr-3 text-truncate">
          <FontAwesomeIcon icon={faCheck} color="#33cc33" className="mr-1" />
          {subject.title}
        </div>
      );
    });
    return (
      <div key={data.id} className="collected-candidate-container">
        <div className="c-can-ava">
          <img
            alt="ava"
            src={
              data.avatar !== null
                ? data.avatar
                : require("../../images/default-ava.png")
            }
          />
        </div>
        <div className="c-can-info">
          <div className="c-can-name">{data.name}</div>
          <div className="c-can-position">{data.job_title}</div>
          <div className="c-can-contact">
            <div className="contact-email">
              <span>
                <FontAwesomeIcon icon={faEnvelope} />
                {data.email}
              </span>
            </div>
            <div className="contact-phone">
              <span>
                <FontAwesomeIcon icon={faPhone} />
                {data.phone}
              </span>
            </div>
          </div>
        </div>
        <div className="c-can-skills">{subjectsELM}</div>
        <div className="c-can-actions">
          <div className="c-can-auto-cv">
            <button
              onClick={() => {
                this.setState({
                  active: 0,
                });
                this.togglePopUp();
              }}
            >
              <FontAwesomeIcon icon={faClipboard} />
              CV
            </button>
          </div>
          <div className="c-can-note">
            <button
              onClick={() => {
                this.setState({
                  active: 1,
                });
                this.togglePopUp();
              }}
            >
              <FontAwesomeIcon icon={faStickyNote} />
              Note
            </button>
            <button>
              <FontAwesomeIcon icon={faStickyNote} />
              Invite to campaign
            </button>
          </div>
        </div>
        {isShowNoteAndCv ? (
          <PopUp
            openPop={(open) => {
              setTimeout(() => {
                this.setState({
                  isShowNoteAndCv: !open,
                  isOpenPopup: false,
                });
              }, 150);
            }}
          >
            <AutoNoteAndCV
              active={active}
              data={data}
              listSubjects={this.props.listSubjects}
            />
          </PopUp>
        ) : null}
      </div>
    );
  }
}

export default CollectedCan;
