import React from "react";
import "./../Editor.scss";
import "font-awesome/css/font-awesome.min.css";
import {
  faSearch,
  faArrowRight,
  faUser,
  faBookmark,
  faBook,
  faCircle
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import * as actions from "../../../../redux/actions/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class Teleport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
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
        }
      ]
    };
  }
  componentDidMount() {
    let { questionArr } = this.props;
    this.setState({
      questions: questionArr
    });
  }
  render() {
    let { questionArr } = this.props;
    let questionElm = [];
    for (let i = 0; i < questionArr.length; i++) {
      let answerElm = questionArr[i].question_choices.map(answer => {
        return (
          <div key={answer.id} className="cho-content">
            <span>
              <FontAwesomeIcon
                icon={faCircle}
                color={answer.is_right ? "#00C985" : "#F14D76"}
                size="lg"
              />
              <span>{answer.answer}</span>
            </span>
          </div>
        );
      });
      questionElm.push(
        <div
          key={questionArr[i].id}
          className="teleport-single-question my-2 d-flex flex-column p-2"
        >
          <div>
            <p>
              <span>{i + 1}. </span>
              {questionArr[i].question}
            </p>
          </div>
          <div className="position-relative">
            <hr />
            <p
              className="position-absolute p-1"
              style={{
                backgroundColor: "white",
                top: "12%",
                left: "10px",
                width: "fit-content",
                fontSize: "12px"
              }}
            >
              answer choices
            </p>
          </div>
          <div className="teleport-question-choice-list d-flex flex-row flex-wrap">
            {answerElm}
          </div>
        </div>
      );
    }

    return <div>{questionElm}</div>;
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
