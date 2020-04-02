import React from "react";
import "./RecruitThumbnail.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import history from "../../history";
class RecruitThumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postFeature: "none",
      data: {
        title: "",
        salary: 0,
        work_address: "",
        location: ""
      }
    };
  }

  componentDidMount() {
    let { data } = this.props;
    this.setState({
      data
    });
  }
  render() {
    let { data } = this.state;
    let { postFeature } = this.state;
    return (
      <div className="recruit-thumb-wrapper ">
        <div
          className="recruit-thumb-container"
          onClick={() => {
            localStorage.setItem("campaign_index", this.props.index);
            history.push("/detail_recruit");
          }}
        >
          <div className="re-crop-img">
            <img
              className="display-center"
              alt="re-post"
              src={require("../QuizThumbnail/images/thumbnail.jpg")}
            />
          </div>
          <div className="re-flat-info d-flex flex-row">
            <div className="re-salary d-flex flex-row">
              <span className="re-adjust-icon d-flex flex-row justify-content-center">
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
              <p>{data.location}</p>
            </div>
          </div>
          <div className="re-required-position">
            <b>{data.title}</b>
          </div>

          <div className="re-company-name">
            <p>{data.company_address}</p>
          </div>
          {postFeature === "new" ? (
            <div className="re-new-recruit"></div>
          ) : (
            <div className="re-hot-recruit"></div>
          )}
        </div>
      </div>
    );
  }
}

export default RecruitThumbnail;
