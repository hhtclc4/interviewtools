import React from "react";
import "./../Editor.scss";
import "font-awesome/css/font-awesome.min.css";
import { faUser, faBookmark, faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class QuizOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quiz: {
        id: 0,
        title: "",
        questions: [],
        image: null,
        subject: {
          id: 0,
          title: ""
        },
        grade_begin: null,
        grade_end: null,
        user: {
          first_name: "",
          last_name: ""
        }
      },
      active: 0,
    };
  }
  componentDidMount() {
    let { quiz } = this.props;
    this.setState({
      quiz: quiz
    });
  }
  onClickGenerateQuestionHandler = questions => {
    let change = this.state.quiz;
    change.questions = questions;
  };

  sendActive = (activeId) => {
    this.props.parentCallBack(activeId);
  }
  render() {
    let { quiz, activeChild } = this.props;
    let userName = `${quiz.user.first_name} ${quiz.user.last_name}`;

    return (
      <div
        key={quiz.id}
        id={quiz.id}
        className="teleport-quiz-overview d-flex flex-column"
        onClick={() => {
          this.props.onClickGenerateQuestionHandler(quiz.questions);
          this.sendActive(quiz.id);
        }}
        style={activeChild === quiz.id ? { backgroundColor: '#f2f2f2' } : { backgroundColor: 'white' }}

      >
        <input className="for-focus" />
        <div className="d-flex flex-row flex-grow-1">
          <img
            src={
              quiz.image === null
                ? require("./../images/print.png")
                : quiz.image
            }
            alt="quiz-ava"
            className="mr-2"
          />
          <div>{quiz.title}</div>
        </div>
        <div className="d-flex flex-row">
          <div className="mr-2 text-truncate" style={{ flexBasis: "33%" }}>
            <FontAwesomeIcon icon={faUser} size="sm" className="mr-2" />
            {userName}
          </div>
          <div className="mr-2 text-truncate" style={{ flexBasis: "33%" }}>
            <FontAwesomeIcon icon={faBookmark} size="sm" className="mr-2" />
            {quiz.subject.title}
          </div>
          <div className="mr-2 text-truncate" style={{ flexBasis: "33%" }}>
            <FontAwesomeIcon icon={faBook} size="sm" className="mr-2" />
            {quiz.grade_begin}
          </div>
        </div>
      </div>
    );
  }
}

export default QuizOverview;
