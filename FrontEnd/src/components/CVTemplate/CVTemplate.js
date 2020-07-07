import React from "react";
import './CVTemplate.scss'
import { withRouter } from "react-router-dom";
//import EditorConvertToHTML from '../../utils/EditorConvertToHTML/EditorConvertToHTML'
import { Editor } from "react-draft-wysiwyg";
class CVTemplateCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="cv-creator-container">
                <div className="select-cv-content">
                    <div className="cv-title">Title</div>
                    <div className="cv-completeness">
                        <div className="cv-completeness-bar"></div>
                    </div>
                    <div className="cv-personal-detail">
                        <div className="cv-section-title">Personal Details</div>
                        <div className="cv-section-input">
                            <div className="half">
                                <div className="cv-input">{/**component of an input  */}
                                    <div className="cv-input-title">Job title</div>
                                    <div className="cv-input-ipt">
                                        <input />
                                    </div>
                                </div>
                                <div className="cv-input">
                                    <div className="cv-input-title">Job title</div>
                                    <div className="cv-input-ipt">
                                        <input />
                                    </div>
                                </div>
                                <div className="cv-input">
                                    <div className="cv-input-title">Job title</div>
                                    <div className="cv-input-ipt">
                                        <input />
                                    </div>
                                </div>
                            </div>
                            <div className="half">
                                <div className="cv-input">
                                    <div className="cv-input-title">Job title</div>
                                    <div className="cv-input-ipt">
                                        <input />
                                    </div>
                                </div>
                                <div className="cv-input">
                                    <div className="cv-input-title">Job title</div>
                                    <div className="cv-input-ipt">
                                        <input />
                                    </div>
                                </div>
                                <div className="cv-input">
                                    <div className="cv-input-title">Job title</div>
                                    <div className="cv-input-ipt">
                                        <input />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cv-professional-sumary">
                        <div className="cv-section-title">Professional Summary</div>
                        <p>Include 2-3 clear sentences about your overall experience</p>
                        <Editor />
                    </div>
                    <div className="cv-employment-history">
                        <div className="cv-section-title">Employment History</div>
                    </div>
                    <div className="education">
                        <div className="cv-section-title">Education</div>
                    </div>
                    <div className="skill">
                        <div className="cv-section-title">Skills</div>
                    </div>
                </div>
                <div className="cv-preview"></div>
            </div>
        );
    }
}

export default withRouter(CVTemplateCreator);