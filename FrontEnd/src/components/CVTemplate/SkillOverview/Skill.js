import React from 'react'
import './Skill.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Editor } from "react-draft-wysiwyg";
class SkillOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpand: false,
            skills: [{
                user_id: 0,
                subject_id: 0,
                level: 0,
            }],
            skillLevels: [1, 2, 3, 4, 5],
            selectedLevel: 1,
        }
    }

    toggleEmpDetail = () => {
        this.setState({
            isExpand: !this.state.isExpand
        })
    }

    levelClick = (index) => {
        this.setState({
            selectedLevel: index + 1,
        })
    }

    levelColor = (index) => {
        switch (index) {
            case 0:
                return "#FF5959";
            case 1:
                return "#FF9159";
            case 2:
                return "#F3B721";
            case 3:
                return "#80CC14";
            case 4:
                return "#25B869";
            default:
                break;
        }
    }
    backwardColor = (index) => {
        switch (index) {
            case 0:
                return "#ffe6e6";
            case 1:
                return "#ffddcc";
            case 2:
                return "#fae09e";
            case 3:
                return "#F2FAE7";
            case 4:
                return "#E9F8F0";
            default:
                break;
        }
    }

    textLevel = (index) => {
        switch (index) {
            case 0:
                return "Novice";
            case 1:
                return "Beginner";
            case 2:
                return "Skillful";
            case 3:
                return "Experinced";
            case 4:
                return "Expert";
            default:
                break;
        }
    }
    render() {
        let { isExpand, selectedLevel } = this.state;
        let textLevel = this.textLevel(selectedLevel - 1);
        return (
            <div className="employment-container">
                <div className="emp-container-actions"></div>
                <div className="employment-control">
                    <div className="employment-overview-info d-flex flex-row justify-content-between">
                        <div className="info-left">
                            <span className="emp-position-employer">Reactjs</span>
                            <div className="emp-experience-year">Master</div>
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
                                    <div className="cv-input-title">Skill</div>
                                    <div className="cv-input-ipt">
                                        <input />
                                    </div>
                                </div>
                            </div>
                            <div className="half">
                                <div className="cv-input">
                                    <div className="cv-input-title">Level-{textLevel}</div>
                                    <div className="cv-level-bar"
                                        style={{ backgroundColor: this.backwardColor(selectedLevel - 1) }}
                                    >
                                        {
                                            this.state.skillLevels.map((value, index) => {
                                                let color = this.levelColor(index)
                                                return (
                                                    <div className="select-level" onClick={() => this.levelClick(index)}
                                                        style={selectedLevel === index + 1 ? { backgroundColor: color } : null}
                                                    ></div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default SkillOverview;