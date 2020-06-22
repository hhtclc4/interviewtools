import React from "react";
import "./CanOverview.scss";
import { Tabs, Panel } from "../../../../../../utils/Tab/Tabs";
import EditorConvertToHTML from "../../../../../../utils/EditorConvertToHTML/EditorConvertToHTML";

class NoteandCV extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        candidate_id: 0,
        cv: "",
        description: "",
      },
    };
  }
  componentDidMount() {
    let { data } = this.props;
    console.log(data);
    this.setState({
      candidate_id: data.candidate_id,
      cv: data.cv,
      description: data.description,
    });
  }
  onChangeEditorTextHandler = (description) => {
    this.setState({
      data: {
        ...this.state.data,
        description,
      },
    });
  };
  onClickSaveNote = () => {
    let { data } = this.state;
    this.props.onClickSaveNote(data.description);
  };
  render() {
    let { data } = this.state;
    return (
      <div
        className="row m-0 note-and-cv-popup-container"
        style={{ height: "fit-content", width: "100%" }}
      >
        <div className="col-md-12 px-0 d-flex flex-column justify-content-center">
          <div className="note-and-cv-popup-inner">
            <div className="note-and-cv-tabs">
              <Tabs selected={this.props.openTab}>
                <Panel title="CV">
                  <div className="CV-img-container">
                    <img alt="cover" src={data.cv} />
                  </div>
                </Panel>
                <Panel title="Note">
                  <EditorConvertToHTML
                    onChangeEditorTextHandler={this.onChangeEditorTextHandler}
                    text={data.description}
                    placeholder="Note something about this candidate"
                  />
                  <button onClick={this.onClickSaveNote}>Save</button>
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
