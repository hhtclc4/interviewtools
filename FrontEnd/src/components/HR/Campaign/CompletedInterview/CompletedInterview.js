import React from "react";
import "./CompletedInterview.scss";
import InterviewReport from "./Report/Report";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { connect } from "react-redux";
import * as actions from "../../../../redux/actions/index";
import { withRouter } from "react-router-dom";

class CompletedInterview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaign_id: this.props.match.params.campaign_id,

      completedInterview: [
        {
          id: 0,
          name: "",
          date: "2020-01-01",
          time: "12:00:00",
          campaign_id: "",
          group_candidates: [
            {
              candidate_id: 0,
              cv: "",
              description: "",
              interview_time: "12:00:00",
              answer_records: [],
              campaign: {
                benchmark: 70,
              },
              user: {
                id: 0,
                name: "",
                email: "",
                phone: "",
              },
            },
          ],
        },
      ],
    };
  }
  componentDidMount() {
    // let { campaign_id } = this.state;
    this.props.getCompletedInterviews();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log("get Completed Interviews", nextProps.completedInterview);
    this.setState({
      completedInterview: [...nextProps.completedInterview],
    });
  }

  accuracyColor = (accuracy) => {
    switch (true) {
      case accuracy <= 10:
        return "#ff0000";
      case accuracy <= 55:
        return "#f5a623";
      case accuracy <= 80:
        return "#99cc00";
      case accuracy <= 100:
        return "#4caf50";
      default:
        return "";
    }
  };

  render() {
    let { completedInterview } = this.state;
    let reportInterviewElm = completedInterview.map((interview) => {
      return <InterviewReport key={interview.id} data={interview} />;
    });

    return (
      <div className="completed-interview-container pt-3">
        {completedInterview[0].id === 0 ? (
          <div>
            <h1>None interviews completed</h1>
          </div>
        ) : (
          <div>
            <div className="completed-list-partion d-flex flex-row justify-content-between px-2">
              <div className="in-partion-time">
                <span>
                  <FontAwesomeIcon icon={faClock} /> Date
                </span>
              </div>
              <div className="in-partion-name ">Interview name</div>
              <div className="in-partion-total-can">Total candidates</div>
              <div className="in-partion-acc">Accuracy</div>
            </div>
            <div className="completed-list-container">{reportInterviewElm}</div>
          </div>
        )}
      </div>
    );
  }
}
//send action to redux
const mapDispatchToProps = (dispatch, props) => {
  return {
    getCompletedInterviews: () => {
      dispatch(actions.getCompletedInterviews());
    },
  };
};
//get data from redux
const mapStateToProps = (state) => {
  return {
    completedInterview: state.completedInterview,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CompletedInterview));
