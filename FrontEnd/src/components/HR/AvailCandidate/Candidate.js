import React from "react";
import "./Candidate.scss";
import CollectedCan from "./CollectedCan/Collect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Checkbox } from "antd";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/index";
class AvailCandidate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positions: [
        { index: 0, title: "Tester" },
        { index: 1, title: "System Analyst" },
        { index: 2, title: "Dev OP" },
        { index: 3, title: "Business Analyst" },
        { index: 4, title: "PM" },
        { index: 5, title: "FrontEnd Developer" },
        { index: 6, title: "BackEnd Developer" },
        { index: 7, title: "Cloud Computing Engineer" },
        { index: 8, title: "Database Administrator" },
        { index: 9, title: "Other..." },
      ],
      degrees: ["Associate", "Bachelor", "Master", "Doctoral"],
      listSubjects: [{ id: 0, title: "C++" }],
      collectedCandidates: [
        {
          id: 0,
          name: "",
          email: "",
          phone: "",
          avatar: "",
          education: {
            degree: 0,
          },
          subjects: [{ id: 0, title: "", skills: {} }],

          employments: [
            {
              position: 0,
            },
          ],
          type: 0,
          description: "",
        },
      ],
      positionsFilter: [],
      skillsFilter: [],
      degree: null,
    };
  }
  componentDidMount() {
    this.props.showListSubject();
    this.props.showCollectedCandidates();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      listSubjects: nextProps.subject.subjects,
      collectedCandidates: nextProps.collectedCandidates,
    });
  }
  onChangeFilter = (e, index, type) => {
    let { positionsFilter, skillsFilter, degree } = this.state;
    let temp;
    if (type === "positions") {
      temp = [...positionsFilter];
      if (e.target.checked) temp.push(index);
      else {
        for (let i = 0; i < temp.length; i++)
          if (temp[i] === index) {
            temp.splice(i, 1);
            break;
          }
      }
      this.setState({
        positionsFilter: [...temp],
      });
      this.props.filterCollectedCandidatesAPI(skillsFilter, degree, temp);
    }
    if (type === "skills") {
      temp = [...skillsFilter];
      if (e.target.checked) temp.push(index);
      else {
        for (let i = 0; i < temp.length; i++)
          if (temp[i] === index) {
            temp.splice(i, 1);
            break;
          }
      }
      this.setState({
        skillsFilter: [...temp],
      });
      this.props.filterCollectedCandidatesAPI(temp, degree, positionsFilter);
    }
    if (type === "degree") {
      temp = degree;
      if (e.target.checked) temp = index;
      else temp = null;
      this.setState({
        degree: temp,
      });
      this.props.filterCollectedCandidatesAPI(
        skillsFilter,
        temp,
        positionsFilter
      );
    }
  };

  render() {
    let { positions, degrees, listSubjects, collectedCandidates } = this.state;
    let collectCanElm = collectedCandidates.map((can) => {
      return (
        <CollectedCan key={can.id} data={can} listSubjects={listSubjects} />
      );
    });
    let positionFilter = positions.map((position) => {
      return (
        <Checkbox
          key={position.index}
          onChange={(e) => this.onChangeFilter(e, position.index, "positions")}
        >
          {position.title}
        </Checkbox>
      );
    });
    let exps = [1, 2, 3, 4, 5, 10];
    let expFilter = exps.map((exp) => {
      return <Checkbox key={exp}>{exp} year +</Checkbox>;
    });
    let degreesFilter = degrees.map((degree, index) => {
      return (
        <Checkbox
          key={index}
          onChange={(e) => this.onChangeFilter(e, index, "degree")}
        >
          {degree}
        </Checkbox>
      );
    });
    let skillsFilter = listSubjects.map((skill) => {
      return (
        <Checkbox
          key={skill.id}
          onChange={(e) => this.onChangeFilter(e, skill.id, "skills")}
        >
          {skill.title}
        </Checkbox>
      );
    });
    return (
      <div className="avail-candidate-container"
        style={this.props.from === "Campaign" ? { padding: '0 10px', paddingBottom: '25px', marginTop: '0' } : {}}
      >
        <div className="a-can-search"
          style={this.props.from === "Campaign" ? { display: 'none' } : {}}
        >
          <input
            name="search"
            className="search-ipt"
            placeholder="Search jobs ..."
          />
          <button
            className="search-btn"
          >
            Search
          </button>
        </div>
        <div className="a-can-header">
          <div className="a-can-header-title">Collected Candidates</div>
        </div>
        <div className="a-can-body">
          <div className="a-can-list">{collectCanElm}</div>
          <div className="a-can-filters">
            <div className="a-can-feature-filter">
              <div className="a-can-filter-header">
                Position
                <span className="float-right">
                  <FontAwesomeIcon icon={faPlus} size="lg" color="#999" />
                </span>
              </div>
              <div className="a-can-filter-body">{positionFilter}</div>
            </div>
            <div className="a-can-feature-filter">
              <div className="a-can-filter-header">
                Years Experience
                <span className="float-right">
                  <FontAwesomeIcon icon={faPlus} size="lg" color="#999" />
                </span>
              </div>
              <div className="a-can-filter-body">{expFilter}</div>
            </div>
            <div className="a-can-feature-filter">
              <div className="a-can-filter-header">
                Degree Type
                <span className="float-right">
                  <FontAwesomeIcon icon={faPlus} size="lg" color="#999" />
                </span>
              </div>
              <div className="a-can-filter-body">{degreesFilter}</div>
            </div>
            <div className="a-can-feature-filter">
              <div className="a-can-filter-header">
                Skills
                <span className="float-right">
                  <FontAwesomeIcon icon={faPlus} size="lg" color="#999" />
                </span>
              </div>
              <div className="a-can-filter-body">{skillsFilter}</div>
            </div>
            <div className="a-can-feature-filter">
              <div className="a-can-filter-header">
                Levels
                <span className="float-right">
                  <FontAwesomeIcon icon={faPlus} size="lg" color="#999" />
                </span>
              </div>
              <div className="a-can-filter-body">
                <Checkbox>Intern</Checkbox>
                <Checkbox>Fresher</Checkbox>
                <Checkbox>Senior</Checkbox>
                <Checkbox>Master</Checkbox>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//send action to redux
const mapDispatchToProps = (dispatch, props) => {
  return {
    showListSubject: () => {
      dispatch(actions.showListSubject());
    },
    showCollectedCandidates: () => {
      dispatch(actions.showCollectedCandidates());
    },
    filterCollectedCandidatesAPI: (skills, degree, positions) => {
      dispatch(actions.filterCollectedCandidatesAPI(skills, degree, positions));
    },
  };
};
//get data from redux
const mapStateToProps = (state) => {
  return {
    subject: state.subject,
    collectedCandidates: state.collectedCandidates,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AvailCandidate));
