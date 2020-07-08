import React from "react";
import "./Employment.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Editor } from "react-draft-wysiwyg";
import { Select } from "antd";
const { Option } = Select;

class EmploymentOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpand: false,
      isFill: false,
      positions: [
        { index: 0, title: "Tester" },
        { index: 1, title: "Dev" },
        { index: 2, title: "Dev OP" },
        { index: 3, title: "Business Analyst" },
        { index: 4, title: "PM" },
      ],
      experiences: [1, 2, 3, 4, 5, 6, 7],

      employment: {
        position: 0,
        company: "",
        exp: 0,
        city: "",
        description: "",
      },
    };
  }
  componentDidMount() {
    this.setState({
      employment: this.props.employment,
    });
  }
  toggleEmpDetail = () => {
    this.setState({
      isExpand: !this.state.isExpand,
    });
  };
  onChangeEmploymentHandler = (event) => {
    let { onChangeEmploymentHandler, index } = this.props;
    let { employment } = this.state;
    let value = event.target.value;
    let name = event.target.name;
    this.setState({
      isFill: true,
      employment: {
        ...employment,
        [name]: value,
      },
    });
    onChangeEmploymentHandler({ ...employment, [name]: value }, index);
  };
  onChangeSelectSingle = (key, value) => {
    let { employment } = this.state;
    let { onChangeEmploymentHandler, index } = this.props;
    this.setState({
      isFill: true,
      employment: {
        ...employment,
        [key]: parseInt(value),
      },
    });
    onChangeEmploymentHandler({ ...employment, [key]: value }, index);
  };
  render() {
    let { isExpand, employment, positions, experiences, isFill } = this.state;
    let menuPositions = positions.map((position) => {
      return <Option key={position.index}>{position.title}</Option>;
    });
    let menuYears = experiences.map((experience) => {
      return <Option key={experience}>{experience}</Option>;
    });
    return (
      <div className="employment-container">
        <div className="emp-container-actions"></div>
        <div className="employment-control">
          <div className="employment-overview-info d-flex flex-row justify-content-between">
            <div className="info-left">
              <span className="emp-position-employer">
                {isFill
                  ? `${positions[employment.position].title} at ${
                      employment.company
                    }`
                  : "Insert some employment"}
              </span>
              {isFill ? (
                <div className="emp-experience-year">
                  {employment.exp} years
                </div>
              ) : null}
            </div>
            <div className="btn-right align-self-center">
              <button className="float-right" onClick={this.toggleEmpDetail}>
                <FontAwesomeIcon icon={faChevronDown} />
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
                  <div className="cv-input-title">Position</div>
                  <div className="cv-input-ipt">
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Please select your position"
                      onChange={(value) =>
                        this.onChangeSelectSingle("position", value)
                      }
                      value={positions[employment.position].title}
                    >
                      {menuPositions}
                    </Select>
                  </div>
                </div>
                <div className="cv-input">
                  <div className="cv-input-title">Year Experience</div>
                  <div className="cv-input-ipt">
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Please select your year experience"
                      onChange={(value) =>
                        this.onChangeSelectSingle("exp", value)
                      }
                      value={employment.exp}
                    >
                      {menuYears}
                    </Select>
                  </div>
                </div>
              </div>
              <div className="half">
                <div className="cv-input">
                  <div className="cv-input-title">Company</div>
                  <div className="cv-input-ipt">
                    <input
                      name="company"
                      value={employment.company}
                      onChange={this.onChangeEmploymentHandler}
                    />
                  </div>
                </div>
                <div className="cv-input">
                  <div className="cv-input-title">City</div>
                  <div className="cv-input-ipt">
                    <input
                      name="city"
                      value={employment.city}
                      onChange={this.onChangeEmploymentHandler}
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

export default EmploymentOverview;
