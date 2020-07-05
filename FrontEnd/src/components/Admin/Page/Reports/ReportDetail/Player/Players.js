import React from "react";
import "./Players.scss";
import { withRouter } from "react-router-dom";
import PopUp from "../../../../../../utils/PopUp/PopUp";
import QuizPop from "../Quiz/Quiz";
import NoteandCV from "../../../../../HR/Campaign/Interview/Control/CandidateOverview/NoteandCV";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,

} from "@fortawesome/free-solid-svg-icons";
import { faStickyNote } from "@fortawesome/free-regular-svg-icons";
import { connect } from "react-redux";
import * as actions from "../../../../../../redux/actions/index";
class ReportPlayers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowQuiz: false,
      isOpenPopup: false,
      isShowCV: false,
      active: 0,
      data: {
        candidate_id: 0,
        cv: "CV",
        description: "NOTE",
        interview_time: "TIME",
        user: {
          id: 0,
          name: "NAME",
          email: "EMAIL",
          phone: "PHONE",
        },
      }
    };
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

  toggleCVPopUp = () => {
    this.setState({
      isShowCV: !this.state.isShowCV
    });
  }
  onClickSaveNote = (description) => {
    let { data } = this.state;

    this.props.updateCandidates({ ...data, description });
  };

  componentDidMount() {
    this.setState({
      data: this.props.data
    })
  }
  render() {
    let { data, question_table } = this.props;
    console.log(data)
    let { isShowQuiz, isOpenPopup, isShowCV } = this.state;
    let { correctAnswer, inCorrectAnswer, unAttemptAnswer } = data;
    let questionLength = question_table.questions.length;
    let correctAccuracy = (data.correctAnswer / questionLength) * 100;
    let inCorrectAccuracy = (data.inCorrectAnswer / questionLength) * 100;
    let unAttemptAccuracy = (data.unAttemptAnswer / questionLength) * 100;
    return (
      <div
        className="report-detail-player-container container-fluid "

      >
        <div className="rd-player-row shadow-sm  d-flex flex-row row">
          <div className="rd-quiz-click row col-11 d-flex flex-row"
            onClick={!isOpenPopup ? this.togglePopUp : null}
          >
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
            <div className="rdp-accuracy-bar col-6 align-self-center">
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
            <div className="rdp-accuracy-rate col-2 align-self-center pl-0">
              {data.accuracy}%
          </div>
            <div className="rdp-accuracy-rate col-1 align-self-center">
              {data.accuracy >= question_table.bench_mark ? (
                <FontAwesomeIcon icon={faCheck} size="lg" color="#4caf50" />
              ) : (
                  <FontAwesomeIcon icon={faTimes} size="lg" color="red" />
                )}
            </div>

          </div>
          <div className="rd-note-click col-1"
            onClick={this.toggleCVPopUp}
          >
            <div className="rdp-accuracy-rate col-1 align-self-center ">
              <FontAwesomeIcon icon={faStickyNote} />
            </div>
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
        {isShowCV ? (
          <PopUp
            openPop={(open) => {
              setTimeout(() => {
                this.setState({
                  isShowCV: !open,
                });
              }, 150);
            }}
          >
            <NoteandCV
              openTab={this.state.active}
              data={data}
              onClickSaveNote={this.onClickSaveNote}
            />
          </PopUp>
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    updateCandidates: (candidate) => {
      dispatch(actions.updateCandidates(candidate));
    },
  };
};
//get data from redux
const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReportPlayers));
