import React from "react";
import "./Control.scss";
import { Panel, Tabs } from "../../../../../utils/Tab/Tabs";
import CanOverview from "./CandidateOverview/CanOverview";
class CandidatePopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="candidate-popup-container">
                <div className="row m-0" style={{ width: "100%", height: "100%" }}>
                    <div className="col-sm-1"></div>
                    <div className="col-lg-10 d-flex flex-column justify-content-center">
                        <div className="candidate-popup-inner">
                            <div className="can-popup-header p-2 d-flex flex-row justify-content-start">
                                <img
                                    className="can-img"
                                    alt="can"
                                    src={require("../../../images/Candidate.png")}
                                />
                                <h4>Candidate editor</h4>
                            </div>
                            <div className="can-popup-body p-2">
                                <h4>Available candidates</h4>
                                <div className="can-popup-tabs">
                                    <Tabs selected={0}>
                                        <Panel title="Applied">
                                            <CanOverview
                                                from="canPop"
                                                source="apply"
                                                type="partion"
                                            />
                                            <CanOverview
                                                from="canPop"
                                                source="apply"
                                                type="canRow"
                                            />
                                        </Panel>
                                        <Panel title="Collected">
                                            <CanOverview
                                                from="canPop"
                                                source="collect"
                                                type="partion"

                                            />
                                            <CanOverview
                                                from="canPop"
                                                source="collect"
                                                type="canRow"
                                            />
                                        </Panel>
                                    </Tabs>
                                </div>
                                <div className="can-chosen">
                                    <h4>Chosen candidates</h4>
                                    <div className="interview-candidate-list">
                                        <CanOverview
                                            from="canPop"
                                            type="partion"
                                            source="chosen"
                                        />
                                        <CanOverview
                                            from="canPop"
                                            color="#f1f1f1"
                                            source="chosen"
                                        />
                                        <CanOverview
                                            from="canPop"
                                            color="#fff"
                                            source="chosen"
                                        />
                                        <CanOverview
                                            from="canPop"
                                            color="#f1f1f1"
                                            source="chosen"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="can-popup-footer p-2">
                                <button
                                    className="close-btn float-right"
                                    onClick={this.props.closePopup}
                                >
                                    Close
                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-1"></div>
                </div>
            </div>
        );
    }
}

export default CandidatePopup;
