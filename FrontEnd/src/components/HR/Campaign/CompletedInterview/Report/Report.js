import React from "react";
import "./Report.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import CanOverview from "../../Interview/Control/CandidateOverview/CanOverview";

class InterviewReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reportBody: false,
      accuracy: 30,
      weekDay: "",
      day: "",
      month: "",
      year: "",
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
    let { reportBody, accuracy } = this.state;
    let { day, month, year, weekDay } = this.state;

    let { data } = this.props;
    let candidates = data.group_candidates.map((candidate, index) => {
      return (
        <CanOverview
          key={candidate.campaign_id + candidate.candidate_id}
          data={candidate}
          from="control"
          type="canRow"
          color={index % 2 === 0 ? "#f1f1f1" : "#fff"}
          display={reportBody}
        />
      );
    });
    return (
      <div className="interview-report-container py-3 pr-2 pl-0">
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
              <div className="acc-progress" style={{ width: `${accuracy}%` }}>
                100%
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
            <div
              className={
                reportBody ? "can-score-list d-flex flex-column" : "d-none"
              }
            >
              <div className="can-score-partion ml-auto">SCORE</div>
              <hr
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  width: "100%",
                }}
              />
              <div className="can-score-content ml-auto mt-2">100%</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InterviewReport;
