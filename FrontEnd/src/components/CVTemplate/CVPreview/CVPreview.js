import React from 'react'
import './CVPreview.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { Editor } from "react-draft-wysiwyg";
class CVPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="cv-preview-container">
                <div className="cv-preview-header">
                    <img alt="ava" src={require("../../../utils/images/defaultava.png")} />
                    <div className="cv-preview-name">Tri Ha</div>
                    <div className="cv-preview-job">Doctor</div>
                </div>
                <div className="cv-preview-contact d-flex flex-row justify-content-center">
                    <div className="contact-email mr-5 "><span><FontAwesomeIcon icon={faEnvelope} className="mr-1" />handcock.eg@gmail.com</span></div>
                    <div className="contact-phone"><span><FontAwesomeIcon icon={faPhoneAlt} className="mr-1" />0123 55 77 99</span></div>
                </div>
                <div className="cv-preview-body">
                    <div className="cv-pre-profile">
                        <div className="cv-pre-title">Profile</div>
                        <Editor />
                    </div>
                    <div className="cv-pre-employment-history">
                        <div className="cv-pre-title">Employment History</div>
                        <div className="cv-pre-section-item">
                            <div className="section-overview">Tester, FPT, Ho Chi Minh City</div>
                            <div className="section-year">July 2018 - July 2020</div>
                            <div className="section-description"></div>
                        </div>
                    </div>
                    <div className="cv-pre-education">
                        <div className="cv-pre-title">Education</div>
                        <div className="cv-pre-section-item">
                            <div className="section-overview">Bachelor, UTE, Ho Chi Minh City</div>
                            <div className="section-year">July 2016 - July 2020</div>
                            <div className="section-description"></div>
                        </div>
                    </div>
                    <div className="cv-pre-skill">
                        <div className="cv-pre-title">Skills</div>
                        <div className="cv-pre-skill-section">
                            <div className="cv-skill-name">ReactJs</div>
                            <div className="cv-skill-lvl-bar">
                                <div className="progress"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CVPreview;