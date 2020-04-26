import React from 'react'
import './CompletedInterview.scss'
import InterviewReport from './Report/Report'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
class CompletedInterview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="completed-interview-container pt-3">
                <div className="completed-list-partion d-flex flex-row justify-content-between px-2">
                    <div className="in-partion-time">
                        <span><FontAwesomeIcon icon={faClock} /> Date</span>
                    </div>
                    <div className="in-partion-name ">
                        Interview name
                    </div>
                    <div className="in-partion-total-can">
                        Total candidates
                    </div>
                    <div className="in-partion-acc">
                        Accuracy
                    </div>
                </div>
                <div className="completed-list-container">
                    <InterviewReport />
                    <InterviewReport />
                </div>

            </div>
        );
    }
}

export default CompletedInterview;