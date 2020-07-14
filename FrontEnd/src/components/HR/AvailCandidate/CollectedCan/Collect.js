import React from "react";
import "./Collect.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faClipboard,
  faStickyNote,
  faPlusSquare,
} from "@fortawesome/free-regular-svg-icons";
import { faPhone, faCheck } from "@fortawesome/free-solid-svg-icons";
import PopUp from "../../../../utils/PopUp/PopUp";
import AutoNoteAndCV from "./NoteAndCV/NoteAndCV";
import CollectedInvtite from "./Invite/Invite";

import { connect } from "react-redux";
import * as actions from "../../../../redux/actions/index";
import { EllipsisOutlined } from "@ant-design/icons";
class CollectedCan extends React.Component {
  state = {
    isShowNoteAndCv: false,
    isOpenPopup: false,
    active: 0,
    isShowInvite: false,
    isInvite: false,
    data: {
      id: 0,
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
  onClickInviteCandidate = () => {
    let { campaign_id } = this.props;
    let { data, isInvite } = this.state;
    if (isInvite)
      this.props.deleteInviteCandidate({ campaign_id, user_id: data.id });
    else this.props.createInvitation({ campaign_id, user_id: data.id });
    // console.log({ campaign_id, user_id: id });
    this.setState({ isInvite: !isInvite });
  };
  togglePopUpInvite = () => {
    this.setState({
      isShowInvite: !this.state.isShowInvite,
      isOpenPopup: !this.state.isOpenPopup,
    });
  };
  render() {
    let { isShowNoteAndCv, isShowInvite, active, data, isInvite } = this.state;
    let { from } = this.props;
    let subjectsELM = data.subjects.map((subject) => {
      return (
        <div key={subject.id} className="can-skill mr-3 text-truncate">
          <FontAwesomeIcon
            icon={faCheck}
            color="#33cc33"
            className="mr-1 mt-1"
          />
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
          <div className="c-can-contact ">
            <div className="contact-email ">
              <span>
                <FontAwesomeIcon icon={faEnvelope} className="mr-1" />
                {data.email}
              </span>
            </div>
            <div className="contact-phone ">
              <span>
                <FontAwesomeIcon icon={faPhone} className="mr-1" />
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
              <FontAwesomeIcon icon={faClipboard} className="mr-1" />
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
              <FontAwesomeIcon icon={faStickyNote} className="mr-1" />
              Note
            </button>
          </div>
        </div>
        <div className="c-can-invite">
          <button
            style={isInvite ? { opacity: "0.7" } : null}
            onClick={
              from !== undefined
                ? this.onClickInviteCandidate
                : this.togglePopUpInvite
            }
          >
            <FontAwesomeIcon icon={faPlusSquare} className="mr-2" />
            {isInvite ? "Cancel Invitation" : `Invite`}
          </button>
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
        {isShowInvite ? (
          <PopUp
            openPop={(open) => {
              setTimeout(() => {
                this.setState({
                  isShowInvite: !open,
                  isOpenPopup: false,
                });
              }, 150);
            }}
          >
            <CollectedInvtite
              togglePopUp={() => {
                this.setState({
                  isShowInvite: !this.state.isShowInvite,
                  isOpenPopup: !this.state.isOpenPopup,
                });
              }}
              user_id={data.id}
            />
          </PopUp>
        ) : null}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    createInvitation: (data) => {
      dispatch(actions.createInvitation(data));
    },
    deleteInviteCandidate: (data) => {
      dispatch(actions.deleteInviteCandidate(data));
    },
  };
};
//get data from redux
const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(CollectedCan);
