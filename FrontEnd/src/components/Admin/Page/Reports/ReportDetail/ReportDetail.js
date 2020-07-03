import React from "react";
import "./ReportDetail.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle, faClock } from "@fortawesome/free-regular-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import ProgressCircle from "./ProgressCircle/ProgressCircle";
import ReportPlayers from "./Player/Players";
import { withRouter } from "react-router-dom";

class ReportDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: "",
      campaign: {
        id: 0,
        title: "",
        subject_id: 0,
        level_id: 0,
        work_type_id: 0,
        salary: 0,
        user_id: 0,
        work_description: "",
        image: "",
        subjects: [{ id: 0, title: "" }],
        question_table: {
          title: "",
          questions: [
            {
              question: "",
              question_choices: [
                {
                  answer: "",
                  is_right: 0,
                },
              ],
            },
          ],
          created_at: "2020-01-01",
        },
      },
      interview: {
        id: 0,
        name: "",
        date: "2020-01-01",
        time: "12:00:00",
        campaign_id: "",
        totalAccuracy: 0,
        group_candidates: [
          {
            candidate_id: 0,
            cv: "",
            description: "",
            interview_time: "12:00:00",
            answer_records: [],
            campaign: {
              benchmark: 70,
            },
            user: {
              id: 0,
              name: "",
              email: "",
              phone: "",
            },
            accuracy: 0,
          },
        ],
      },
    };
  }
  componentDidMount() {
    let interview = JSON.parse(localStorage.getItem("report"));
    let campaign = JSON.parse(localStorage.getItem("campaign"));

    this.setState({
      interview,
      campaign,
    });
  }
  getDate = (date) => {
    var K = () => {
      var a = navigator.userAgent;
      return {
        ie: a.match(/MSIE\s([^;]*)/),
      };
    };
    var system_date = new Date(Date.parse(date));
    var user_date = new Date();
    if (K.ie) {
      system_date = Date.parse(date.replace(/( \+)/, " UTC$1"));
    }
    var diff = Math.floor((user_date - system_date) / 1000);
    if (diff <= 1) {
      return "just now";
    }
    if (diff < 20) {
      return diff + " seconds ago";
    }
    if (diff < 40) {
      return "half a minute ago";
    }
    if (diff < 60) {
      return "less than a minute ago";
    }
    if (diff <= 90) {
      return "one minute ago";
    }
    if (diff <= 3540) {
      return Math.round(diff / 60) + " minutes ago";
    }
    if (diff <= 5400) {
      return "1 hour ago";
    }
    if (diff <= 86400) {
      return Math.round(diff / 3600) + " hours ago";
    }
    if (diff <= 129600) {
      return "1 day ago";
    }
    if (diff < 604800) {
      return Math.round(diff / 86400) + " days ago";
    }
    if (diff <= 777600) {
      return "1 week ago";
    }
    return " On " + system_date;
  };
  render() {
    let { interview, campaign } = this.state;
    let date = this.getDate(campaign.created_at);
    let playerElm = interview.group_candidates.map((player, index) => {
      return (
        <ReportPlayers
          //key={player.id} //id bi trung
          key={index}
          data={player}
          question_table={campaign.question_table}
        />
      );
    });
    return (
      <div className="report-detail-container">
        <div className="report-detail-overview shadow-sm">
          <div className="row">
            <div className="rd-text-info col-6 d-flex flex-column">
              <div className="rd-quiz-name">
                {campaign.question_table.title}
              </div>
              <div className="rd-quiz-time">
                <FontAwesomeIcon icon={faClock} className="mb-0 mr-1" />
                {date}
              </div>
              <button className="rd-viewquiz">View quiz</button>
            </div>
            <div className="chart-info col-6 d-flex flex-row justify-content-between">
              <div className="chart-display text-center">
                <div className="circle-accuracy d-flex flex-column justify-content-center">
                  <ProgressCircle progress={interview.totalAccuracy} />
                  {/*Cai nay` lam animation sau */}
                </div>
                <p>Accuracy</p>
              </div>
              <div className="chart-display text-center">
                <div className="circle d-flex flex-column justify-content-center">
                  <FontAwesomeIcon
                    className="align-self-center"
                    icon={faQuestionCircle}
                  />
                  <p className="align-self-center">
                    {campaign.question_table.questions.length}
                  </p>
                </div>
                <p>Questions</p>
              </div>
              <div className="chart-display text-center">
                <div className="circle d-flex flex-column justify-content-center">
                  <FontAwesomeIcon
                    className="align-self-center"
                    icon={faUsers}
                  />
                  <p className="align-self-center">
                    {interview.group_candidates.length}
                  </p>
                </div>
                <p>Player</p> <p>Attempts</p>
              </div>
            </div>
          </div>
        </div>
        <div className="report-detail-tabs ">
          <div className="report-detail-tabs-header row mt-3 mb-1">
            <div className="player-img col-1"></div>
            <div className="player-name col-2">Player name</div>
            <div className="player-accuracy-bar col-5">Accuracy Bar</div>
            <div className="player-accuracy-rate col-2">Accuracy Rate</div>
            <div className="player-result col-1">Result</div>
            <div className="player-result col-1">Note</div>
          </div>
          {playerElm}
        </div>
      </div>
    );
  }
}

export default withRouter(ReportDetail);
