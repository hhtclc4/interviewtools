import React from 'react'
import './Education.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Editor } from "react-draft-wysiwyg";

class EducationOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    toggleEmpDetail = () => {
        this.setState({
            isExpand: !this.state.isExpand
        })
    }
    render() {
        let { isExpand } = this.state;
        return (
            <div className="employment-container">
                <div className="emp-container-actions"></div>
                <div className="employment-control">
                    <div className="employment-overview-info d-flex flex-row justify-content-between">
                        <div className="info-left">
                            <span className="emp-position-employer">Bachelor at UTE</span>
                            <div className="emp-experience-year">4 years training</div>
                        </div>
                        <div className="btn-right align-self-center">
                            <button className="float-right" onClick={this.toggleEmpDetail}><FontAwesomeIcon icon={faChevronDown} /></button>
                        </div>
                    </div>
                    <div className="employment-detail-info"
                        style={isExpand ? { display: 'block' } : { display: 'none' }}
                    >
                        <div className="cv-section-input">
                            <div className="half">
                                <div className="cv-input">{/**component of an input  */}
                                    <div className="cv-input-title">School</div>
                                    <div className="cv-input-ipt">
                                        <input />
                                    </div>
                                </div>
                                <div className="cv-input">
                                    <div className="cv-input-title">Completion Time</div>
                                    <div className="cv-input-ipt">
                                        <input />
                                    </div>
                                </div>
                            </div>
                            <div className="half">
                                <div className="cv-input">
                                    <div className="cv-input-title">Degree</div>
                                    <div className="cv-input-ipt">
                                        <input />
                                    </div>
                                </div>
                                <div className="cv-input">
                                    <div className="cv-input-title">City</div>
                                    <div className="cv-input-ipt">
                                        <input />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="cv-input">
                            <div className="cv-input-title">Description</div>
                            <div className="cv-input-ipt">
                                <Editor />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EducationOverview;