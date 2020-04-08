import React from "react";
import "./Campaign.scss";
import { Tabs, Panel } from "../../../utils/Tab/Tabs";
import HRInfo from "./Info/Info";
import HRInterview from "./Interview/Interview";
import { withRouter } from "react-router-dom";

import HRNav from "../Nav/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt, faCopy } from "@fortawesome/free-regular-svg-icons";
class HRCampaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="hr-campaign-container">
        <HRNav />
        <div className="hr-campaign-grid">
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-xl-10">
              <div className="hr-campaign-header p-2 d-flex flex-row">
                <div className="hr-crop-img">
                  <img className="hr-recruit-img" alt="recruit" src={require("../images/Interview.png")} />
                </div>

                <div className="hr-campaign-header-info">
                  <div className="hr-header-title text-truncate">Java Developer Core banking(T24)Java Developer Core banking(T24)Java Developer Core banking(T24)</div>
                </div>
                <div className="hr-campaign-header-options  d-flex flex-row  align-items-start justify-content-around">
                  <span className="hr-option-background">
                    <FontAwesomeIcon icon={faCopy} color="#545461" />
                  </span>
                  <span className="hr-option-background">
                    <FontAwesomeIcon icon={faPencilAlt} color="#545461" />
                  </span>
                  <span className="hr-option-background">
                    <FontAwesomeIcon icon={faTrashAlt} color="#545461" />
                  </span>

                </div>
              </div>
              <div className="hr-campaign-tabs">
                <Tabs selected={0}>
                  <Panel title="Infomation">
                    <HRInfo />
                  </Panel>
                  <Panel title="Interview">
                    <HRInterview />
                  </Panel>
                </Tabs>
              </div>
            </div>
            <div className="col-sm-1"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(HRCampaign);
