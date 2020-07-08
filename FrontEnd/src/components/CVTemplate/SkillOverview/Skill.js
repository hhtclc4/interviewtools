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
      skill: {
        subject_id: 1,
        level: 0,
        description: "",
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
      skill: this.props.skill,
    });
  }
  toggleEmpDetail = () => {
    this.setState({
      isExpand: !this.state.isExpand,
    });
  };

  levelClick = (level) => {
    let { skill } = this.state;
    let { onChangeSkillHandler, index } = this.props;
    this.setState({
      skill: {
        ...skill,
        level,
      },
    });
    onChangeSkillHandler({ ...skill, level }, index);
  };

  onChangeSelectSingle = (key, value) => {
    let { skill } = this.state;
    let { onChangeSkillHandler, index } = this.props;
    this.setState({
      isFill: true,
      skill: {
        ...skill,
        [key]: parseInt(value),
      },
    });
    onChangeSkillHandler({ ...skill, [key]: value }, index);
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
    let { isExpand, skill, isFill, skillLevels } = this.state;
    let { listSubjects } = this.props;
    let menuSubjects = listSubjects.map((subject) => {
      return <Option key={subject.id}>{subject.title}</Option>;
    });
    let textLevel = this.textLevel(skill.level);
    return (
      <div className="employment-container">
        <div className="emp-container-actions"></div>
        <div className="employment-control">
          <div className="employment-overview-info d-flex flex-row justify-content-between">
            <div className="info-left">
              <span className="emp-position-employer">
                {isFill
                  ? listSubjects[skill.subject_id - 1].title
                  : "(Not specified)"}
              </span>
              <div className="emp-experience-year">
                {isFill ? skillLevels[skill.level].title : null}
              </div>
            </div>
            <div className="btn-right align-self-center">
              <button className="float-right expand-btn" onClick={this.toggleEmpDetail}>
                {isExpand ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
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
                      value={listSubjects[skill.subject_id - 1].title}
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
                    style={{ backgroundColor: this.backwardColor(skill.level) }}
                  >
                    {this.state.skillLevels.map((value, index) => {
                      let color = this.levelColor(index);
                      return (
                        <div
                          className="select-level"
                          key={index}
                          onClick={() => this.levelClick(index)}
                          style={
                            skill.level === index
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
