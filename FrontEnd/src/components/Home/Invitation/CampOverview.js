import React from "react";
import "./Invitation.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkedAlt,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

class InviteCampOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: "",
        salary: 0,
        work_description: "",
        location: "",
        user: {
          company: {
            id: 0,
            address: "",
          },
        },
        subjects: [
          {
            id: 0,
            title: "",
          },
        ],
      },
    };
  }
  render() {
    let { onClickAcceptHandler, data, onClickHandler, index } = this.props;
    return (
      <div className="invite-camp-overview-container">
        <div className="i-c-o-wrapper" onClick={() => onClickHandler(index)}>
          <div className="i-c-o-img">
            <img
              alt="ava"
              src={
                data.image !== null ? data.image : require("../images/news.png")
              }
            />
          </div>
          <div className="i-c-o-info">
            <div className="i-c-o-title">{data.title}</div>
            <div className="i-c-o-company">{data.user.company.name}</div>
            <div className="i-c-o-salary-and-location">
              <span>
                <FontAwesomeIcon
                  color="#fd7e14"
                  className="mr-2"
                  icon={faMapMarkedAlt}
                />
                TP HCM
              </span>
              <span>
                <FontAwesomeIcon
                  color="#fd7e14"
                  className="mr-2"
                  icon={faDollarSign}
                />{" "}
                {data.salary === 0 ? "Agreement" : data.salary + " $"}
              </span>
            </div>
            {/* <div className="i-c-o-suject-list">
                            <div className="i-c-o-subject">
                                ReactJs
                            </div>
                        </div> */}
          </div>
        </div>
        <div className="i-c-o-buttons float-right">
          <button
            className="i-c-o-accept"
            onClick={() => onClickAcceptHandler(true, data.id)}
          >
            Accept
          </button>
          <button
            className="i-c-o-decline"
            onClick={() => onClickAcceptHandler(false, data.id)}
          >
            Decline
          </button>
        </div>
      </div>
    );
  }
}

export default InviteCampOverview;
