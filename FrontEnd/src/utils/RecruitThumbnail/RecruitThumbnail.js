import React from "react";
import "./RecruitThumbnail.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
class RecruitThumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postFeature: "none",
      data: {
        id: 0,
        title: "",
        subject_id: 0,
        level_id: 0,
        work_type_id: 0,
        salary: 0,
        user_id: 0,
        work_description: "",
        status: true,
        subjects: [
          {
            id: 0,
            title: "",
          },
        ],
        user: {
          name: "",
          email: "",
          phone: "",
        },
        level: {
          id: 0,
          name: "",
        },
        work_type: {
          id: 0,
          name: "",
        },
        interviews: [
          {
            id: 0,
            date: "2020-01-01",
            time_from: "12:00:00",
            time_to: "12:00:00",
          },
        ],
      },
    };
  }

  componentDidMount() {
    let { data } = this.props;
    this.setState({
      data,
    });
    console.log(data);
  }

  render() {
    let { image_index, role } = this.props;
    let { postFeature, data } = this.state;

    return (
      <div className="recruit-thumb-wrapper mr-1 ml-1">
        <div
          className="recruit-thumb-container"
          onClick={() => this.props.onClick(data.id)}
        >
          <div className="re-crop-img">
            <img
              className="display-center"
              alt="re-post"
              src={
                data.image !== null
                  ? data.image
                  : require(`../campaign_img/campain_pic${image_index % 7}.png`)
              }
            />
          </div>
          <div className="re-flat-info d-flex flex-row">
            <div className="re-salary d-flex flex-row text-truncate pr-1">
              <span className="re-adjust-icon d-flex flex-row justify-content-center ">
                <FontAwesomeIcon
                  icon={faDollarSign}
                  size="sm"
                  color="#FD7E14"
                />
              </span>
              <p>
                {data.salary === 0
                  ? "Lương thỏa thuận"
                  : data.salary + " triệu"}
              </p>
            </div>
            <div className="re-destination d-flex flex-row">
              <span className="re-adjust-icon d-flex flex-row justify-content-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} color="#FD7E14" />
              </span>
              <p>TP.HCM</p>
            </div>
          </div>
          <div className="re-required-position text-truncate">
            <b>{data.title}</b>
          </div>

          <div className="re-company-name">
            <p>Google</p>
          </div>
          {postFeature === "new" ? (
            <div className="re-new-recruit"></div>
          ) : (
            <div className="re-hot-recruit"></div>
          )}
          <div className="re-diff p-2">
            {role === "interviewer" ? "See Detail" : "See Job"}
            {role === "interviewer" ? data.interviewDateLeft : null}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RecruitThumbnail);
