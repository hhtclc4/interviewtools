import React, { Component } from "react";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "./EditorConvertToHTML.scss";

class EditorConvertToHTML extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // editorState: EditorState.createWithContent(
      //     textState
      // ),
      editorState: "",
      savedText: "",
    };
  }
  onEditorStateChange = (editorState) => {
    let savedText = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    this.setState({
      editorState,
      savedText,
    });
    this.props.onChangeEditorTextHandler(savedText);
  };

  componentDidMount() {
    let { text } = this.props;
    const sampleMarkup = text;
    const blocksFromHTML = convertFromHTML(sampleMarkup);
    const textState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    this.setState({
      editorState: EditorState.createWithContent(textState),
    });
  }
  render() {
    const { editorState } = this.state;
    return (
      <div className="wysiwyg-com">
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          placeholder={this.props.placeholder}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
          }}
        />
        {/* <textarea
                    className="contain-text-editor"
                    disabled
                    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                /> */}
      </div>
    );
  }
}

export default EditorConvertToHTML;
