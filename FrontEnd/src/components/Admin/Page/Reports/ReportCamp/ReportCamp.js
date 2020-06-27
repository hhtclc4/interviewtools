import React from "react";
import "./ReportCamp.scss";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { connect } from "react-redux";
import * as actions from "../../../../../redux/actions/index";
import {
  faDollarSign,
  // faPencilAlt,
  // faTrashAlt,
  faScroll,
  faClock,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
class ReportCamp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaign_id: this.props.match.params.campaign_id,
      campaign: {
        id: 0,
        title: "",
        subject_id: 0,
        level_id: 0,
        work_type_id: 0,
        salary: 0,
        user_id: 0,
        work_description: "",
        image: "",
        subjects: [{ id: 0, title: "" }],
      },
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
    let { campaign_id } = this.state;
    this.props.showCampaign(campaign_id);
    this.props.getCompletedInterviewsAPI(campaign_id);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      completedInterview: nextProps.completedInterview,
      campaign: nextProps.campaign,
    });
  }
  getDate = (data) => {
    let jsDate = new Date(data.date);
    let dtf = new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
    let [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(
      jsDate
    );
    let weekDay = jsDate.toString().split(" ");
    return `${weekDay[0]}, ${mo} ${da}th ${ye}`;
  };
  render() {
    let { history } = this.props;
    let { campaign_id, campaign, completedInterview } = this.state;
    let interviewElm = completedInterview.map((interview) => {
      let date = this.getDate(interview);

      return (
        <div
          key={interview.id}
          className="interview-report-container py-3" //1 component interview
          onClick={() => {
            localStorage.setItem("report", JSON.stringify(interview));
            localStorage.setItem("campaign", JSON.stringify(campaign));

            history.push(
              `/admin/reports/camp/${campaign_id}/report_detail/${interview.id}`
            );
          }}
        >
          <div className="interview-report-header row m-0  py-2">
            <div className="rc-partion-time col-sm">
              <span>
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                {date}
              </span>
            </div>
            <div className="rc-partion-name col-sm">{interview.name}</div>
            <div className="rc-partion-total-can col-sm">
              {interview.group_candidates.length}
            </div>
            <div className="rc-partion-acc col-md-5">
              <div className="max-acc-progress">
                <div
                  className="acc-progress"
                  style={{
                    width: `${interview.totalAccuracy}%`,
                    backgroundColor: interview.totalAccuracy,
                  }}
                >
                  {interview.totalAccuracy}{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="report-camp-container">
        <div className="report-camp-overview">
          <div className="campaign-overview-container d-flex flex-row p-2">
            <div className="co-company-logo align-self-center p-2">
              <div className="crop-comp-logo">
                <img
                  className="comp-logo"
                  alt="logo"
                  // src={
                  //     data.image !== null
                  //         ? data.image
                  //         : require(`../../../utils/campaign_img/campain_pic0.png`)
                  // }
                  src={
                    campaign.image !== null
                      ? campaign.image
                      : require(`../../../../../utils/campaign_img/campain_pic0.png`)
                  }
                />
              </div>
            </div>
            <div className="co-require-and-desc d-flex flex-column">
              <div className="co-title">
                {/* <p className="text-truncate">{data.title}</p> */}
                <p>{campaign.title}</p>
              </div>
              <div className="co-salary d-flex flex-row">
                <span className="co-adjust-icon d-flex flex-row justify-content-center">
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    size="sm"
                    color="#FD7E14"
                  />
                </span>
                <p>
                  {campaign.salary === 0
                    ? "Lương thỏa thuận"
                    : campaign.salary + " triệu"}
                </p>
              </div>

              <div className="co-job-desc d-flex flex-column">
                <p className="align-self-start" style={{ fontSize: "15px" }}>
                  <span className="mr-2">
                    <FontAwesomeIcon icon={faScroll} color="#fd7e14" />
                  </span>
                  Work description
                </p>
                {/* <Editor
                                    wrapperClassName="work-desc-wrapper"
                                    editorClassName="work-desc-editor"
                                    toolbarClassName="d-none"
                                    editorState={EditorState.createWithContent(textState)}
                                /> */}
              </div>
              <div className="co-subjects d-flex flex-row">
                {campaign.subjects.map((subject) => {
                  return (
                    <div key={subject.id} className="co-subject">
                      {subject.title}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="co-tag d-flex flex-column justify-content-around ">
              <div className="co-feature align-self-end">Hot</div>

              <div className="co-publish align-self-end"></div>
            </div>
            <div className="co-options d-flex flex-column pl-3 justify-content-around">
              {/* <button className="co-option-btn" onClick={this.onClickModifyHandler}>
                                <FontAwesomeIcon icon={faPencilAlt} size="lg" color="gray" />
                            </button>
                            <button className="co-option-btn">
                                <FontAwesomeIcon icon={faTrashAlt} size="lg" color="gray" />
                            </button> */}
            </div>
          </div>
        </div>
        <div className="report-camp-list">
          <div className="rc-list-title">Interviews list</div>
          <div className="rc-interview-container pt-3">
            <div className="rc-list-partion row">
              <div className="rc-partion-time col-sm ">
                <span>
                  <FontAwesomeIcon icon={faClock} /> Date
                </span>
              </div>
              <div className="rc-partion-name col-sm">Interview name</div>
              <div className="rc-partion-total-can col-sm">
                Total candidates
              </div>
              <div className="rc-partion-acc col-md-5">Accuracy</div>
            </div>
            <div className="completed-list-container">{interviewElm}</div>
            {/* )} */}
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  // connect to redux by function, load data from data base, this is step 2
  return {
    getCompletedInterviewsAPI: (campaign_id) => {
      dispatch(actions.getCompletedInterviewsAPI(campaign_id));
    },
    showCampaign: (campaign_id) => {
      dispatch(actions.showCampaign(campaign_id));
    },
  };
};
const mapStateToProps = (state) => {
  //connect to redux by props, loadded data store here, this is step 3
  return {
    campaign: state.campaign,
    completedInterview: state.completedInterview,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ReportCamp));
