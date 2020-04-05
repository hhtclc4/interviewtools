import React from 'react'
import './../Interview.scss'
import { faClock, faEdit } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

class InterviewThumbnail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isComplete: false,
        }
    }
    render() {
        return (

            <div className="initialized-interview-container d-flex flex-row mr-2 mb-2">
                <div className="interview-info d-flex flex-column justify-content-between">
                    <div className="interview-name">Fresher Interview - First Time</div>
                    <div className="interview-deadline"><FontAwesomeIcon icon={faClock} /><span className="interview-time ml-1">Satuaday, March 28th 2020 - 8:00 AM</span></div>
                    <div className="interview-note">Choose 3-5 employees</div>
                </div>
                <div className="interview-options d-flex flex-column justify-content-around align-items-center flex-grow-1">
                    <FontAwesomeIcon icon={faEdit} color="#b3b3b3" />
                    <FontAwesomeIcon icon={faTrashAlt} color="#b3b3b3" />
                </div>
            </div>
        );
    }
}

export default InterviewThumbnail;