import React from "react";
import "./../Editor.scss";
import "font-awesome/css/font-awesome.min.css";
import { faSearch, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import * as actions from "../../../../redux/actions/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QuizOverview from "./QuizOverview";
import QuestionList from "./QuestionList";
import Swal from "sweetalert2";

class Teleport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "default name",
      tableArr: [
        {
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
            name: ""
          }
        }
      ],
      questionArr: [
        {
          id: 0,
          question: "",
          type: 0,
          time: 30,
          question_choices: [
            {
              id: 0,
              answer: "",
              is_right: 0
            }
          ]
        },
        {
          id: -1,
          question: "",
          type: 0,
          time: 30,
          question_choices: [
            {
              id: 0,
              answer: "",
              is_right: 0
            }
          ]
        }
      ],
      activeChild: -1
    };
  }
  componentDidMount() {
    let { title } = this.props;
    this.setState({
      title: title
    });
    this.props.teleportQuestionAndAnswersAPI(title);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.teleport.length)
      this.setState({
        tableArr: [...nextProps.teleport],
        questionArr: [...nextProps.teleport[0].questions]
      });
    else
      Swal.fire({
        position: "top",
        type: "warning",
        title: "None quiz found !!",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false
      });
  }
  onClickGenerateQuestionHandler = questions => {
    this.setState({
      questionArr: [...questions]
    });
  };
  onChangeSearchHandler = event => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({
      [name]: value
    });
  };
  onClickSearchHandler = () => {
    this.props.teleportQuestionAndAnswersAPI(this.state.title);
  };

  callbackFromChild = activeChild => {
    this.setState({
      activeChild: activeChild
    });
  };
  render() {
    let { title, tableArr, questionArr, activeChild } = this.state;
    let defaultActive = tableArr[0].id;
    let tableElm = tableArr.map(quiz => {
      return (
        <QuizOverview
          quiz={quiz}
          key={quiz.id}
          onClickGenerateQuestionHandler={this.onClickGenerateQuestionHandler}
          parentCallBack={this.callbackFromChild}
          activeChild={activeChild === -1 ? defaultActive : activeChild}
        />
      );
    });

    return (
      <div className="teleport-container">
        <div className="teleport-inner d-flex flex-column">
          <div className="teleport-header sticky-top d-flex flex-row">
            <div className="position-relative d-flex flex-row flex-grow-1">
              <input
                className="default-by-name-input"
                type="text"
                value={title}
                name="title"
                onChange={this.onChangeSearchHandler}
              />
              <FontAwesomeIcon
                size="lg"
                icon={faSearch}
                style={{ left: "-28px" }}
                className="position-relative align-self-center"
                onClick={this.onClickSearchHandler}
              />
            </div>
            <button
              className="close-teleport-btn"
              onClick={this.props.closePopup}
            >
              <FontAwesomeIcon icon={faArrowRight} size="2x" />
            </button>
          </div>
          <div className="teleport-body flex-grow-1 d-flex flex-row pl-2 pt-2">
            <div className="teleport-quiz-list pb-2 pr-2">
              <p>
                Showing the result of <b>{title}</b>
              </p>
              {tableArr.length ? tableElm : null}
            </div>
            {/* ///////////////// question/////////////
////////////////////////////
/////////////////////////////// */}
            <div className="teleport-question-of-quiz flex-grow-1 p-2">
              {questionArr[0].id !== 0 ? (
                <QuestionList
                  question_table_id={this.props.match.params.question_table_id}
                  questionArr={questionArr}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  // connect to redux by function, load data from data base, this is step 2
  return {
    teleportQuestionAndAnswersAPI: title => {
      dispatch(actions.teleportQuestionAndAnswersAPI(title));
    }
  };
};
const mapStateToProps = state => {
  //connect to redux by props, loadded data store here, this is step 3
  return {
    teleport: state.teleport
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Teleport);
