import React from 'react'
import './CanOverview.scss'
import NoteandCV from './NoteandCV'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote, faClipboard } from '@fortawesome/free-regular-svg-icons';


class CanOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenNoteandCV: false,
            active: 0
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
        let { color, type, source, from, partion } = this.props;
        return (
            <div className="candidate-overview-container"
                style={partion === "true" ? { marginBottom: '8px' } : {}}
            >
                <div className="candidate-partions-container d-flex flex-row p-2 justify-content-between"
                    style={{ backgroundColor: color }}
                >
                    <div className="time-partion"
                        style={(type === 'available' && from !== "control") ? { display: 'none' } : {}}
                    >
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
                        <button
                            onClick={() => {
                                this.setState({
                                    isOpenNoteandCV: !this.state.isOpenNoteandCV,
                                    active: 0,
                                });
                                this.toggleNoteandCV();
                            }}

                            className="cv-btn"
                        >
                            {partion === "true" ? <>CV</> : <FontAwesomeIcon icon={faClipboard} />}
                        </button>
                    </div>
                    <div className="note-partion">
                        <button
                            onClick={() => {
                                this.setState({
                                    isOpenNoteandCV: !this.state.isOpenNoteandCV,
                                    active: 1,
                                });
                                this.toggleNoteandCV();
                            }}

                            className="note-btn"
                        >
                            {partion === "true" ? <>Note</> : <FontAwesomeIcon icon={faStickyNote} />}
                        </button>
                    </div>
                    <div className="subject-partion"
                        style={source === "apply" ? { display: 'none' } : {}}
                    >
                        {((partion === "true" && from !== 'control') || source === "collect") ? <>Major</> : <div style={{ minWidth: '0%' }} ></div>}
                    </div>
                    <div className="level-partion"
                        style={source === 'apply' ? { display: 'none' } : {}}

                    >
                        {((partion === "true" && from !== 'control') || source === "collect") ? <>Level</> : <div style={{ minWidth: '0%' }} ></div>}
                    </div>

                    {this.state.isOpenNoteandCV ? (
                        <NoteandCV
                            closePopup={this.toggleNoteandCV}
                            openTab={this.state.active}
                        />
                    ) : null}
                </div>
                <hr
                    style={partion === "true" ? { display: 'block' } : { display: 'none' }}
                />
            </div>
        );
    }
}

export default CanOverview;