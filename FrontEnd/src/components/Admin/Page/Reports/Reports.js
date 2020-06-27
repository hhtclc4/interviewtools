import React from "react";
import "./Reports.scss";
import ReportQuiz from "./ReportQuiz";
import { connect } from "react-redux";
import * as actions from "../../../../redux/actions/index";
import { withRouter } from "react-router-dom";

class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 0,
          title: "",
          subject_id: 0,
          level_id: 0,
          work_type_id: 0,
          salary: 0,
          user_id: 0,
          work_description: "",
          subjects: [
            {
              id: 0,
              title: "",
            },
          ],
          question_table: {
            id: 0,
            title: "",
            played: 0,
          },
        },
      ],
    };
  }
  componentDidMount() {
    this.props.getListReport();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log("get from redux", nextProps.report);
    this.setState({
      data: nextProps.report,
    });
  }
  render() {
    let { data } = this.state;
    let reportElm = data.map((report) => {
      return <ReportQuiz key={report.id} data={report} />;
    });
    return (
      <div className="reports-page-container container py-4">
        <div className="report-table-header row p-2">
          <div className="col-sm">Quiz name</div>
          <div className="col-sm">Total players</div>
          <div className="col-sm">Campaign</div>
          <div className="col-sm">Status</div>
        </div>
        <div className="report-table-body rounded overflow-hidden">
          {reportElm}
        </div>
        <div className="report-table-pagination"></div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  // connect to redux by function, load data from data base, this is step 2
  return {
    getListReport: () => {
      dispatch(actions.getListReport());
    },
  };
};
const mapStateToProps = (state) => {
  //connect to redux by props, loadded data store here, this is step 3
  return {
    report: state.report,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Reports));
