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
                                <Checkbox onChange={this.onChange}>Developer</Checkbox>
                                <Checkbox onChange={this.onChange}>Software Engineer</Checkbox>
                                <Checkbox onChange={this.onChange}>Software Engineer</Checkbox>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AvailCandidate;