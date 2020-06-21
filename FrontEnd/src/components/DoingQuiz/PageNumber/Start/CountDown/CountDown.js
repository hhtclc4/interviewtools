import React from "react";
import "./CountDown.scss";
class StartCountDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { step } = this.props;
    let stepElm = () => {
      if (step === 0) return <div className="go-animate">Go</div>;
      else return <div className="count-animate">{step}</div>;
    };
    return <div className="start-count-down">{stepElm()}</div>;
  }
}

export default StartCountDown;
