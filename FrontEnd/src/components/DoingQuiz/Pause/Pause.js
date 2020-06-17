import React from "react";
import "./Pause.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRunning, faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
class PauseQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { questionsLength, wrong_answer, right_answer } = this.props;
    let questionRemain = questionsLength - wrong_answer - right_answer;
    let remainAccuracy = (questionRemain / questionsLength) * 100;

    let rightAccuracy = (right_answer / questionsLength) * 100;
    let wrongAccuracy = (wrong_answer / questionsLength) * 100;
    let presentAccuracy = (1 / questionsLength) * 100;

    return (
      <div className="pause-container">
        <div className="pause-content">
          <div className="pause-quiz-progress">
            <div className="pause-quiz-progress-bar">
              <div className="progress-display">
                <div
                  className="questions-done-right"
                  style={{ width: rightAccuracy }}
                ></div>
                <div
                  className="questions-done-wrong"
                  style={{ width: wrongAccuracy }}
                ></div>
                <div
                  className="question-present"
                  style={{ width: presentAccuracy }}
                ></div>
                <div
                  className="questions-left"
                  style={{ width: remainAccuracy }}
                ></div>
              </div>
              <span className="run">
                <FontAwesomeIcon icon={faRunning} color="white" />
              </span>
              <span className="flag">
                <FontAwesomeIcon icon={faFlagCheckered} color="white" />
              </span>
            </div>
            <div className="pause-legend d-flex flex-row justify-content-between">
              <div className="start-legend">Start</div>
              <div className="end-legend">End</div>
            </div>
            <div className="pause-question-left">
              {questionRemain} questions remaining
            </div>
            <div className="pause-actions">
              <button
                className="pause-resume-btn"
                onClick={this.props.togglePauseQuiz}
              >
                {" "}
                Resume Quiz
              </button>
              <button
                className="pause-exit-btn"
                onClick={this.props.onClickNextQuizHandler}
              >
                {" "}
                Next Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PauseQuiz;
