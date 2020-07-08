import React from "react";
import "./CVPreview.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { Editor } from "react-draft-wysiwyg";
class CVPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positions: [
        { index: 0, title: "Tester" },
        { index: 1, title: "Dev" },
        { index: 2, title: "Dev OP" },
        { index: 3, title: "Business Analyst" },
        { index: 4, title: "PM" },
      ],
      degrees: ["Associate", "Bachelor", "Master", "Doctoral"],
    };
  }
  render() {
    let { user, education, skills, employments, listSubjects } = this.props;
    let { degrees, positions } = this.state;
    let employmentsELM = employments.map((employment, index) => {
      return (
        <div className="cv-pre-section-item" key={index}>
          <div className="section-overview">{`${
            positions[employment.position].title
          }, ${employment.company}, ${employment.city}`}</div>
          <div className="section-year">July 2018 - July 2020</div>
          <div className="section-description">draft</div>
        </div>
      );
    });
    let educationElm = education.map((edu, index) => {
      return (
        <div className="cv-pre-section-item" key={index}>
          <div className="section-overview">{`${degrees[edu.degree]}, ${
            edu.university
          }, Ho Chi Minh City`}</div>
          <div className="section-year">July 2016 - July 2020</div>
          <div className="section-description">draft</div>
        </div>
      );
    });
    let skillsElm = skills.map((skill, index) => {
      return (
        <div className="cv-pre-skill-section" key={index}>
          <div className="cv-skill-name">
            {listSubjects[skill.subject_id - 1].title}
          </div>
          <div className="cv-skill-lvl-bar">
            <div
              className="progress"
              style={{ width: `${skill.level * 20}%` }}
            ></div>
          </div>
        </div>
      );
    });
    return (
      <div className="cv-preview-container">
        <div className="cv-preview-header">
          <img
            alt="ava"
            src={
              user.avatar !== null
                ? user.avatar
                : require("../../../utils/images/defaultava.png")
            }
          />
          <div className="cv-preview-name">{user.name}</div>
          <div className="cv-preview-job">{user.job_title}</div>
        </div>
        <div className="cv-preview-contact d-flex flex-row justify-content-center">
          <div className="contact-email mr-5 ">
            <span>
              <FontAwesomeIcon icon={faEnvelope} className="mr-1" />
              {user.email}
            </span>
          </div>
          <div className="contact-phone">
            <span>
              <FontAwesomeIcon icon={faPhoneAlt} className="mr-1" />
              {user.phone}
            </span>
          </div>
        </div>
        <div className="cv-preview-body">
          <div className="cv-pre-profile">
            <div className="cv-pre-title">Profile</div>
          </div>
          <div className="cv-pre-employment-history">
            <div className="cv-pre-title">Employment History</div>
            {employmentsELM}
          </div>
          <div className="cv-pre-education">
            <div className="cv-pre-title">Education</div>
            {educationElm}
          </div>
          <div className="cv-pre-skill">
            <div className="cv-pre-title">Skills</div>
            {skillsElm}
          </div>
        </div>
      </div>
    );
  }
}

export default CVPreview;
