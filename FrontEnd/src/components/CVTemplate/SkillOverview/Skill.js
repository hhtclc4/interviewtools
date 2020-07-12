import React from "react";
import "./Skill.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Select } from "antd";
const { Option } = Select;
class SkillOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpand: false,
      isFill: false,
      subject: {
        id: 0,
        title: "C++",
        skills: { subject_id: 1, level: 0, description: "" },
      },
      skillLevels: [
        { index: 0, title: "Novice" },
        { index: 1, title: "Beginner" },
        { index: 2, title: "Skillful" },
        { index: 3, title: "Experienced" },
        { index: 4, title: "Expert" },
      ],
    };
  }
  componentDidMount() {
    this.setState({
      subject: this.props.skill,
    });
  }
  toggleEmpDetail = () => {
    this.setState({
      isExpand: !this.state.isExpand,
    });
  };

  levelClick = (level) => {
    let { subject } = this.state;
    let { skills } = subject;
    let { onChangeSkillHandler, index } = this.props;
    this.setState({
      subject: {
        ...subject,
        skills: {
          ...skills,
          level,
        },
      },
    });
    onChangeSkillHandler({ ...subject, skills: { ...skills, level } }, index);
  };

  onChangeSelectSingle = (key, value) => {
    let { subject } = this.state;
    let { skills } = subject;
    let { onChangeSkillHandler, index, listSubjects } = this.props;
    console.log(key, value);
    this.setState({
      isFill: true,
      subject: {
        title: listSubjects[parseInt(value) - 1].title,
        id: parseInt(value),
        skills: {
          ...skills,
          [key]: parseInt(value),
        },
      },
    });
    onChangeSkillHandler(
      {
        ...subject,
        title: listSubjects[parseInt(value) - 1].title,
        id: parseInt(value),
        skills: { ...skills, [key]: value },
      },
      index
    );
  };
  levelColor = (index) => {
    switch (index) {
      case 0:
        return "#FF5959";
      case 1:
        return "#FF9159";
      case 2:
        return "#F3B721";
      case 3:
        return "#80CC14";
      case 4:
        return "#25B869";
      default:
        break;
    }
  };
  backwardColor = (index) => {
    switch (index) {
      case 0:
        return "#ffe6e6";
      case 1:
        return "#ffddcc";
      case 2:
        return "#fae09e";
      case 3:
        return "#F2FAE7";
      case 4:
        return "#E9F8F0";
      default:
        break;
    }
  };

  textLevel = (index) => {
    switch (index) {
      case 0:
        return "Novice";
      case 1:
        return "Beginner";
      case 2:
        return "Skillful";
      case 3:
        return "Experienced";
      case 4:
        return "Expert";
      default:
        break;
    }
  };
  render() {
    let { isExpand, subject, isFill, skillLevels } = this.state;
    let { skills } = subject;
    let { listSubjects } = this.props;
    let menuSubjects = listSubjects.map((subject) => {
      return <Option key={subject.id}>{subject.title}</Option>;
    });
    let textLevel = this.textLevel(skills.level);
    return (
      <div className="employment-container">
        <div className="emp-container-actions"></div>
        <div className="employment-control">
          <div className="employment-overview-info d-flex flex-row justify-content-between">
            <div className="info-left">
              <span className="emp-position-employer">
                {isFill
                  ? listSubjects[skills.subject_id - 1].title
                  : "(Not specified)"}
              </span>
              <div className="emp-experience-year">
                {isFill ? skillLevels[skills.level].title : null}
              </div>
            </div>
            <div className="btn-right align-self-center">
              <button
                className="float-right expand-btn"
                onClick={this.toggleEmpDetail}
              >
                {isExpand ? (
                  <FontAwesomeIcon icon={faChevronUp} />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} />
                )}
              </button>
            </div>
          </div>
          <div
            className="employment-detail-info"
            style={isExpand ? { display: "block" } : { display: "none" }}
          >
            <div className="cv-section-input">
              <div className="half">
                <div className="cv-input">
                  {/**component of an input  */}
                  <div className="cv-input-title">Skill</div>
                  <div className="cv-input-ipt">
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Please select your major"
                      onChange={(value) =>
                        this.onChangeSelectSingle("subject_id", value)
                      }
                      value={listSubjects[skills.subject_id - 1].title}
                    >
                      {menuSubjects}
                    </Select>
                  </div>
                </div>
              </div>
              <div className="half">
                <div className="cv-input">
                  <div className="cv-input-title">Level-{textLevel}</div>
                  <div
                    className="cv-level-bar"
                    style={{
                      backgroundColor: this.backwardColor(skills.level),
                    }}
                  >
                    {this.state.skillLevels.map((value, index) => {
                      let color = this.levelColor(index);
                      return (
                        <div
                          className="select-level"
                          key={index}
                          onClick={() => this.levelClick(index)}
                          style={
                            skills.level === index
                              ? { backgroundColor: color }
                              : null
                          }
                        ></div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SkillOverview;
