import React from "react";
import "./Candidate.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClock } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faInfo } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import * as actions from "../../../../redux/actions/index";
class InterviewsPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekDay: "",
      day: "",
      month: "",
      year: "",
      data: [
        {
          id: 0,
          name: "",
          date: "2020-01-01",
          time_from: "12:00:00",
          time_to: "12:00:00",

          campaign_id: "",
          group_candidates: [
            {
              user_id: 0,
              cv: "",
              description: "",
              interview_time: "12:00:00",
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
    this.props.showInterviews();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.interview,
    });
  }
  onClickHandler = (interview_id) => {
    let { data } = this.props;
    data.interview_id = interview_id;
    this.props.updateCandidatesToInterview(data);
    this.props.closePopup();
  };
  render() {
    let { data } = this.state;
    let interviewElm = data.map((interview) => {
      let jsDate = new Date(interview.date);
      let dtf = new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
      let [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(
        jsDate
      );

      let weekDay = jsDate.toString().split(" ");
      let date = `${weekDay[0]}, ${mo} ${da}th ${ye}`;
      return (
        <div key={interview.id} className="in-control-container-sm mr-3 mb-3">
          <div className="in-title p-2 d-flex flex-row ">
            <b className="mr-auto">{interview.name}</b>
            <button
              className="in-add-btn mr-1"
              onClick={() => this.onClickHandler(interview.id)}
            >
              <span>
                <FontAwesomeIcon icon={faPlus} className="mr-1" />
                ADD
              </span>
            </button>

            <button className="in-detail-btn">
              <span>
                <FontAwesomeIcon icon={faInfo} className="mr-1" />
                DETAIL
              </span>
            </button>
          </div>
          <div className="in-date-and-time p-1">
            <div className="in-date p-1 mb-1">
              <span>
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                {date}
              </span>
            </div>
            <div className="in-time p-1  ">
              <span>
                <FontAwesomeIcon icon={faClock} className="mr-1" />{" "}
                {interview.time_from} to {interview.time_to}
              </span>
            </div>
          </div>
          <div className="in-num p-2">{interview.group_candidates.length}</div>
        </div>
      );
    });
    //get date

    return (
      <div className="in-popup-container">
        <div className="row m-0" style={{ height: "100%", width: "100%" }}>
          <div className="col-sm-2"></div>
          <div className="col-md-8 d-flex flex-column justify-content-center">
            <div className="in-popup-inner d-flex flex-column">
              <div className="in-popup-header  d-flex flex-row p-3">
                <img
                  alt="interview-list"
                  src={require("../../images/Interviewlist.png")}
                  className="in-list-img mr-1"
                />
                <div className="in-popup-title">Interview List</div>
              </div>
              <div className="in-popup-body flex-grow-1">
                <div className="in-popup-list d-flex flex-row flex-wrap">
                  {interviewElm}
                </div>
              </div>
              <div className="in-popup-footer p-2">
                <button
                  onClick={this.props.closePopup}
                  className="in-close-btn float-right"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-2"></div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    showInterviews: () => {
      dispatch(actions.showInterviews());
    },
    updateCandidatesToInterview: (candidate) => {
      dispatch(actions.updateCandidatesToInterview(candidate));
    },
  };
};
//get data from redux
const mapStateToProps = (state) => {
  return {
    interview: state.interview,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(InterviewsPopup);
