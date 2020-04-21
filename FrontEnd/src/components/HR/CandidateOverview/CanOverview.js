import React from 'react'
import './CanOverview.scss'
import NoteandCV from './NoteandCV'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote } from '@fortawesome/free-regular-svg-icons';

class CanOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenNoteandCV: false
        }
    }

    toggleNoteandCV = () => {
        let { isOpenNoteandCV } = this.state;

        if (isOpenNoteandCV === true) {
            this.setState({
                isOpenNoteandCV: !isOpenNoteandCV,
            });
        }
    }
    render() {
        return (
            <div className="candidate-overview-container d-flex flex-row p-2 my-1">
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
                    <button
                        onClick={() => {
                            this.setState({
                                isOpenNoteandCV: !this.state.isOpenNoteandCV,
                            });
                            this.toggleNoteandCV();
                        }}

                        className="note-btn"
                    >
                        <FontAwesomeIcon icon={faStickyNote} />
                    </button>
                </div>

                {this.state.isOpenNoteandCV ? (
                    <NoteandCV
                        closePopup={this.toggleNoteandCV}
                    />
                ) : null}
            </div>
        );
    }
}

export default CanOverview;