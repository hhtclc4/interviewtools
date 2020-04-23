import React from "react";
import "./../Interview.scss";
import { faClock, faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";

class InterviewThumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isComplete: false,
      weekDay: "",
      day: "",
      month: "",
      year: "",
    };
  }
  componentDidMount() {
    let { data } = this.props;
    //get date
    let jsDate = new Date(data.date);
    let dtf = new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
    let [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(
      jsDate
    );

    let weekDay = jsDate.toString().split(" ");
    this.setState({
      day: da,
      weekDay: weekDay[0],
      month: mo,
      year: ye,
    });
  }
  onClickHandler = () => {
    let { data } = this.props;
    this.props.onClickChooseInterview(data.id, data.name);
  };
  render() {
    let { data, interviewForcus } = this.props;
    let { day, month, year, weekDay } = this.state;
    return (
      <div
        className="initialized-interview-container d-flex flex-row mr-2 mb-2"
        onClick={this.onClickHandler}
        style={
          interviewForcus.interview_id === data.id
            ? { opacity: "1" }
            : { opacity: "0.7" }
        }
      >
        <div className="interview-info d-flex flex-column justify-content-between">
          <div className="interview-name">{data.name}</div>
          <div className="interview-deadline">
            <FontAwesomeIcon icon={faClock} />
            <span className="interview-time ml-1">
              {weekDay}, {month} {day}th {year} - {data.time}
            </span>
          </div>
          <div className="in-control-senior-name">
            <span>
              <FontAwesomeIcon
                icon={faUserEdit}
                size="lg"
                style={{ marginRight: "10px" }}
                color="#393A68"
              />
            </span>
            <span>Mr.Tri</span>
          </div>
        </div>
        <div className="interview-options d-flex flex-column justify-content-around align-items-center flex-grow-1">
          <FontAwesomeIcon icon={faEdit} color="#b3b3b3" />
          <FontAwesomeIcon icon={faTrashAlt} color="#b3b3b3" />
        </div>
      </div>
    );
  }
}

export default InterviewThumbnail;
