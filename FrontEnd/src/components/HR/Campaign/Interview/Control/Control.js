import React from "react";

import "./Control.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClock } from "@fortawesome/free-regular-svg-icons";
import { faUserEdit, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import CanOverview from "./CandidateOverview/CanOverview";
import CandidatePopup from "./CandidatePopup";

class InterviewControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowCandidatePopup: false,
      weekDay: "",
      day: "",
      month: "",
      year: "",
      data: {
        id: 0,
        name: "",
        date: "2020-01-01",
        time: "12:00:00",
        campaign_id: "",
        group_candidates: [
          {
            candidate_id: 0,
            cv: "",
            description: "",
            interview_time: "12:00:00",
            user: {
              id: 0,
              name: "",
              email: "",
              phone: "",
            },
          },
        ],
      },
    };
  }

  toggleCandidatePopup = () => {
    let { isShowCandidatePopup } = this.state;

    if (isShowCandidatePopup === true) {
      this.setState({
        isShowCandidatePopup: !isShowCandidatePopup,
      });
    }
  };
  componentDidMount() {
    let { data } = this.props;
    console.log("control", data);

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
      data,
    });
  }
  render() {
    let { day, month, year, weekDay, data } = this.state;
    let candidateEml = data.group_candidates.map((candidate, index) => {
      return (
        <CanOverview
          key={candidate.candidate_id}
          data={candidate}
          color={index % 2 === 0 ? "#f1f1f1" : "#fff"}
          from="control"
        />
      );
    });
    return (
      <div
        className="interview-control-container d-flex flex-column justify-content-start mb-4"
        style={{ borderLeft: "10px solid #d3d71d" }}
      >
        <div className="interview-control-header d-flex flex-row justify-content-between p-2">
          <div className="in-control-name  py-2">{data.name}</div>

          <div className="in-control-options-group d-flex flex-row">
            <div className="in-control-time p-2 mr-2">
              <span style={{ marginRight: "5px" }}>
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  size="lg"
                  color="#393A68"
                />
              </span>
              <span>
                {weekDay}, {month} {day}th {year}
              </span>
            </div>
            <div className="in-control-time p-2 mr-2">
              <span style={{ marginRight: "5px" }}>
                <FontAwesomeIcon icon={faClock} size="lg" color="#393A68" />
              </span>
              <span>
                {data.time_from} to {data.time_to}
              </span>
            </div>
            <button
              className="in-control-add"
              onClick={() => {
                this.setState({
                  isShowCandidatePopup: !this.state.isShowCandidatePopup,
                });
                this.toggleCandidatePopup();
              }}
            >
              <span>
                <FontAwesomeIcon
                  icon={faUserPlus}
                  style={{ marginRight: "5px" }}
                  size="lg"
                  color="#393A68"
                />
              </span>
            </button>
          </div>
        </div>
        <div className="interview-control-body p-2">
          <div className="interview-candidate-list">
            <CanOverview from="control" type="partion" />
            {candidateEml}
          </div>
        </div>
        <div className="interview-control-footer p-2">
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

        {this.state.isShowCandidatePopup ? (
          <CandidatePopup closePopup={this.toggleCandidatePopup} />
        ) : null}
      </div>
    );
  }
}

export default InterviewControl;
