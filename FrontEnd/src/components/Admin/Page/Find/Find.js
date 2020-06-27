import React from "react";

import "./Find.scss";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../../../../redux/actions/index";
import QuizThumbnail from "../../../../utils/QuizThumbnail/QuizThumbnail";
class AdminFind extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [
        {
          title: "",
          campaigns: [
            {
              question_table: {
                id: 0,
                code: 0,
                title: "",
                image: null,
                played: 0,

                questions: [],
                user: { name: "" },
              },
            },
          ],
        },
      ],
    };
  }
  componentDidMount() {
    this.props.getListTableBySubject();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log("subject", nextProps.subject.tablesBySubject);
    let { subject } = nextProps;

    this.setState({
      subjects: subject.tablesBySubject,
    });
  }
  showLimitTableBySubject = (campaigns) => {
    let arr = [];
    for (let i = 0; i < 5; i++) {
      if (typeof campaigns[i] !== "undefined") {
        arr.push(
          <QuizThumbnail
            key={i}
            image_index={i}
            data={campaigns[i].question_table}
          />
        );
      }
    }

    return arr;
  };
  showLimitSubject = () => {
    let { subjects } = this.state;
    let arr = [];
    for (let i = 0; i < 5; i++)
      if (typeof subjects[i] !== "undefined") {
        let listTable = this.showLimitTableBySubject(subjects[i].campaigns);
        arr.push(
          <div className="find-quiz-list-review" key={i}>
            <h3>{subjects[i].title}</h3>
            <div className="find-list-show-topic">{listTable}</div>
          </div>
        );
      }
    return arr;
  };

  render() {
    let quizthumbSubjectElm = this.showLimitSubject();

    return (
      <div className="ad-find-container">
        <h1>What will we teach today?</h1>

        <div className="find-all-quiz-list">
          {quizthumbSubjectElm}
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    getListTableBySubject: () => {
      dispatch(actions.getListTableBySubject());
    },
  };
};
const mapStateToProps = (state) => {
  return {
    subject: state.subject,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminFind));
