import React from "react";
import './PageNumber.scss';
import { withRouter } from "react-router-dom";
import PageNumberStart from './Start/Start'
class PageNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { pageNumber } = this.props;
    return (
      <div className="page-number-show-container">
        {/* {pageNumber === 1 ? */}
        <PageNumberStart /> :
        {/* <div className="number-show">{pageNumber}</div> */}
        {/* } */}
      </div>
    );
  }
}

export default withRouter(PageNumber);
