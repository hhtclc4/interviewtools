import React from "react";
import "./Report.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import CanOverview from "../../Interview/Control/CandidateOverview/CanOverview";

class InterviewReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reportBody: false,
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
        campaign: {
          question_table: { benchmark: 70 },
        },
        totalAccuracy: 0,
        group_candidates: [
          {
            candidate_id: 0,
            cv: "",
            description: "",
            interview_time: "12:00:00",
            answer_records: [],
            accuracy: 0,

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

  toggleReportBody = () => {
    let { reportBody } = this.state;

    this.setState({
      reportBody: !reportBody,
    });
  };
  componentDidMount() {
    let { data } = this.props;
    let state = this.state;
    state.data = data;
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

  accuracyColor = (accuracy) => {
    switch (true) {
      case accuracy <= 10:
        return "#ff0000";
      case accuracy <= 55:
        return "#f5a623";
      case accuracy <= 80:
        return "#99cc00";
      case accuracy <= 100:
        return "#4caf50";
      default:
        return "";
    }
  };

  render() {
    let { reportBody, data } = this.state;
    let { day, month, year, weekDay } = this.state;

    let candidates = data.group_candidates.map((candidate, index) => {
      return (
        <CanOverview
          key={candidate.campaign_id + candidate.candidate_id}
          data={candidate}
          from="control"
          type="canRow"
          source="complete"
          //color={index % 2 === 0 ? "#f1f1f1" : "#fff"}
          display={reportBody}
        />
      );
    });

    let scoreElm = data.group_candidates.map((score) => {
      let accuracyColor = this.accuracyColor(score.accuracy);
      return (
        <div className="can-score-content" key={score.candidate_id}>
          <div
            className="score-inner"
            style={{ backgroundColor: accuracyColor }}
          >
            {score.accuracy}%
          </div>
        </div>
      );
    });

    let statusElm = data.group_candidates.map((status) => {
      return (
        <div className="can-status-content" key={status.candidate_id}>
          <div className="status-inner">
            {status.accuracy >= data.campaign.question_table.bench_mark ? (
              <FontAwesomeIcon icon={faCheck} size="lg" color="#4caf50" />
            ) : (
                <FontAwesomeIcon icon={faTimes} size="lg" color="red" />
              )}
          </div>
        </div>
      );
    });

    let totalAccuracy = this.accuracyColor(data.totalAccuracy);
    return (
      <div
        className="interview-report-container py-3 pr-2 pl-0"
      // onClick={this.toggleReportBody}
      >
        <div
          className="interview-report-header d-flex flex-row justify-content-between ml-2 px-1 py-2"
          style={reportBody ? { backgroundColor: "#e6e6e6" } : {}}
        >
          <div className="in-partion-time">
            <span>
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
              {weekDay}, {month} {day}th {year}
            </span>
          </div>
          <div className="in-partion-name">{data.name}</div>
          <div className="in-partion-total-can">
            {data.group_candidates.length}
          </div>
          <div className="in-partion-acc">
            <div className="max-acc-progress">
              <div
                className="acc-progress"
                style={{
                  width: `${data.totalAccuracy}%`,
                  backgroundColor: totalAccuracy,
                }}
              >
                {data.totalAccuracy}%
              </div>
            </div>
          </div>
          <button className="in-expand-btn" onClick={this.toggleReportBody}>
            <FontAwesomeIcon icon={faAngleDown} size="lg" />
          </button>
        </div>

        <div
          className="interview-report-body d-flex flex-row"
          style={reportBody ? { display: "none" } : { height: "0" }}
        >
          <div className="in-report-can-result d-flex flex-row">
            <div className="can-overview-list ">
              <CanOverview display={reportBody} from="control" type="partion" />
              {candidates}
            </div>
            <div // Khong thuoc candidate
              className={
                reportBody ? "can-score-list d-flex flex-column" : "d-none"
              }
            >
              <div className="can-score-partion ml-auto">
                <b>SCORE</b>
              </div>
              <hr
                style={{
                  marginTop: "calc(10px)",
                  marginBottom: "17px",
                  width: "100%",
                  backgroundColor: "#f2f2f2",
                }}
              />

              {scoreElm}
            </div>

            <div
              className={
                reportBody ? "can-score-list d-flex flex-column" : "d-none"
              }
            >
              <div className="can-score-partion ml-auto">
                <b>STATUS</b>
              </div>
              <hr
                style={{
                  marginTop: "calc(10px)",
                  marginBottom: "17px",
                  width: "100%",
                  backgroundColor: "#f2f2f2",
                }}
              />
              {statusElm}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InterviewReport;
