import React from "react";
import "./PageScore.scss";
import { withRouter } from "react-router-dom";
import GrowAccuracyTick from "./Tick";

class PageScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accuracy: 0,
    };
  }

  accuracyColor = (accuracy) => {
    switch (true) {
      case accuracy <= 9:
        return "#BF1500";
      case accuracy <= 19:
        return "#BC4200";
      case accuracy <= 29:
        return "#BA6D01";
      case accuracy <= 39:
        return "#B89601";
      case accuracy <= 49:
        return "#ACB502";
      case accuracy <= 59:
        return "#81B302";
      case accuracy <= 69:
        return "#56B103";
      case accuracy <= 79:
        return "#52B25B";
      case accuracy <= 89:
        return "#43C868";
      case accuracy <= 99:
        return "#33DE75";
      case accuracy === 100:
        return "#24F583";
      default:
        return "";
    }
  };

  render() {
    let { right_answer, questionsLength, prevResult } = this.props;
    console.log("prev", prevResult);
    console.log("new", right_answer);
    let { accuracy } = this.state;
    let preAccuracy = Math.ceil((prevResult / questionsLength) * 100);
    accuracy = Math.ceil((right_answer / questionsLength) * 100);

    let styleSheet = document.styleSheets[0];

    let animationName = `changeWidthProcess`;

    let progressAnimation = `@-webkit-keyframes ${animationName} {
      0% {
          width: ${preAccuracy}%;
          background-color: ${this.accuracyColor(preAccuracy)};
          border-right: 5px solid red;
      }
      20% {
        box-shadow: -60px 0px 25px -25px #fff inset;
      }

      60% {
        box-shadow: -60px 0px 25px -25px #fff inset;
      }

      80% {
          box-shadow: -60px 0px 25px -25px #fff inset;
      }

      100%{
        width: ${accuracy}%;
        background-color: ${this.accuracyColor(accuracy)}
      }
    }
    `;

    styleSheet.insertRule(progressAnimation, styleSheet.cssRules.length);

    let animationStyle = {
      width: `${preAccuracy}%`,
      animationName: animationName,
      animationTimingFunction: "ease",
      animationDuration: "2s",
      animationDelay: "0s",
      animationIterationCount: 1,
      animationDirection: "normal",
      animationFillMode: "forwards",
    };
    return (
      <div className="score-show-container">
        <div className="progress-score-container">
          <div className="progress-score-outline">
            <div className="progress-animate" style={animationStyle}>
              <GrowAccuracyTick prevResult={preAccuracy} accuracy={accuracy} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PageScore);
