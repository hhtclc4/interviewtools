import React from "react";
import './CVTemplate.scss'
import { withRouter } from "react-router-dom";
//import EditorConvertToHTML from '../../utils/EditorConvertToHTML/EditorConvertToHTML'
import { Editor } from "react-draft-wysiwyg";
import EmploymentOverview from './EmploymentOverview/Employment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import EducationOverview from './EducationOverview/Education'
import SkillOverview from "./SkillOverview/Skill";

class CVTemplateCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpemEmp: false
        }
    }
    toggleEmpDetail = () => {
        this.setState({
            isOpenEmp: !this.state.isOpenEmp
        })
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
                        <p>Include your last 10 years of relevant experience and dates in this section. List your most recent position first</p>
                        <div className="cv-emp-list">
                            {/**section item control */}
                            <EmploymentOverview />
                            {/**End of section item control */}
                            <button><span><FontAwesomeIcon icon={faPlus} /><span>Add Employment</span></span></button>
                        </div>
                    </div>
                    <div className="cv-education">
                        <div className="cv-section-title">Education</div>
                        <p>If relevant, include your most recent educational achievements and the dates here</p>
                        <div className="cv-education-list">
                            <EducationOverview />
                            <button><span><FontAwesomeIcon icon={faPlus} /><span>Add Education</span></span></button>
                        </div>
                    </div>
                    <div className="skill">
                        <div className="cv-section-title">Skills</div>
                        <div className="cv-skill-list">
                            <SkillOverview />
                            <button><span><FontAwesomeIcon icon={faPlus} /><span>Add Skill</span></span></button>
                        </div>
                    </div>
                </div>
                <div className="cv-preview"></div>
            </div>
        );
    }
}

export default withRouter(CVTemplateCreator);