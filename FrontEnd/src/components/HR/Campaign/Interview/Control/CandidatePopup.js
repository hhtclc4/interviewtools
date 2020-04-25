import React from "react";
import "./Control.scss";
import { Panel, Tabs } from "../../../../../utils/Tab/Tabs";
import CanOverview from "./CandidateOverview/CanOverview";
import { connect } from "react-redux";
import * as actions from "../../../../../redux/actions/index";
class CandidatePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableCandidates: [
        {
          cv: "",
          description: "",
          user: {
            id: 0,
            name: "",
            email: "",
            password: "",
          },
        },
      ],
      fetchDataFromThirdApp: [
        {
          candidate_id: 10000,
          cv: "",
          description: "good Java",
          user: {
            id: 10000,
            name: "Hao Nguyen",
            email: "HaoNguyen@gmail.com",
          },
          subject: [
            {
              id: 1,
              title: "Java",
            },
            {
              id: 2,
              title: "TypeScript",
            },
          ],
          level: "Senior",
        },

        {
          candidate_id: 10001,
          cv: "",
          description: "good Python",
          user: {
            id: 10001,
            name: "Nghia Nguyen",
            email: "NghiaNguyen@gmail.com",
          },
          subject: [
            {
              id: 1,
              title: "Python",
            },
            {
              id: 2,
              title: "JavaScript",
            },
          ],
          level: "Senior",
        },
      ],
    };
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
    let { availableCandidates, fetchDataFromThirdApp } = this.state;
    let { data } = this.props;
    console.log(data);
    let chosenCandidates = data.group_candidates.map((candidate, index) => {
      return (
        <CanOverview
          key={candidate.candidate_id}
          interview_id={data.id}
          data={candidate}
          from="canPop"
          source="chosen"
          type="canRow"
          color={index % 2 === 0 ? "#f1f1f1" : "#fff"}
        />
      );
    });
    let availableApplyEml = availableCandidates.map((candidate, index) => {
      return (
        <CanOverview
          key={candidate.candidate_id}
          data={candidate}
          interview_id={data.id}
          from="canPop"
          source="apply"
          type="canRow"
          color={index % 2 === 0 ? "#f1f1f1" : "#fff"}
        />
      );
    });
    let availableCollectedEml = fetchDataFromThirdApp.map(
      (candidate, index) => {
        return (
          <CanOverview
            key={candidate.candidate_id}
            interview_id={data.id}
            data={candidate}
            from="canPop"
            source="collect"
            type="canRow"
            color={index % 2 === 0 ? "#f1f1f1" : "#fff"}
          />
        );
      }
    );

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
                      {availableApplyEml}
                    </Panel>
                    <Panel title="Collected">
                      <CanOverview
                        from="canPop"
                        source="collect"
                        type="partion"
                      />
                      {availableCollectedEml}
                    </Panel>
                  </Tabs>
                </div>
                <h4>Chosen candidates</h4>
                <div className="can-chosen">
                  <div className="interview-candidate-list">
                    <CanOverview from="canPop" source="chosen" type="partion" />
                    {chosenCandidates}
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
export default connect(mapStateToProps, mapDispatchToProps)(CandidatePopup);
