import React from "react";
import "./DoingQuiz.scss";
import QuestionShow from "./QuestionShow/QuestionShow";
import PageNumber from "./PageNumber/PageNumber";
import PageScore from "./PageScore/PageScore";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./../../redux/actions/index";
import PageNumberStart from "./PageNumber/Start/Start";
import moment from "moment";
import Countdown from "./CountDown/CountDown";
let showQuestion;
let showPage;
let pageNumber;
let prevResult;
let wrong_answer = 0;
class DoingQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question_table_id: this.props.match.params.question_table_id,
      questions: [
        {
          id: 0,
          question: "",
          question_choices: [],
          time: 0,
        },
      ],
      data: [],
      count: 0,
      changePage: true,
      changeQuestion: false,
      step: 0,
      isDone: false,
      accessToPush: false,
      right_answer: 0,
      max_time: null,

      attempt_length: 0,
      access: true,
      isNotDoneYet: false,
    };
  }
  componentDidMount() {
    let { question_table_id } = this.state;
    pageNumber = this.state.count + 1;
    this.props.showListQuestionAnswer(question_table_id);
    this.props.getAttemptLength(question_table_id);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log("UNSAFE_componentWillReceiveProps", nextProps);
    this.setState({
      accessToPush: nextProps.accessToPush.push,
      questions: nextProps.questionTable.questions,
      attempt_length: nextProps.questionTable.attempt_length,
      access: nextProps.attempt.access,
      max_time: nextProps.questionTable.max_time,
    });
    if (nextProps.attempt.count !== 0 && this.state.access) {
      pageNumber = nextProps.attempt.count + 1;
      this.setState({
        isNotDoneYet: true,
        count: nextProps.attempt.count,
        access: false,
        right_answer: nextProps.attempt.right_answer,
      });
      wrong_answer = nextProps.attempt.wrong_answer;
    }
  }
  componentWillUnmount() {
    pageNumber = 0;
    clearTimeout(showPage);
  }
  recordAnswer = (
    question_id,
    question_choice,
    multi_choice,
    answer_text,
    type
  ) => {
    ///create data to send API
    let question_table_id = parseInt(this.props.match.params.question_table_id);
    let choice_id = 0;
    if (question_choice !== undefined) choice_id = question_choice.id;
    let id = this.state.attempt_length + 1;
    if (this.state.isNotDoneYet) id = this.state.attempt_length;
    let data = {
      id: id,
      question_table_id: question_table_id,
      question_id,
      choice_id,
      multi_choice: multi_choice,
      answer_text: answer_text,
      type,
    };
    if (question_id) {
      pageNumber += 1;
      // this.props.addAnswerRecord(data);
      console.log(data);
    }
  };
  doneQuestionHandler = (isChooseRight) => {
    clearTimeout(showQuestion);
    let right_answer = this.state.right_answer;

    prevResult = right_answer;

    if (isChooseRight) {
      right_answer += 1;
      this.setState({
        right_answer,
      });
    } else wrong_answer += 1;

    setTimeout(() => {
      this.setState({
        step: 3,
      });
    }, 1500);
  };
  showPageNumber = () => {
    let { isDone, step, right_answer, questions, attempt_length } = this.state;
    let questionsLength = 0;
    for (let i = 0; i < questions.length; i++)
      if (questions[i].type !== 3) questionsLength += 1;
    if (!isDone) {
      switch (step) {
        case 0:
          return (
            <PageNumberStart
              close={() => {
                this.setState({
                  step: 1,
                });
              }}
            />
          );
        case 1: {
          showPage = setTimeout(() => {
            this.setState({
              step: 2,
            });
            /////////////////////////////////////// speed of change page
          }, 1000);
          return (
            <PageNumber
              key={pageNumber}
              pageNumber={pageNumber <= questions.length ? pageNumber : "Done"}
            />
          );
        }
        case 2:
          return this.createQuestion();
        case 3:
          setTimeout(() => {
            this.setState({
              changeQuestion: true,
              changePage: true,
              step: 1,
            });
          }, 2800);
          clearTimeout(showQuestion);

          return (
            <PageScore
              key={pageNumber}
              right_answer={right_answer}
              questionsLength={questionsLength}
              prevResult={prevResult}
            />
          );
        default:
          return "";
      }
    } else {
      // all questions is completed
      let id = attempt_length + 1;
      if (this.state.isNotDoneYet) id = this.state.attempt_length;
      let state = this.state;
      state.isDone = false;
      state.changePage = false;
      this.props.resetAttemptRedux();
      let question_table_id = this.props.match.params.question_table_id;
      this.props.updateTableWithPlayed(question_table_id);
      this.props.doneAnswerRecord(id);
    }
  };
  createQuestion = () => {
    let { questions, count, isDone, changeQuestion, right_answer } = this.state;
    let state = this.state;
    //changeQuestion is not permitted(not click answer), show question
    if (changeQuestion === false) {
      showQuestion = setTimeout(() => {
        if (count < questions.length - 1 && isDone === false) {
          state.count += 1;
          prevResult = right_answer;
          wrong_answer += 1;
          this.setState({
            step: 3,
          });
        } else {
          this.setState({
            isDone: true,
            step: 3,
          });
        }
      }, questions[count].time * 1000);
    } else {
      //changeQuestion is permitted
      if (count < questions.length - 1 && isDone === false) {
        state.count += 1;
        this.setState({
          changeQuestion: false,
        });
      } else {
        this.setState({
          isDone: true,
          changeQuestion: false,
        });
      }
    }
    if (!isDone)
      return (
        <QuestionShow
          questionsLength={questions.length}
          key={count}
          index={count}
          question={questions[count]}
          doneQuestionHandler={this.doneQuestionHandler}
          recordAnswer={this.recordAnswer}
          right_answer={right_answer}
          wrong_answer={wrong_answer}
          onClickNextQuizHandler={this.onClickNextQuizHandler}
        />
      );
    else return <div></div>;
  };
  onClickNextQuizHandler = () => {
    prevResult = this.state.right_answer;
    wrong_answer += 1;

    this.setState({
      step: 3,
    });
  };
  updateTime = (max_time) => {
    let id = this.state.question_table_id;
    this.props.updateTable({ id, max_time });
  };
  render() {
    let {
      attempt_length,
      question_table_id,
      questions,
      access,
      accessToPush,
      max_time,
    } = this.state;
    let element = "";
    let then = "";

    if (accessToPush)
      this.props.history.push(`/pre-game/${question_table_id}/review`);
    else {
      if (attempt_length && access && questions.length !== 1) {
        this.props.getCurrentRecord(
          question_table_id,
          attempt_length,
          questions.length
        );
      }
      if (questions[0].id !== 0) {
        element = this.showPageNumber();
        if (max_time !== null) {
          if (max_time !== "00:00:00") {
            let nowArr = moment().format("HH:mm:ss").split(":");
            let addArr = max_time.split(":");
            let second = (parseInt(nowArr[2]) + parseInt(addArr[2])) % 60;
            let addSecond =
              parseInt(nowArr[2]) + parseInt(addArr[2]) >= 60 ? 1 : 0;
            let addMinute =
              parseInt(nowArr[1]) + parseInt(addArr[1]) + addSecond >= 60
                ? 1
                : 0;
            let minute =
              (parseInt(nowArr[1]) + parseInt(addArr[1]) + addSecond) % 60;
            then = `${
              parseInt(nowArr[0]) + parseInt(addArr[0]) - 7 + addMinute
              }:${minute}:${second}`;
          }
        }
      } else element = "";
    }
    return (
      <div className="doing-quiz-container">
        {element}
        <div className="count-down-section">
          {max_time !== null ? (
            <Countdown
              timeTillDate={then}
              timeFormat="HH:mm:ss"
              updateTime={this.updateTime}
              backgroundColor="transparent"
              from="DoingQuiz"
            />
          ) : null}
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    showListQuestionAnswer: (question_table_id) => {
      dispatch(actions.showListQuestionAnswer(question_table_id));
    },
    addAnswerRecord: (data) => {
      dispatch(actions.addAnswerRecord(data));
    },
    updateTableWithPlayed: (id) => {
      dispatch(actions.updateTableWithPlayed(id));
    },
    getAttemptLength: (question_table_id) => {
      dispatch(actions.getAttemptLength(question_table_id));
    },
    doneAnswerRecord: (attempt_length) => {
      dispatch(actions.doneAnswerRecord(attempt_length));
    },
    getCurrentRecord: (question_table_id, attempt_id, questionLength) => {
      dispatch(
        actions.getCurrentRecord(question_table_id, attempt_id, questionLength)
      );
    },
    resetAttemptRedux: () => {
      dispatch(actions.resetAttemptRedux());
    },
    updateTable: (data) => {
      dispatch(actions.updateTable(data));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    questionTable: state.questionTable,
    question: state.question,
    accessToPush: state.accessToPush,
    attempt: state.attempt,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DoingQuiz));
