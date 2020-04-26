import React from "react";
import "./CampaignOverview.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faMapMarkerAlt,
  faPencilAlt,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";

class CampaignOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      },
    };
  }
  componentDidMount() {
    let { data } = this.props;
    this.setState({
      data,
    });
  }
  onClickModifyHandler = () => {
    let { data } = this.state;
    this.props.history.push(`/campaign/${data.id}`);
  };
  render() {
    let { data } = this.state;

    return (
      <div className="campaign-overview-container d-flex flex-row p-2">
        <div className="co-company-logo align-self-center p-2">
          <div className="crop-comp-logo">
            <img
              className="comp-logo"
              alt="logo"
              src={require("../images/comp-logo.png")}
            />
          </div>
        </div>
        <div className="co-require-and-desc d-flex flex-column">
          <div className="co-title">
            <p className="text-truncate">{data.title}</p>
          </div>
          <div className="co-salary d-flex flex-row">
            <span className="co-adjust-icon d-flex flex-row justify-content-center">
              <FontAwesomeIcon icon={faDollarSign} size="sm" color="#FD7E14" />
            </span>
            <p>
              {data.salary === 0 ? "Lương thỏa thuận" : data.salary + " triệu"}
            </p>
          </div>

          <div className="co-job-desc d-flex align-items-center">{data.work_description}</div>
          <div className="co-subjects d-flex flex-row">
            {data.subjects.map((subject) => {
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

          <div className="co-publish align-self-end">12 hours ago</div>
        </div>
        <div className="co-options d-flex flex-column pl-3 justify-content-around">
          <button className="co-option-btn" onClick={this.onClickModifyHandler}>
            <FontAwesomeIcon icon={faPencilAlt} size="lg" color="gray" />
          </button>
          <button className="co-option-btn">
            <FontAwesomeIcon icon={faTrashAlt} size="lg" color="gray" />
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(CampaignOverview);
