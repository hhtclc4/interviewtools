import React from "react";
import "./Employment.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Select, DatePicker } from "antd";
import EditorConvertToHTML from "../../../utils/EditorConvertToHTML/EditorConvertToHTML";
import moment from "moment";

const { Option } = Select;

class EmploymentOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpand: false,
      isFill: false,
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

      employment: {
        position: 0,
        company: "",
        city: "",
        description: "",
        date_begin: "2016-06-01",
        date_end: "2020-06-01",
      },
    };
  }
  componentDidMount() {
    this.setState({
      employment: this.props.employment,
    });
  }
  toggleEmpDetail = () => {
    let { isExpand } = this.state;
    if (isExpand === false) {
      this.setState({
        isExpand: !isExpand,
      });
    } else {
      setTimeout(() => {
        this.setState({
          isExpand: false,
        });
      }, 150);
    }
  };

  onChangeEditorEmploymentHandler = (description) => {
    let { onChangeEmploymentHandler, index } = this.props;
    let { employment } = this.state;
    this.setState({
      employments: {
        ...this.state.user,
        description,
      },
    });
    onChangeEmploymentHandler({ ...employment, description }, index);
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
  onChangeDatePick = (e, name) => {
    let { employment } = this.state;
    let { onChangeEmploymentHandler, index } = this.props;
    let date = moment(e._d).format("YYYY-MM-DD");
    this.setState({
      employment: {
        ...employment,
        [name]: date,
      },
    });
    onChangeEmploymentHandler({ ...employment, [name]: date }, index);
  };
  render() {
    let { isExpand, employment, positions, isFill } = this.state;
    let yearexp =
      parseInt(moment(employment.date_end).format("YYYY")) -
      parseInt(moment(employment.date_begin).format("YYYY"));
    let menuPositions = positions.map((position) => {
      return <Option key={position.index}>{position.title}</Option>;
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
                  : "(Not specified)"}
              </span>
              {isFill ? (
                <div className="emp-experience-year">Under {yearexp} years</div>
              ) : null}
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
            className={
              isExpand
                ? "employment-detail-info emp-open"
                : "employment-detail-info emp-exit"
            }
            style={
              isExpand
                ? { display: "block" }
                : { animation: "closeEmp 0.3s ease" }
            }
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
                <EditorConvertToHTML
                  onChangeEditorTextHandler={
                    this.onChangeEditorEmploymentHandler
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

export default EmploymentOverview;
