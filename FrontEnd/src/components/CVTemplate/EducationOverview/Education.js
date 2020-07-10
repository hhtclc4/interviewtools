import React from "react";
import "./Education.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Select, DatePicker } from "antd";
import moment from "moment";
import EditorConvertToHTML from "../../../utils/EditorConvertToHTML/EditorConvertToHTML";
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
        date_begin: "2016-06-01",
        date_end: "2020-06-01",
        description: "",
      },
      isFill: false,
    };
  }
  componentDidMount() {
    this.setState({
      education: this.props.education,
    });
  }
  onChangeEditorEducationHandler = (description) => {
    let { onChangeEducationHandler, index } = this.props;
    let { education } = this.state;
    this.setState({
      education: {
        ...this.state.education,
        description,
      },
    });
    onChangeEducationHandler({ ...education, description }, index);
  };
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
  onChangeDatePick = (e, name) => {
    let { education } = this.state;
    let { onChangeEducationHandler, index } = this.props;
    let date = moment(e._d).format("YYYY-MM-DD");
    this.setState({
      education: {
        ...education,
        [name]: date,
      },
    });
    onChangeEducationHandler({ ...education, [name]: date }, index);
  };
  render() {
    let { isExpand, isFill, education, degrees, titles } = this.state;
    let yearexp =
      parseInt(moment(education.date_end).format("YYYY")) -
      parseInt(moment(education.date_begin).format("YYYY"));
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
                    Under {yearexp} years training
                  </div>
                ) : null}
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
                      <DatePicker
                        picker="month"
                        onChange={(e) => this.onChangeDatePick(e, "date_begin")}
                      />
                    </div>
                    <div className="cv-end-date">
                      <DatePicker
                        picker="month"
                        onChange={(e) => this.onChangeDatePick(e, "date_end")}
                      />
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
                <EditorConvertToHTML
                  onChangeEditorTextHandler={
                    this.onChangeEditorEducationHandler
                  }
                  text=""
                  placeholder="Describe works "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EducationOverview;
