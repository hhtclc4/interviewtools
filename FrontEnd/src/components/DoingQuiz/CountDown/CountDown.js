import moment from "moment";
import React from "react";
class Countdown extends React.Component {
  state = {
    hours: "00",
    minutes: "00",
    seconds: "00",
  };

  componentDidMount() {
    let { timeTillDate, timeFormat } = this.props;
    if (timeTillDate !== "") {
      this.interval = setInterval(() => {
        let then = moment(timeTillDate, timeFormat);
        let now = moment();
        let countdown = moment(then - now);
        let hours = countdown.format("HH");
        let minutes = countdown.format("mm");
        let seconds = countdown.format("ss");
        console.log(`${hours}:${minutes}:${seconds}`);

        if (countdown.format("HH:mm:ss") === "00:00:00") {
          clearInterval(this.interval);
          this.props.updateTime(`${hours}:${minutes}:${seconds}`);
          console.log("record");
        }
        this.setState({ hours, minutes, seconds });
      }, 1000);
    }
  }

  componentWillUnmount() {
    let { hours, minutes, seconds } = this.state;
    if (this.interval) {
      clearInterval(this.interval);
    }
    console.log("record");
    this.props.updateTime(`${hours}:${minutes}:${seconds}`);
  }

  render() {
    let { hours, minutes, seconds } = this.state;
    let hoursRadius = mapNumber(hours, 24, 0, 0, 360);
    let minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
    let secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

    if (!seconds) {
      return null;
    }

    return (
      <div>
        <h1>{this.props.timeTillDate === "" ? `Time Out` : `Countdown`}</h1>
        <div className="countdown-wrapper">
          {hours && (
            <div className="countdown-item">
              <SVGCircle radius={hoursRadius} />
              {hours}
              <span>hours</span>
            </div>
          )}
          {minutes && (
            <div className="countdown-item">
              <SVGCircle radius={minutesRadius} />
              {minutes}
              <span>minutes</span>
            </div>
          )}
          {seconds && (
            <div className="countdown-item">
              <SVGCircle radius={secondsRadius} />
              {seconds}
              <span>seconds</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Countdown;
let SVGCircle = ({ radius }) => (
  <svg className="countdown-svg">
    <path
      fill="none"
      stroke="#333"
      strokeWidth="4"
      d={describeArc(50, 50, 48, 0, radius)}
    />
  </svg>
);

// From stackoverflow: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  let angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  let start = polarToCartesian(x, y, radius, endAngle);
  let end = polarToCartesian(x, y, radius, startAngle);

  let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  let d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");

  return d;
}

// Stackoverflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
function mapNumber(number, in_min, in_max, out_min, out_max) {
  return (
    ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  );
}
