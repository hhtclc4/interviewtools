import React from 'react';
import './Collect.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faClipboard, faStickyNote } from '@fortawesome/free-regular-svg-icons';
import { faPhone, faCheck } from '@fortawesome/free-solid-svg-icons';
import PopUp from "../../../../utils/PopUp/PopUp";
import AutoNoteAndCV from './NoteAndCV/NoteAndCV'
class CollectedCan extends React.Component {
    state = {
        isShowNoteAndCv: false,
        isOpenPopup: false,
        active: 0,
    }

    togglePopUp = () => {
        // if (this.state.isShowQuiz === true) {
        //   this.setState({
        //     isShowQuiz: false,
        //   })
        // }
        this.setState({
            isShowNoteAndCv: !this.state.isShowNoteAndCv,
            isOpenPopup: !this.state.isOpenPopup,
        });
    };
    render() {
        let { isShowNoteAndCv, active } = this.state;
        return (
            <div className="collected-candidate-container">
                <div className="c-can-ava">
                    <img alt="ava" src={require("../../images/Interview.png")} />
                </div>
                <div className="c-can-info">
                    <div className="c-can-name">
                        Tri
                    </div>
                    <div className="c-can-position">
                        Developer
                    </div>
                    <div className="c-can-contact">
                        <div className="contact-email">
                            <span><FontAwesomeIcon icon={faEnvelope} /></span>
                        </div>
                        <div className="contact-phone">
                            <span><FontAwesomeIcon icon={faPhone} /></span>
                        </div>
                    </div>
                </div>
                <div className="c-can-skills">
                    <div className="can-skill mr-3 text-truncate"><FontAwesomeIcon icon={faCheck} color="#33cc33" className="mr-1" />ReactJSReactJS</div>
                    <div className="can-skill mr-3 text-truncate"><FontAwesomeIcon icon={faCheck} color="#33cc33" className="mr-1" />ReactJSReactJSReactJSReactJS</div>
                </div>
                <div className="c-can-actions">
                    <div className="c-can-auto-cv">
                        <button
                            onClick={
                                () => {
                                    this.setState({
                                        active: 0,
                                    })
                                    this.togglePopUp();
                                }
                            }
                        ><FontAwesomeIcon icon={faClipboard} />CV</button>
                    </div>
                    <div className="c-can-note">
                        <button
                            onClick={
                                () => {
                                    this.setState({
                                        active: 1,
                                    })
                                    this.togglePopUp();
                                }
                            }
                        ><FontAwesomeIcon icon={faStickyNote} />Note</button>
                    </div>
                </div>
                {isShowNoteAndCv ? (
                    <PopUp
                        openPop={(open) => {
                            setTimeout(() => {
                                this.setState({
                                    isShowNoteAndCv: !open,
                                    isOpenPopup: false,
                                });
                            }, 150);
                        }}
                    >
                        <AutoNoteAndCV
                            active={active}
                        />
                    </PopUp>
                ) : (null)}
            </div>
        );
    }
}

export default CollectedCan;