import React from "react";
import "./Reports.scss";
import { withRouter } from "react-router-dom";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ReportQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { history, data } = this.props;

    return (
      <div
        className="report-quiz-container container"
        onClick={() => {
          history.push(`/admin/reports/camp/${data.id}`);
        }}
      >
        <div className="rq-row row">
          <div className="rq-name col-sm text-truncate">
            {data.question_table.title}
          </div>
          <div className="rq-players col-sm">{data.question_table.played}</div>
          <div className="rq-accuracy col-sm">{data.title}</div>
          <div className="rq-option col-sm">
            {data.status ? (
              <FontAwesomeIcon icon={faCheck} size="lg" color="#4caf50" />
            ) : (
              <FontAwesomeIcon icon={faTimes} size="lg" color="red" />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ReportQuiz);
