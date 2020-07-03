import React from "react";
import "./Players.scss";
import { withRouter } from "react-router-dom";
import PopUp from "../../../../../../utils/PopUp/PopUp";
import QuizPop from "../Quiz/Quiz";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faStickyNote,
} from "@fortawesome/free-solid-svg-icons";
class ReportPlayers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  togglePopUp = () => {
    // if (this.state.isShowQuiz === true) {
    //   this.setState({
    //     isShowQuiz: false,
    //   })
    // }
    this.setState({
      isShowQuiz: !this.state.isShowQuiz,
      isOpenPopup: !this.state.isOpenPopup,
    });
  };
  render() {
    let { data, question_table } = this.props;
    let { isShowQuiz, isOpenPopup } = this.state;
    let { correctAnswer, inCorrectAnswer, unAttemptAnswer } = data;
    let questionLength = question_table.questions.length;
    let correctAccuracy = (data.correctAnswer / questionLength) * 100;
    let inCorrectAccuracy = (data.inCorrectAnswer / questionLength) * 100;
    let unAttemptAccuracy = (data.unAttemptAnswer / questionLength) * 100;
    return (
      <div
        className="report-detail-player-container container-fluid "
        onClick={!isOpenPopup ? this.togglePopUp : null}
      >
        <div className="rd-player-row row shadow-sm d-flex flex-row ">
          <div className="rdp-ava align-self-center col-1">
            <img
              alt="rdp-ava"
              src={require("../../../../../../utils/images/defaultava.png")}
            />
          </div>
          <div className="rdp-name col-2 align-self-center">
            {data.user.name}
          </div>
          {/*De so zo*/}
          <div className="rdp-accuracy-bar col-5 align-self-center">
            <div className="bar-display">
              <div
                className="right-display"
                style={{ width: `${correctAccuracy}%` }}
              >
                <span>{correctAnswer}</span>
              </div>
              <div
                className="wrong-display"
                style={{ width: `${inCorrectAccuracy}%` }}
              >
                <span>{inCorrectAnswer}</span>
              </div>
              <div
                className="unattempt-display"
                style={{ width: `${unAttemptAccuracy}%` }}
              >
                <span>{unAttemptAnswer}</span>
              </div>
            </div>
          </div>
          <div className="rdp-accuracy-rate col-2 align-self-center">
            {data.accuracy}%
          </div>
          <div className="rdp-accuracy-rate col-1 align-self-center">
            {data.accuracy >= question_table.bench_mark ? (
              <FontAwesomeIcon icon={faCheck} size="lg" color="#4caf50" />
            ) : (
              <FontAwesomeIcon icon={faTimes} size="lg" color="red" />
            )}
          </div>
          <div className="rdp-accuracy-rate col-1 align-self-center ">
            <FontAwesomeIcon icon={faStickyNote} />
          </div>
        </div>
        {isShowQuiz ? (
          <PopUp
            openPop={(open) => {
              setTimeout(() => {
                this.setState({
                  isShowQuiz: !open,
                  isOpenPopup: false,
                });
              }, 150);
            }}
          >
            <QuizPop
              data={data}
              questions={question_table.questions}
              togglePopUp={this.togglePopUp}
            />
          </PopUp>
        ) : null}
      </div>
    );
  }
}

export default withRouter(ReportPlayers);
