import React from "react";
import './Candidate.scss'
import CollectedCan from './CollectedCan/Collect'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Checkbox } from 'antd';
class AvailCandidate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }
    render() {
        return (
            <div className="avail-candidate-container">
                <div className="a-can-search"></div>
                <div className="a-can-header">
                    <div className="a-can-header-title">
                        Collected Candidates
                    </div>
                </div>
                <div className="a-can-body">
                    <div className="a-can-list">
                        <CollectedCan />
                    </div>
                    <div className="a-can-filters">
                        <div className="a-can-feature-filter">
                            <div className="a-can-filter-header">Position<span className="float-right"><FontAwesomeIcon icon={faPlus} size="lg" /></span></div>
                            <div className="a-can-filter-body">
                                <Checkbox onChange={this.onChange}>FrontEnd Developer</Checkbox>
                                <Checkbox onChange={this.onChange}>BackEnd Developer</Checkbox>
                                <Checkbox onChange={this.onChange}>Software Engineer</Checkbox>
                                <Checkbox onChange={this.onChange}>Cloud Computing Engineer</Checkbox>
                                <Checkbox onChange={this.onChange}>Database Administrator</Checkbox>
                                <Checkbox onChange={this.onChange}>System Analyst</Checkbox>
                                <Checkbox onChange={this.onChange}>System Designer</Checkbox>
                            </div>
                        </div>
                        <div className="a-can-feature-filter">
                            <div className="a-can-filter-header">Years Experience<span className="float-right"><FontAwesomeIcon icon={faPlus} size="lg" /></span></div>
                            <div className="a-can-filter-body">
                                <Checkbox onChange={this.onChange}>1 year +</Checkbox>
                                <Checkbox onChange={this.onChange}>2 years +</Checkbox>
                                <Checkbox onChange={this.onChange}>3 years +</Checkbox>
                                <Checkbox onChange={this.onChange}>4 years +</Checkbox>
                                <Checkbox onChange={this.onChange}>5 years +</Checkbox>
                                <Checkbox onChange={this.onChange}>10 years +</Checkbox>
                            </div>
                        </div>
                        <div className="a-can-feature-filter">
                            <div className="a-can-filter-header">Degree Type<span className="float-right"><FontAwesomeIcon icon={faPlus} size="lg" /></span></div>
                            <div className="a-can-filter-body">
                                <Checkbox onChange={this.onChange}>Associate</Checkbox>
                                <Checkbox onChange={this.onChange}>Bachelor</Checkbox>
                                <Checkbox onChange={this.onChange}>Master</Checkbox>
                                <Checkbox onChange={this.onChange}>Doctoral</Checkbox>
                            </div>
                        </div>
                        <div className="a-can-feature-filter">
                            <div className="a-can-filter-header">Skills<span className="float-right"><FontAwesomeIcon icon={faPlus} size="lg" /></span></div>
                            <div className="a-can-filter-body">
                                <Checkbox onChange={this.onChange}>Developer</Checkbox>
                                <Checkbox onChange={this.onChange}>Software Engineer</Checkbox>
                                <Checkbox onChange={this.onChange}>Software Engineer</Checkbox>
                            </div>
                        </div>
                        <div className="a-can-feature-filter">
                            <div className="a-can-filter-header">Levels<span className="float-right"><FontAwesomeIcon icon={faPlus} size="lg" /></span></div>
                            <div className="a-can-filter-body">
                                <Checkbox onChange={this.onChange}>Intern</Checkbox>
                                <Checkbox onChange={this.onChange}>Fresher</Checkbox>
                                <Checkbox onChange={this.onChange}>Senior</Checkbox>
                                <Checkbox onChange={this.onChange}>Master</Checkbox>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AvailCandidate;