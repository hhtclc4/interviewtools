import React from "react";
import "./Quiz.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

class QuizPop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { data, questions } = this.props;
    let { correctAnswer, inCorrectAnswer, unAttemptAnswer } = data;
    let index = data.answer_records.length - 1;
    let questionLength = questions.length;
    let correctAccuracy = (data.correctAnswer / questionLength) * 100;
    let inCorrectAccuracy = (data.inCorrectAnswer / questionLength) * 100;
    let unAttemptAccuracy = (data.unAttemptAnswer / questionLength) * 100;
    let questionElm = data.answer_records[index].map((data, index) => {
      let questionText = `${index + 1} ${data.question.question}`;
      let answerElm = data.question.question_choices.map((answer) => {
        let choiceColor = "";
        //question unattempt
        if (answer.is_right === 1) choiceColor = "#00c985";
        if (data.question.type === 1) {
          if (data.question_choice.id === answer.id)
            if (data.question_choice.is_right === 1 && answer.is_right === 1)
              //question right
              choiceColor = "#00c985";
            else if (data.question_choice.is_right !== 1)
              //question wrong
              choiceColor = "#F14D76";
        } else if (data.question.type === 2) {
          if (data.multi_choice_id !== null)
            for (
              let i = 0;
              i < data.multi_choice.question_choices.length;
              i++
            ) {
              if (data.multi_choice.question_choices[i].id === answer.id)
                if (data.multi_choice.question_choices[i].is_right !== 1)
                  choiceColor = "#F14D76";
            }
        }

        return (
          <div
            className="choose-result"
            style={{ color: choiceColor }}
            key={answer.id}
          >
            <span className="mr-2">
              <FontAwesomeIcon
                icon={choiceColor === "#F14D76" ? faTimes : faCheck}
              />
            </span>
            {answer.answer}
          </div>
        );
      });
      return (
        <div className="qp-question-result" key={data.question.id}>
          <div className="question-text">{questionText}</div>
          {data.question.type === 3 ? (
            <div>
              <label>{data.answer_records[index].answer_text}</label>
              <p>{data.answer_records[index].hint}</p>{" "}
            </div>
          ) : (
            answerElm
          )}
        </div>
      );
    });
    return (
      <div className="quiz-pop-container">
        <div className="qp-player-overview">
          <div className="qp-player-ava">
            <img
              alt="ava"
              src={require("../../../../../../utils/images/icon.png")}
            />
          </div>
          <div className="qp-player-info">
            <div className="qp-player-name">tri ha</div>
          </div>
        </div>
        <div className="qp-player-result">
          <div className="result-bar">
            <div
              className="right-result"
              style={{ width: `${correctAccuracy}%` }}
            ></div>
            <div
              className="wrong-result"
              style={{ width: `${inCorrectAccuracy}%` }}
            ></div>
          </div>
          <div className="result-amount">
            <div className="right-amount">{correctAnswer}</div>
            <div className="wrong-amount">{inCorrectAnswer}</div>
          </div>
          <div className="result-accuracy">
            <div className="right-acc">{correctAccuracy}% correct</div>
            <div className="wrong-acc">{inCorrectAccuracy}% incorrect</div>
            <div className="unattempt-acc">{unAttemptAccuracy}% unattempt</div>
          </div>
        </div>
        <div className="qp-result-list">{questionElm}</div>
        <button onClick={this.props.togglePopUp}>Close</button>
      </div>
    );
  }
}

export default QuizPop;
