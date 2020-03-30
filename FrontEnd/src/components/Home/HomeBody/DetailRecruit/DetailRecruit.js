import React from 'react'
import './DetailRecruit.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import SendCV from './SendCVPopup'
class DetailRecruit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSendCVPopUp: false
        }
    }


    toggleSendCVPopUp = () => {
        let { showSendCVPopUp } = this.state;

        if (showSendCVPopUp === true) {
            this.setState({
                showSendCVPopUp: !showSendCVPopUp
            });
        }
    };
    render() {
        return (
            <div className="detail-recruit-container">
                <div className="dr-nav-container">
                    <div className="logo">
                        <img className="big-logo"
                            src={require("../../../../utils/images/logo.png")}
                            alt="quiz-icon"
                        />
                    </div>
                </div>
                <div className="dr-content container-fluid">
                    <div className="dr-grid row ">
                        <div className="col-sm-2"></div>
                        <div className="col-lg-8 job-content">
                            <div className="comp-img-list d-flex flex-grow justify-content-between">
                                <div className="comp-img-crop">
                                    <img className="comp-img" alt="company-1" src={require("../../images/comp-1.jpg")} />
                                </div>
                                <div className="comp-img-crop">
                                    <img className="comp-img" alt="company-1" src={require("../../images/comp-2.jpg")} />
                                </div>
                                <div className="comp-img-crop mr-0">
                                    <img className="comp-img" alt="company-1" src={require("../../images/comp-3.png")} />
                                </div>
                            </div>
                            <div className="comp-and-job-desc d-flex flex-row">
                                <div className="comp-about">
                                    <div className="comp-header d-flex flex-row justify-content-center py-2">
                                        <img style={{ width: '80%' }} alt="comp-logo" src={require("../../images/comp-logo.png")} />
                                    </div>
                                    <div className="comp-body"></div>
                                </div>
                                <div className="job-desc-about">
                                    <div className="job-title">JAVA Dev (String Boost)</div>
                                    <div className="job-subject-list d-flex flex-row justify-content-start">
                                        <div className="job-subject">Java</div>
                                    </div>
                                    <div className="job-salary d-flex flex-row">
                                        <span className="job-adjust-icon d-flex flex-row justify-content-center">
                                            <FontAwesomeIcon icon={faDollarSign} size="sm" color="#FD7E14" />
                                        </span>
                                        <p>7-10 m</p>
                                    </div>
                                    <div className="job-destination d-flex flex-row">
                                        <span className="job-adjust-icon d-flex flex-row justify-content-center mr-2">
                                            <FontAwesomeIcon icon={faMapMarkerAlt} color="#FD7E14" size="lg" />
                                        </span>
                                        <p>HCM City</p>
                                    </div>
                                    <button className="apply-btn"
                                        onClick={() => {
                                            this.setState({
                                                showSendCVPopUp: !this.state.showSendCVPopUp
                                            })
                                            this.toggleSendCVPopUp()
                                        }}
                                    >
                                        Apply Now
                                    </button>
                                    <hr />
                                    <div className="job-info-and-require"></div>
                                    {/* <div className="apply-btn"></div> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-2"></div>
                    </div>
                </div>

                {this.state.showSendCVPopUp ?
                    <SendCV
                        closePopup={this.toggleSendCVPopUp}
                    /> : null}
            </div>
        );
    }
}

export default DetailRecruit;