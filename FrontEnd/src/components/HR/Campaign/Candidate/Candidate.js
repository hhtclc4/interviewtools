import React from "react";
import "./Candidate.scss";
import { Tabs, Panel } from "../../../../utils/Tab/Tabs";
import { connect } from "react-redux";
import * as actions from "../../../../redux/actions/index";
import CanOverview from "../Interview/Control/CandidateOverview/CanOverview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCubes, faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import AvailCandidate from "../../AvailCandidate/Candidate";
import { withRouter } from "react-router-dom";

class HRCandidate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaign_id: this.props.match.params.campaign_id,

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
          user_id: 10000,
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
          user_id: 10001,
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
    let {
      availableCandidates,
      fetchDataFromThirdApp,
      campaign_id,
    } = this.state;
    // let { data } = this.props;
    let availableApplyEml = availableCandidates.map((candidate, index) => {
      return (
        <CanOverview
          key={candidate.campaign_id + candidate.user_id}
          data={candidate}
          from="hr"
          source="apply"
          type="canRow"
          display={true}
          // color={index % 2 === 0 ? "#f1f1f1" : "#fff"}
          color="#fff"
        />
      );
    });
    // let availableCollectedEml = fetchDataFromThirdApp.map(
    //   (candidate, index) => {
    //     return (
    //       <CanOverview
    //         key={candidate.candidate_id}
    //         data={candidate}
    //         from="hr"
    //         source="collect"
    //         type="canRow"
    //         // color={index % 2 === 0 ? "#f1f1f1" : "#fff"}
    //         color="#fff"
    //         display={true}
    //       />
    //     );
    //   }
    // );
    return (
      <div className="hr-candidate-container">
        <div className="hr-can-body mt-4">
          <div className="hr-can-header">Available candidates</div>
          <hr />
          <div className="hr-can-body-tabs">
            <Tabs selected={0}>
              <Panel
                title="Applied"
                iconAwe={
                  <FontAwesomeIcon icon={faEnvelopeOpen} color="#337ab7" />
                }
              >
                <CanOverview
                  from="hr"
                  source="apply"
                  type="partion"
                  display={true}
                  color="#fff"
                />
                {availableApplyEml}
              </Panel>
              <Panel
                title="Collected"
                iconAwe={<FontAwesomeIcon icon={faCubes} color="#337ab7" />}
              >
                {/* <CanOverview
                  from="hr"
                  source="collect"
                  type="partion"
                  display={true}
                  color="#fff"
                /> */}
                {/* {availableCollectedEml} */}
                <AvailCandidate from="Campaign" campaign_id={campaign_id} />
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HRCandidate));
