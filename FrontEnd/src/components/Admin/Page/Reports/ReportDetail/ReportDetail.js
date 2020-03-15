import React from "react";
import "./ReportDetail.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import ProgressCircle from "./ProgressCircle/ProgressCircle";
import ReportPlayers from "./Player/Players";
import ReportQuestions from "./Questions/Questions";
import { Tabs, Tab, Panel } from "@bumaga/tabs";
class ReportDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="report-detail-container">
        <div className="report-detail-overview shadow-sm">
          <div className="row">
            <div className="text-info col-6 d-flex flex-column">
              <span>Quiz type</span>
              <div className="rd-quiz-name">Quiz name</div>
              <div className="rd-viewquiz" type="button">
                View quiz
              </div>
            </div>
            <div className="chart-info col-6 d-flex flex-row justify-content-between">
              <div className="chart-display">
                <div className="circle-accuracy d-flex flex-column justify-content-center">
                  <ProgressCircle /> {/*Cai nay` lam animation sau */}
                </div>
              </div>
              <div className="chart-display">
                <div className="circle d-flex flex-column justify-content-center">
                  <FontAwesomeIcon
                    className="align-self-center"
                    icon={faQuestionCircle}
                  />
                  <p className="align-self-center">number</p>
                </div>
              </div>
              <div className="chart-display">
                <div className="circle d-flex flex-column justify-content-center">
                  <FontAwesomeIcon
                    className="align-self-center"
                    icon={faUsers}
                  />
                  <p className="align-self-center">number</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="report-detail-tabs ">
          <Tabs>
            <div className="rd-tabs-header shadow-sm">
              <Tab>
                <button className="rd-tab">Players</button>
              </Tab>
              <Tab>
                <button className="rd-tab">Questions</button>
              </Tab>
            </div>

            <Panel>
              <ReportPlayers />
            </Panel>
            <Panel>
              <ReportQuestions />
            </Panel>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default ReportDetail;
