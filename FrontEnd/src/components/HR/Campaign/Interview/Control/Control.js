import React from 'react'

import './Control.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons'
import { faUserEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import CanOverview from '../../../CandidateOverview/CanOverview'
import CandidatePopup from './CandidatePopup'

class InterviewControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowCandidatePopup: false,
        }
    }

    toggleCandidatePopup = () => {
        let { isShowCandidatePopup } = this.state;

        if (isShowCandidatePopup === true) {
            this.setState({
                isShowCandidatePopup: !isShowCandidatePopup,
            });
        }
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

                        <button className="in-control-add"
                            onClick={() => {
                                this.setState({
                                    isShowCandidatePopup: !this.state.isShowCandidatePopup,
                                });
                                this.toggleCandidatePopup();
                            }}
                        >
                            <span><FontAwesomeIcon icon={faUserPlus} style={{ marginRight: '5px' }} size="lg" color="#393A68" /></span>
                        </button>
                    </div>

                </div>
                <div className="interview-control-body p-2">
                    <div className="interview-candidate-list">
                        <CanOverview partion="true"
                            from="control"
                        />
                        <CanOverview color="#f1f1f1" />
                        <CanOverview color="#fff" />
                        <CanOverview color="#f1f1f1" />
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

                {this.state.isShowCandidatePopup ? (
                    <CandidatePopup
                        closePopup={this.toggleCandidatePopup}
                    />
                ) : null}
            </div>
        );
    }
}

export default InterviewControl;