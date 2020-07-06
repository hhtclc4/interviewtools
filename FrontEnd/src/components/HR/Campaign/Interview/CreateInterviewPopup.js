import React from "react";
import "./Interview.scss";
import { Menu, Dropdown, Button } from "antd";
import { withRouter } from "react-router-dom";
import { Icon } from "@ant-design/compatible";

import { connect } from "react-redux";
import * as actions from "../../../../redux/actions/index";
class InterviewPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listDay: [
        {
          key: "",
          name: "",
        },
      ],
      selectDate: {
        key: "",
        name: "",
      },
      time_from: {
        selectHour: "12",
        selectMinute: "00",
      },
      time_to: {
        selectHour: "12",
        selectMinute: "00",
      },
      name: "",
    };
  }
  componentDidMount() {
    let listDay = this.getDay();
    this.setState({
      listDay: listDay,
      selectDate: listDay[1],
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
    for (let i = 1; i <= 24; i++) listHour.push(`${i}`);
    return listHour;
  };
  getDay = () => {
    const monthNames = [
      0,
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let select = [];
    let d = new Date();
    let begin = d.getDate();
    for (let i = begin; i < begin + 10; i++) {
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let daysInMonth = new Date(year, month, 0).getDate();
      if (i <= daysInMonth)
        select.push({
          key: `${year}-${month}-${i}`,
          name: `${monthNames[month]} ${this.orderNumber(i)}`,
        });
      else {
        let j = i - daysInMonth;
        if (month === 12) {
          year++;
          month = 1;
        } else month++;
        select.push({
          key: `${year}-${month}-${j}`,
          name: `${monthNames[month]} ${this.orderNumber(j)}`,
        });
      }
    }
    return select;
  };
  handleMenuDayClick = (event) => {
    let { listDay } = this.state;
    //get key and name in list day
    let select = listDay.find((item) => item.key === event.key);
    this.setState({
      selectDate: select,
    });
  };

  handleMenuHourClick = (event, listHour, type) => {
    let { time_from, time_to } = this.state;

    let selectName = listHour.find((item) => item === event.key);
    if (type === "from") {
      this.setState({
        time_from: {
          ...time_from,
          selectHour: selectName,
        },
      });
      if (parseInt(event.key) > parseInt(time_to.selectHour)) {
        this.setState({
          time_to: {
            ...time_to,
            selectHour: event.key,
          },
        });
      }
    } else if (type === "to") {
      this.setState({
        time_to: {
          ...time_to,
          selectHour: selectName,
        },
      });

      if (parseInt(event.key) < parseInt(time_from.selectHour)) {
        this.setState({
          time_from: {
            ...time_from,
            selectHour: event.key,
          },
        });
      }
    }
  };
  handleMenuMinuteClick = (event, listMinute, type) => {
    let { time_from, time_to } = this.state;

    let selectName = listMinute.find((item) => item === event.key);
    if (type === "from") {
      this.setState({
        time_from: {
          ...time_from,
          selectMinute: selectName,
        },
      });
    } else if (type === "to") {
      this.setState({
        time_to: {
          ...time_to,
          selectMinute: selectName,
        },
      });
    }
  };

  onChangeInputHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSaveHandler = () => {
    let { name, selectDate, time_from, time_to } = this.state;
    let data = {
      name,
      date: selectDate.key,
      time_from: `${time_from.selectHour}:${time_from.selectMinute}`,
      time_to: `${time_to.selectHour}:${time_to.selectMinute}`,
      campaign_id: this.props.campaign_id,
    };
    this.props.createInterview(data);
    this.props.closePopup();
  };
  render() {
    let { selectDate, listDay, time_from, time_to, name } = this.state;
    let listHour = this.getHour();
    let listMinute = ["00", "15", "30", "45"];
    let day = (
      <Menu onClick={this.handleMenuDayClick}>
        {listDay.map((item) => {
          return <Menu.Item key={item.key}>{item.name}</Menu.Item>;
        })}
      </Menu>
    );
    const hourFrom = (
      <Menu
        onClick={(event) => this.handleMenuHourClick(event, listHour, "from")}
      >
        {listHour.map((hour) => {
          return <Menu.Item key={hour}>{hour}</Menu.Item>;
        })}
      </Menu>
    );
    const minuteFrom = (
      <Menu
        onClick={(event) =>
          this.handleMenuMinuteClick(event, listMinute, "from")
        }
      >
        {listMinute.map((minute) => {
          return <Menu.Item key={minute}>{minute}</Menu.Item>;
        })}
      </Menu>
    );
    const hourTo = (
      <Menu
        onClick={(event) => this.handleMenuHourClick(event, listHour, "to")}
      >
        {listHour.map((hour) => {
          return <Menu.Item key={hour}>{hour}</Menu.Item>;
        })}
      </Menu>
    );
    const minuteTo = (
      <Menu
        onClick={(event) => this.handleMenuMinuteClick(event, listMinute, "to")}
      >
        {listMinute.map((minute) => {
          return <Menu.Item key={minute}>{minute}</Menu.Item>;
        })}
      </Menu>
    );
    // console.log(this.state);
    return (
      <div className="interview-popup-container">
        <div className="interview-popup-inner container-fluid">
          <div className="row " style={{ height: "100%" }}>
            <div className="col-md-3"></div>
            <div className="col-lg-6 d-flex flex-column justify-content-around">
              <div className="interview-popup-content p-3">
                <div className="interview-popup-header d-flex flex-row">
                  <img
                    alt="interview"
                    src={require("../../images/Interview.png")}
                    style={{ width: "60px", marginRight: "5px" }}
                  />
                  <h4 className="align-self-center" style={{ margin: "0" }}>
                    Create new interview period
                  </h4>
                </div>
                <div className="create-new-interview-period d-flex flex-column justify-content-between p-3 flex-wrap">
                  <div className="cni-name mb-2 mr-2">
                    <p className="cni-title">Set interview name</p>
                    <input
                      onChange={this.onChangeInputHandler}
                      name="name"
                      value={name}
                      className="interview-period-attribute"
                      placeholder="Enter interview name..."
                    />
                  </div>
                  <div className="cni-time mb-2 mr-2 ">
                    <p className="cni-title">Pick interview time</p>
                    <div className="cin-time-attribute d-flex flex-row  justify-content-between">
                      <div className="cni-time-day">
                        <Dropdown
                          overlay={day}
                          trigger={["click"]}
                          className="mr-1"
                        >
                          <Button style={{ top: "0" }}>
                            <Icon type="calendar" /> {selectDate.name}
                            <Icon type="down" />
                          </Button>
                        </Dropdown>
                      </div>

                      <div className="cni-from d-flex flex-row">
                        <p className="mt-1 mr-1">Time from </p>

                        <div className="cni-time-hour">
                          <Dropdown overlay={hourFrom} trigger={["click"]}>
                            <Button style={{ top: "0" }}>
                              {time_from.selectHour} <Icon type="down" />
                            </Button>
                          </Dropdown>
                        </div>
                        <p>:</p>
                        <div className="minute">
                          <Dropdown overlay={minuteFrom} trigger={["click"]}>
                            <Button style={{ top: "0" }}>
                              {time_from.selectMinute} <Icon type="down" />
                            </Button>
                          </Dropdown>
                        </div>
                      </div>

                      <div className="cni-to d-flex flex-row">
                        <p className="mt-1 mr-1">Time to </p>

                        <div className="cni-time-hour">
                          <Dropdown overlay={hourTo} trigger={["click"]}>
                            <Button style={{ top: "0" }}>
                              {time_to.selectHour} <Icon type="down" />
                            </Button>
                          </Dropdown>
                        </div>
                        <p>:</p>
                        <div className="minute">
                          <Dropdown overlay={minuteTo} trigger={["click"]}>
                            <Button style={{ top: "0" }}>
                              {time_to.selectMinute} <Icon type="down" />
                            </Button>
                          </Dropdown>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="in-pop-close-btn float-right"
                  onClick={this.props.closePopup}
                >
                  Close
                </button>
                <button
                  className="in-pop-create-btn float-right "
                  style={{ marginRight: "5px" }}
                  onClick={this.onSaveHandler}
                >
                  Create
                </button>
              </div>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    );
  }
}

//send action to redux
const mapDispatchToProps = (dispatch, props) => {
  return {
    createInterview: (data) => {
      dispatch(actions.createInterview(data));
    },
  };
};
//get data from redux

export default connect(null, mapDispatchToProps)(withRouter(InterviewPopup));
