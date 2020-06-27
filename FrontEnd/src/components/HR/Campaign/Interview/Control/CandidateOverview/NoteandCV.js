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
      data: {
        candidate_id: data.candidate_id,
        cv: data.cv,
        description: data.description,
      }
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
    this.props.closePopup();
  };
  render() {
    let { data } = this.state;
    console.log(data.description)
    // const sampleMarkup = data.description;
    // const blocksFromHTML = convertFromHTML(sampleMarkup);
    // const textState = ContentState.createFromBlockArray(
    //   blocksFromHTML.contentBlocks,
    //   blocksFromHTML.entityMap
    // );
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
                    placeholder="Note something about this candidate"
                    text={this.props.data.description}
                  />
                  <button
                    className="close-btn float-right"
                    onClick={this.props.closePopup}
                  >
                    Close
                  </button>
                  <button
                    className="save-btn float-right mr-2"
                    onClick={this.onClickSaveNote}
                  >
                    Save
                  </button>
                </Panel>
              </Tabs>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NoteandCV;
