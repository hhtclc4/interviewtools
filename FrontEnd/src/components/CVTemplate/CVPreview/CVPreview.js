import React from "react";
import "./CVPreview.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { EditorState, convertFromHTML, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
class CVPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positions: [
        { index: 0, title: "Tester" },
        { index: 1, title: "System Analyst" },
        { index: 2, title: "Dev OP" },
        { index: 3, title: "Business Analyst" },
        { index: 4, title: "PM" },
        { index: 5, title: "FrontEnd Developer" },
        { index: 6, title: "BackEnd Developer" },
        { index: 7, title: "Cloud Computing Engineer" },
        { index: 8, title: "Database Administrator" },
        { index: 9, title: "Other..." },
      ],
      degrees: ["Associate", "Bachelor", "Master", "Doctoral"],
    };
  }
  render() {
    let { user, education, subjects, employments } = this.props;
    let { degrees, positions } = this.state;
    //
    let sampleMarkupUser = user.description !== null ? user.description : "";
    let blocksFromHTMLUser = convertFromHTML(sampleMarkupUser);
    let textStateUser = ContentState.createFromBlockArray(
      blocksFromHTMLUser.contentBlocks,
      blocksFromHTMLUser.entityMap
    );
    //
    let sampleMarkupEducation = education.description;
    let blocksFromHTMLEducation = convertFromHTML(sampleMarkupEducation);
    let textStateEducation = ContentState.createFromBlockArray(
      blocksFromHTMLEducation.contentBlocks,
      blocksFromHTMLEducation.entityMap
    );
    let date_begin = moment(education.date_begin).format("LL");
    let date_end = moment(education.date_end).format("LL");
    //
    let employmentsELM = employments.map((employment, index) => {
      let sampleMarkupEmployment = employment.description;
      let blocksFromHTMLEmployment = convertFromHTML(sampleMarkupEmployment);
      let textStateEmployment = ContentState.createFromBlockArray(
        blocksFromHTMLEmployment.contentBlocks,
        blocksFromHTMLEmployment.entityMap
      );
      let date_begin = moment(employment.date_begin).format("LL");
      let date_end = moment(employment.date_end).format("LL");

      return (
        <div className="cv-pre-section-item" key={index}>
          <div className="section-overview">{`${
            positions[employment.position].title
          }, ${employment.company}, ${employment.city}`}</div>
          <div className="section-year">
            {date_begin} - {date_end}
          </div>
          <div className="section-description">
            {" "}
            <Editor
              wrapperClassName="cv-desc-wrapper"
              editorClassName="cv-desc-editor"
              toolbarClassName="d-none"
              editorState={EditorState.createWithContent(textStateEmployment)}
            />
          </div>
        </div>
      );
    });
    let skillsElm = subjects.map((subject, index) => {
      return (
        <div className="cv-pre-skill-section" key={index}>
          <div className="cv-skill-name">{subject.title}</div>
          <div className="cv-skill-lvl-bar">
            <div
              className="progress"
              style={{ width: `${subject.skills.level * 20 + 20}%` }}
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
            <Editor
              wrapperClassName="cv-desc-wrapper"
              editorClassName="cv-desc-editor"
              toolbarClassName="d-none"
              editorState={EditorState.createWithContent(textStateUser)}
            />
          </div>
          <div className="cv-pre-employment-history">
            <div className="cv-pre-title">Employment History</div>
            {employmentsELM}
          </div>
          <div className="cv-pre-education">
            <div className="cv-pre-title">Education</div>
            <div className="cv-pre-section-item">
              <div className="section-overview">{`${
                degrees[education.degree]
              }, ${education.university}, Ho Chi Minh City`}</div>
              <div className="section-year">
                {date_begin} - {date_end}
              </div>
              <div className="section-description">
                <Editor
                  wrapperClassName="cv-desc-wrapper"
                  editorClassName="cv-desc-editor"
                  toolbarClassName="d-none"
                  editorState={EditorState.createWithContent(
                    textStateEducation
                  )}
                />
              </div>
            </div>{" "}
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
