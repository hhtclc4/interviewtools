import React from 'react'
import './Invitation.scss'
import { withRouter } from "react-router-dom";
import HomeNav from '../Nav/Nav'
import InviteCampOverview from './CampOverview'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faDollarSign } from '@fortawesome/free-solid-svg-icons';
class Invitation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                id: 0,
                title: "",
                subject_id: 0,
                company_address: "",
                level_id: 0,
                amount_required: 0,
                work_type_id: 0,
                sex: 0,
                experience: 0,
                salary: 0,
                deadline: "",
                user_id: 0,
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
        }
    }
    render() {
        let { data } = this.state;
        return (
            <div className="invitation-container">
                <HomeNav />
                <div className="invitation-body-container">
                    <div className="all-invitation-list">
                        <p className="i-title">Notification</p>
                        <p className="i-count">10 invitations</p>
                        <hr />
                        <InviteCampOverview />
                    </div>
                    <div className="campaign-show-container">
                        {/** */}
                        <div className="job-content">
                            <div className="comp-img-list d-flex flex-grow justify-content-between">
                                <div className="comp-img-crop">
                                    <img
                                        className="comp-img"
                                        alt="company-1"
                                        src={require("../images/CV.png")}
                                    />
                                </div>
                                <div className="comp-img-crop">
                                    <img
                                        className="comp-img"
                                        alt="company-1"
                                        src={require("../images/CV.png")}
                                    />
                                </div>
                                <div className="comp-img-crop mr-0">
                                    <img
                                        className="comp-img"
                                        alt="company-1"
                                        src={require("../images/CV.png")}
                                    />
                                </div>
                            </div>
                            <div className="comp-and-job-desc d-flex flex-row">
                                <div className="comp-about">
                                    <div className="comp-header d-flex flex-row justify-content-center py-2">
                                        <img
                                            style={{ width: "80%" }}
                                            alt="comp-logo"
                                            src={require("../images/CV.png")}
                                        />
                                    </div>
                                    <div className="comp-body"></div>
                                </div>
                                <div className="job-desc-about">
                                    <div className="job-title">{data.title}</div>
                                    <div className="job-subject-list d-flex flex-row justify-content-start">
                                        {data.subjects.map((subject) => {
                                            return (
                                                <div key={subject.id} className="job-subject">
                                                    {subject.title}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="job-salary d-flex flex-row">
                                        <span className="job-adjust-icon d-flex flex-row justify-content-center">
                                            <FontAwesomeIcon
                                                icon={faDollarSign}
                                                size="sm"
                                                color="#FD7E14"
                                            />
                                        </span>
                                        <p>
                                            {data.salary === 0
                                                ? "Lương thỏa thuận"
                                                : data.salary + " $"}
                                        </p>
                                    </div>
                                    <div className="job-destination d-flex flex-row">
                                        <span className="job-adjust-icon d-flex flex-row justify-content-center mr-2">
                                            <FontAwesomeIcon
                                                icon={faMapMarkerAlt}
                                                color="#FD7E14"
                                                size="lg"
                                            />
                                        </span>
                                        <p>{data.user.company.address}</p>
                                    </div>

                                    <hr />
                                    <div className="job-info-and-require"></div>
                                    {/* <div className="apply-btn"></div> */}
                                </div>
                            </div>
                        </div>
                        {/** */}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Invitation);