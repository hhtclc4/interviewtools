import React from "react";
import "./HostGame.scss";
import { Menu, Dropdown, Button } from "antd";
import { Icon } from "@ant-design/compatible";
import "antd/dist/antd.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../../../../../../redux/actions/index";
class QuizControlHostGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: null,
      title: "",
      questions: [
        {
          time: 0,
        },
      ],
      listDay: [
        {
          key: "",
          name: "",
        },
      ],
      selectDay: {
        key: "",
        name: "",
      },
      selectHour: "0",
      selectMinute: "0",
    };
  }
  componentDidMount() {
    let question_table_id = parseInt(this.props.match.params.question_table_id);
    this.props.showListQuestionAnswer(question_table_id);
  }
  onClickGenerateCodeHandler = () => {
    let question_table_id = parseInt(this.props.match.params.question_table_id);
    let { selectHour, selectMinute } = this.state;
    let max_time = `${selectHour}:${selectMinute}`;
    this.props.generateCode({ id: question_table_id, max_time });
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.questionTable,
    });
  }
  orderNumber = (number) => {
    switch (number) {
      case 1:
        return `${number}st`;
      case 2:
        return `${number}nd`;
      case 3:
        return `${number}rd`;
      default:
        return `${number}th`;
    }
  };
  getHour = () => {
    let listHour = [];
    for (let i = 0; i <= 5; i++) listHour.push(`${i}`);
    return listHour;
  };
  getMinute = () => {
    let list = [];
    for (let i = 0; i <= 60; i += 5) list.push(`${i}`);
    return list;
  };
  handleMenuHourClick = (event, listHour) => {
    let selectName = listHour.find((item) => item === event.key);
    this.setState({
      selectHour: selectName,
    });
  };
  handleMenuMinuteClick = (event, listMinute) => {
    let selectName = listMinute.find((item) => item === event.key);
    this.setState({
      selectMinute: selectName,
    });
  };
  render() {
    let { code, selectHour, selectMinute, title, questions } = this.state;
    let listHour = this.getHour();
    let listMinute = this.getMinute();
    console.log(this.state);
    let totalHour = 0;
    let totalMinute = 0;
    let totalSecond = 0;

    questions.forEach((question) => {
      totalSecond += question.time;
      if (totalSecond >= 60) {
        totalMinute += 1;
        let temp = totalSecond % 60;
        totalSecond = temp;
      }
    });
    const hour = (
      <Menu onClick={(event) => this.handleMenuHourClick(event, listHour)}>
        {listHour.map((hour) => {
          return <Menu.Item key={hour}>{hour}</Menu.Item>;
        })}
      </Menu>
    );
    const minute = (
      <Menu onClick={(event) => this.handleMenuMinuteClick(event, listMinute)}>
        {listMinute.map((minute) => {
          return <Menu.Item key={minute}>{minute}</Menu.Item>;
        })}
      </Menu>
    );
    return (
      <div className="quiz-control-host-game-container">
        <div className="quiz-name">{title}</div>
        <div className="quiz-num">{questions.length} questions</div>
        <div className="quiz-time-left">
          Total Question Time is ~ {totalHour}h:{totalMinute}m:{totalSecond}s
        </div>

        <div className="quiz-step-text">
          Time that should complete the quiz is:
        </div>

        <div className="quiz-end-hour-minute">
          <div className="hour">
            <Dropdown overlay={hour} trigger={["click"]}>
              <Button style={{ width: "100px" }}>
                <Icon type="clock" />
                {selectHour} <Icon type="down" />
              </Button>
            </Dropdown>
            Hour:
          </div>
          <div className="minute">
            <Dropdown overlay={minute} trigger={["click"]}>
              <Button style={{ width: "100px" }}>
                {selectMinute} <Icon type="down" />
              </Button>
            </Dropdown>
            Minute
          </div>
        </div>

        <div className="quiz-hosting-btn">
          <button onClick={this.onClickGenerateCodeHandler}>Host Quiz</button>
        </div>

        <div className="generated-code-container">
          {code !== null ? code : "------"}
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    generateCode: (data) => {
      dispatch(actions.generateCode(data));
    },
    showListQuestionAnswer: (question_table_id) => {
      dispatch(actions.showListQuestionAnswer(question_table_id));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    questionTable: state.questionTable,
    user: state.user,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(QuizControlHostGame));
