import React from "react"
import './Employment.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Editor } from "react-draft-wysiwyg";
class EmploymentOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpand: false,
        }
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
                            <span className="emp-position-employer">Tester at FPT</span>
                            <div className="emp-experience-year">5 years</div>
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
                                    <div className="cv-input-title">Position</div>
                                    <div className="cv-input-ipt">
                                        <input />
                                    </div>
                                </div>
                                <div className="cv-input">
                                    <div className="cv-input-title">Year Experience</div>
                                    <div className="cv-input-ipt">
                                        <input />
                                    </div>
                                </div>
                            </div>
                            <div className="half">
                                <div className="cv-input">
                                    <div className="cv-input-title">Employer</div>
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

export default EmploymentOverview;