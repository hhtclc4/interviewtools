import React from "react";
import "./CanOverview.scss";
import { Tabs, Panel } from "../../../../../../utils/Tab/Tabs";
class NoteandCV extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="row m-0 note-and-cv-popup-container" style={{ height: "fit-content", width: "100%" }}>
        <div className="col-md-12 px-0 d-flex flex-column justify-content-center">
          <div className="note-and-cv-popup-inner">
            <div className="note-and-cv-tabs">
              <Tabs selected={this.props.openTab}>
                <Panel title="CV">
                  <div className="CV-img-container">
                    <img alt="cover" src="https://res.cloudinary.com/hoangclc4/image/upload/v1592023596/ble10sq4tkr1hq3ywseb.png" />
                  </div>
                </Panel>
                <Panel title="Note">
                  <textarea></textarea>
                </Panel>
              </Tabs>
              <button
                className="close-btn float-right"
                onClick={this.props.closePopup}
              >
                Close
                </button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default NoteandCV;
