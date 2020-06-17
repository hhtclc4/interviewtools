import React from "react";
import "./Start.scss";
import StartCountDown from "./CountDown/CountDown";
let count;
class PageNumberStart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 3,
    };
  }

  countDown = () => {
    let { step } = this.state;
    while (step >= -1) {
      let minus = step;
      minus -= 1;
      count = setTimeout(() => {
        this.setState({
          step: minus,
        });
      }, 1100);
      return <StartCountDown step={step} />;
    }
    clearTimeout(count);
  };

  render() {
    let countElm = this.countDown();
    return <div className="page-quiz-start">{countElm}</div>;
  }
}

export default PageNumberStart;
