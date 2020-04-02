import React from 'react'
import './CampaignOverview.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faMapMarkerAlt, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
class CampaignOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="campaign-overview-container d-flex flex-row p-2">
                <div className="co-company-logo align-self-center p-2">
                    <div className="crop-comp-logo">
                        <img className="comp-logo" alt="logo" src={require("../images/comp-logo.png")} />
                    </div>
                </div>
                <div className="co-require-and-desc">
                    <div className="co-title">
                        <p className="text-truncate">10 Java Developers (Spring/Hibernate)</p>
                    </div>
                    <div className="co-salary d-flex flex-row">
                        <span className="co-adjust-icon d-flex flex-row justify-content-center">
                            <FontAwesomeIcon icon={faDollarSign} size="sm" color="#FD7E14" />
                        </span>
                        <p>7 - 10m</p>
                    </div>
                    <div className="co-job-benefit">
                        <pre>{`
Mức lương cao, ổn định
Nhiều cơ hội thăng tiến
Junior Dev 1-2 năm KN là OK
                        `}</pre>
                    </div>
                    <div className="co-job-desc ">
                        Mô hình hóa các khái niệm lõi của nghiệp vụ,
                        xây dựng nền tảng và khung của lõi API,
                        phát triển tính năng cho các dòng sản phẩm tài chính
                        xây dựng nền tảng và khung của lõi API,
                        phát triển tính năng cho các dòng sản phẩm tài chính
                        xây dựng nền tảng và khung của lõi API,
                        phát triển tính năng cho các dòng sản phẩm tài chính
                    </div>
                    <div className="co-subjects d-flex flex-row">
                        <div className="co-subject">
                            Java
                        </div>
                        <div className="co-subject">
                            Java
                        </div>
                        <div className="co-subject">
                            Java
                        </div>
                    </div>
                </div>
                <div className="co-tag d-flex flex-column justify-content-around ">
                    <div className="co-feature align-self-end">
                        Hot
                    </div>
                    <div className="co-destination align-self-end">
                        <span className="co-adjust-icon d-flex flex-row justify-content-center mr-2">
                            <FontAwesomeIcon icon={faMapMarkerAlt} color="#FD7E14" size="lg" />
                        </span>
                        <p>HCM City</p>
                    </div>
                    <div className="co-publish align-self-end">
                        12 hours ago
                    </div>
                </div>
                <div className="co-options d-flex flex-column pl-3 justify-content-around">
                    <button className="co-option-btn">
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

export default CampaignOverview;