import React from 'react'

import './Control.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons'
import { faUserEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import CanOverview from '../../../CandidateOverview/CanOverview'

class InterviewControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="interview-control-container d-flex flex-column justify-content-start mb-4"
                style={{ borderLeft: '10px solid #d3d71d' }}
            >
                <div className="interview-control-header d-flex flex-row justify-content-between p-2">
                    <div className="in-control-name  py-2">
                        First wave interview
                    </div>

                    <div className="in-control-options-group d-flex flex-row">
                        <div className="in-control-time p-2 mr-2">
                            <span style={{ marginRight: '5px' }}>
                                <FontAwesomeIcon icon={faCalendarAlt} size="lg" color="#393A68" />
                            </span>
                            <span>Time</span>
                        </div>

                        <button className="in-control-add">
                            <span><FontAwesomeIcon icon={faUserPlus} style={{ marginRight: '5px' }} size="lg" color="#393A68" /></span>
                        </button>
                    </div>

                </div>
                <div className="interview-control-body p-2">
                    <div className="in-control-partions d-flex flex-row px-2">
                        <div className="time-partion">
                            Time
                        </div>
                        <div className="name-partion">
                            Name
                        </div>
                        <div className="email-partion">
                            Email
                        </div>
                        <div className="phone-partion">Phone</div>
                        <div className="cv-partion">
                            CV
                        </div>
                        <div className="note-partion">
                            Note
                        </div>
                    </div>
                    <hr />
                    <div className="interview-candidate-list">
                        <CanOverview />
                        <CanOverview />
                        <CanOverview />
                    </div>
                </div>
                <div className="interview-control-footer p-2">
                    <div className="in-control-senior-name">
                        <span>
                            <FontAwesomeIcon icon={faUserEdit} size="lg" style={{ marginRight: '10px' }} color="#393A68" />
                        </span>
                        <span>Mr.Tri</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default InterviewControl;