import React from "react";
import "./PreGame.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/index";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import QuizAttempt from "./QuizAttempt/QuizAttempt";
import Countdown from "../DoingQuiz/CountDown/CountDown";
import moment from "moment";

class PreGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      access: true,
      attempt_length: 0,
      isNotDoneYet: false,
      question_table: {
        title: "",
        image: "",
        questions: [],
        max_time: null,
      },
    };
  }
  componentDidMount() {
    let question_table_id = this.props.match.params.question_table_id;
    this.props.getListUserAttempt(question_table_id);
    this.props.showListQuestionAnswer(question_table_id);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    //console.log(nextProps);
    this.setState({
      data: nextProps.attempt.data,
      question_table: nextProps.questionTable,
      attempt_length: nextProps.attempt.data.length,
      access: nextProps.attempt.access,
    });
    if (nextProps.attempt.count !== 0) {
      this.setState({
        isNotDoneYet: true,
        access: false,
      });
    }
  }
  updateTime = (max_time) => {
    let id = this.props.match.params.question_table_id;
    this.props.updateTable({ id, max_time });
  };
  render() {
    let {
      data,
      question_table,
      attempt_length,
      access,
      isNotDoneYet,
    } = this.state;
    let question_table_id = this.props.match.params.question_table_id;
    let { history } = this.props;
    let then = "";
    if (question_table.max_time !== null) {
      if (question_table.max_time !== "00:00:00") {
        let nowArr = moment().format("HH:mm:ss").split(":");
        let addArr = question_table.max_time.split(":");
        let second = (parseInt(nowArr[2]) + parseInt(addArr[2])) % 60;
        let addSecond = parseInt(nowArr[2]) + parseInt(addArr[2]) >= 60 ? 1 : 0;
        let addMinute =
          parseInt(nowArr[1]) + parseInt(addArr[1]) + addSecond >= 60 ? 1 : 0;
        let minute =
          (parseInt(nowArr[1]) + parseInt(addArr[1]) + addSecond) % 60;
        then = `${
          parseInt(nowArr[0]) + parseInt(addArr[0]) - 7 + addMinute
        }:${minute}:${second}`;
      }
    }
    console.log(question_table);

    console.log("max", question_table.max_time);
    console.log(then);

    if (attempt_length && access && question_table.questions.length !== 0) {
      this.props.getCurrentRecord(
        question_table_id,
        attempt_length,
        question_table.questions.length
      );
    }
    let quizAttemptElm = data.map((attempt, index) => {
      return <QuizAttempt key={index} data={attempt} index={index} />;
    });
    return (
      <div className="pre-game-container">
        <div className="pre-game-nav">
          <button onClick={() => history.push(`/join`)}>
            <span>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </button>
        </div>
        <div className="pre-game-show-container">
          <div className="quiz-info-done">
            <div className="quiz-basic-info-container">
              <div className="quiz-basic-info">
                <img
                  className="quiz-image-sm"
                  alt="QuizImageSmall"
                  src={
                    question_table.image !== ""
                      ? question_table.image
                      : require("./images/thumbnail.jpg")
                  }
                />
                <div className="quiz-title-and-number">
                  <div className="quiz-title">{question_table.title}</div>
                  <div className="quiz-number-ques">
                    {question_table.questions.length} questions
                  </div>
                </div>
              </div>
            </div>

            <div className="attempt-group-container">{quizAttemptElm}</div>
          </div>
          <div className="player-config">
            <div className="practice-btn-group">
              <button
                onClick={() => history.push(`/game/${question_table_id}`)}
                disabled={question_table.max_time === "00:00:00" ? true : false}
                style={
                  question_table.max_time === "00:00:00"
                    ? { opacity: "60%" }
                    : null
                }
              >
                {isNotDoneYet ? "Resume Quiz" : "Do Quiz"}
              </button>
            </div>
            {/* <img
              style={{ width: "100%", margin: "30px auto" }}
              src={require("./images/no-settings.png")}
              alt="no-settings"
            /> */}
            <h3 style={{ textAlign: "center", color: "white" }}>
              {question_table.max_time !== null ? (
                <Countdown
                  timeTillDate={then}
                  timeFormat="HH:mm:ss "
                  updateTime={this.updateTime}
                />
              ) : null}
            </h3>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    getListUserAttempt: (question_table_id) => {
      dispatch(actions.getListUserAttempt(question_table_id));
    },
    showListQuestionAnswer: (question_table_id) => {
      dispatch(actions.showListQuestionAnswer(question_table_id));
    },
    getAttemptLength: (question_table_id) => {
      dispatch(actions.getAttemptLength(question_table_id));
    },
    getCurrentRecord: (question_table_id, attempt_id, questionLength) => {
      dispatch(
        actions.getCurrentRecord(question_table_id, attempt_id, questionLength)
      );
    },
    updateTable: (data) => {
      dispatch(actions.updateTable(data));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    attempt: state.attempt,
    questionTable: state.questionTable,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PreGame));
