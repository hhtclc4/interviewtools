import React from "react";
import "./Candidate.scss";
import { Tabs, Panel } from "../../../../utils/Tab/Tabs";
import { connect } from "react-redux";
import * as actions from "../../../../redux/actions/index";
import CanOverview from "../Interview/Control/CandidateOverview/CanOverview";
class HRCandidate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getAvailableCandidates();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      availableCandidates: nextProps.availableCandidates,
    });
  }
  render() {
    return (
      <div className="hr-candidate-container">
        <div className="hr-can-body mt-4">
          <div className="hr-can-header">Available candidates</div>
          <hr />
          <div className="hr-can-body-tabs">
            <Tabs selected={0}>
              <Panel title="Applied">
                <CanOverview
                  from="hr"
                  source="apply"
                  type="partion"
                  display={true}
                />

                <CanOverview
                  from="hr"
                  source="apply"
                  type="canRow"
                  display={true}
                />
                <CanOverview
                  from="hr"
                  source="apply"
                  type="canRow"
                  display={true}
                />
              </Panel>
              <Panel title="Collected">
                <CanOverview
                  from="hr"
                  source="collect"
                  type="partion"
                  display={true}
                />
                <CanOverview
                  from="hr"
                  source="collect"
                  type="canRow"
                  display={true}
                />
                <CanOverview
                  from="hr"
                  source="collect"
                  type="canRow"
                  display={true}
                />
              </Panel>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    getAvailableCandidates: () => {
      dispatch(actions.getAvailableCandidates());
    },
  };
};
//get data from redux
const mapStateToProps = (state) => {
  return {
    availableCandidates: state.availableCandidates,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HRCandidate);
