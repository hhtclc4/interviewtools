import React from 'react'
import './Candidate.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faClock } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faInfo } from '@fortawesome/free-solid-svg-icons';

class InterviewsPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {

        let interviewElm = (
            <div className="in-control-container-sm mr-3 mb-3">
                <div className="in-title p-2 d-flex flex-row ">
                    <b className="mr-auto">Fresher first</b>
                    <button className="in-add-btn mr-1">
                        <span><FontAwesomeIcon icon={faPlus} className="mr-1" />ADD</span>
                    </button>

                    <button className="in-detail-btn">
                        <span><FontAwesomeIcon icon={faInfo} className="mr-1" />DETAIL</span>
                    </button>
                </div>
                <div className="in-date-and-time p-1">
                    <div className="in-date p-1 mb-1">
                        <span><FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />Sat, Jan 18th 2020</span>
                    </div>
                    <div className="in-time p-1  ">
                        <span><FontAwesomeIcon icon={faClock} className="mr-1" />  08:00:00 to 08:00:00</span>
                    </div>
                </div>
                <div className="in-num p-2">
                    4 people applied
                </div>
            </div>
        );
        return (
            <div className="in-popup-container">
                <div className="row m-0" style={{ height: "100%", width: "100%" }}>
                    <div className="col-sm-2"></div>
                    <div className="col-md-8 d-flex flex-column justify-content-center">
                        <div className="in-popup-inner d-flex flex-column">
                            <div className="in-popup-header  d-flex flex-row p-3">
                                <img alt="interview-list" src={require("../../images/Interviewlist.png")}
                                    className="in-list-img mr-1"
                                />
                                <div className="in-popup-title">Interview List</div>
                            </div>
                            <div className="in-popup-body flex-grow-1">
                                <div className="in-popup-list d-flex flex-row flex-wrap">
                                    {interviewElm}
                                    {interviewElm}
                                    {interviewElm}
                                    {interviewElm}
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

export default InterviewsPopup;