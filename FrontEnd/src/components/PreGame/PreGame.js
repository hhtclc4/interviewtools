import React from "react";
import "./PreGame.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/index";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import QuizAttempt from "./QuizAttempt/QuizAttempt";
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
              >
                {isNotDoneYet ? "Resume Quiz" : "Play"}
              </button>
            </div>
            <img
              style={{ width: "100%", margin: "30px auto" }}
              src={require("./images/no-settings.png")}
              alt="no-settings"
            />
            <h3 style={{ textAlign: "center", color: "white" }}>
              Setting comming soon
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
