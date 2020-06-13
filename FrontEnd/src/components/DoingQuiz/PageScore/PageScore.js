import React from "react";
import "./PageScore.scss";
import { withRouter } from "react-router-dom";

class PageScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keepAccuracy: 0,
    };
  }

  accuracyColor = (accuracy) => {
    switch (true) {
      case accuracy <= 10:
        return "#ff0000";
      case accuracy <= 49:
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
    let { right_answer, questionsLength } = this.props;
    let accuracy = right_answer / questionsLength;
    let progressAnimation = `
    @keyframes changeWidthProcess {
      from {
          width: 0%;
      }
      to {
          width: ${accuracy * 100}%;
      }
    }`;
    return (
      <div className="score-show-container">
        <div className="progress-score-container">
          <div className="progress-score-outline">
            <div
              className="progress-animate"
              style={{
                width: `${accuracy * 100}%`,
                backgroundColor: `${this.accuracyColor(accuracy * 100)}`,
                progressAnimation,
                animation: "changeWidthProcess 0.4s ease 0.5s forwards;",
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PageScore);
