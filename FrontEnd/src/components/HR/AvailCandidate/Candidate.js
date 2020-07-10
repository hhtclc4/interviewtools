import React from "react";
import './Candidate.scss'
import CollectedCan from './CollectedCan/Collect'
class AvailCandidate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
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
                    <div className="a-can-filter">
                        Filter here
                    </div>
                </div>
            </div>
        );
    }
}

export default AvailCandidate;