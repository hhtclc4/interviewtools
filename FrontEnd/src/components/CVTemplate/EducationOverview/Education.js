import React from "react";
import "./Education.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Editor } from "react-draft-wysiwyg";
import { Select, DatePicker } from "antd";
const { Option } = Select;
class EducationOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      degrees: [
        { index: 0, title: "Associate degree" },
        { index: 1, title: "Bachelor's degree" },
        { index: 2, title: "Master's degree" },
        { index: 3, title: "Doctoral degree" },
      ],
      titles: ["Associate", "Bachelor", "Master", "Doctoral"],
      education: {
        university: "",
        degree: 0,
        completion_time: 0,
        description: "",
      },
      isFill: false,
      completion_times: [1, 2, 3, 4, 5, 6, 7],
    };
  }
  componentDidMount() {
    this.setState({
      education: this.props.education,
    });
  }
  onChangeEducationHandler = (event) => {
    let { onChangeEducationHandler, index } = this.props;
    let { education } = this.state;
    let value = event.target.value;
    let name = event.target.name;
    this.setState({
      isFill: true,
      education: {
        ...education,
        [name]: value,
      },
    });
    onChangeEducationHandler({ ...education, [name]: value }, index);
  };
  onChangeSelectSingle = (key, value) => {
    let { education } = this.state;
    let { onChangeEducationHandler, index } = this.props;
    this.setState({
      isFill: true,
      education: {
        ...education,
        [key]: parseInt(value),
      },
    });
    onChangeEducationHandler({ ...education, [key]: value }, index);
  };
  toggleEmpDetail = () => {
    this.setState({
      isExpand: !this.state.isExpand,
    });
  };
  render() {
    let {
      isExpand,
      isFill,
      education,
      degrees,
      completion_times,
      titles,
    } = this.state;
    let menuYears = completion_times.map((experience) => {
      return <Option key={experience}>{experience}</Option>;
    });
    let menuDegrees = degrees.map((degree) => {
      return <Option key={degree.index}>{degree.title}</Option>;
    });
    return (
      <div className="employment-container">
        <div className="emp-container-actions"></div>
        <div className="employment-control">
          <div className="employment-overview-info d-flex flex-row justify-content-between">
            <div className="info-left">
              <span className="emp-position-employer">
                {isFill
                  ? `${titles[education.degree]} at ${education.university}`
                  : "(Not specified)"}
              </span>
              <div className="emp-experience-year">
                {isFill ? (
                  <div className="emp-experience-year">
                    {education.completion_time} years training
                  </div>
                ) : null}
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
                  <div className="cv-input-title">University</div>
                  <div className="cv-input-ipt">
                    <input
                      name="university"
                      value={education.university}
                      onChange={this.onChangeEducationHandler}
                    />{" "}
                  </div>
                </div>
                <div className="cv-input">
                  <div className="cv-input-title">Completion Time</div>
                  <div className="cv-input-ipt d-flex flex-row justify-content-between">
                    {/* <Select
                      style={{ width: "100%" }}
                      placeholder="Please select your year experience"
                      onChange={(value) =>
                        this.onChangeSelectSingle("exp", value)
                      }
                      value={employment.exp}
                    >
                      {menuYears}
                    </Select> */}
                    <div className="cv-start-date">
                      <DatePicker picker="month" />
                    </div>
                    <div className="cv-end-date">
                      <DatePicker picker="month" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="half">
                <div className="cv-input">
                  <div className="cv-input-title">Degree</div>
                  <div className="cv-input-ipt">
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Please select your degree"
                      onChange={(value) =>
                        this.onChangeSelectSingle("degree", value)
                      }
                      value={degrees[education.degree].title}
                    >
                      {menuDegrees}
                    </Select>
                  </div>
                </div>
                <div className="cv-input">
                  <div className="cv-input-title">City</div>
                  <div className="cv-input-ipt">
                    <input
                      name="city"
                      value={education.city}
                      onChange={this.onChangeEducationHandler}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="cv-input">
              <div className="cv-input-title">Description</div>
              <div className="cv-input-ipt">
                <Editor />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EducationOverview;
