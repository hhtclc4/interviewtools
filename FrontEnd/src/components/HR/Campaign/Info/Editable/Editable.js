import React from "react";
import "./Editable.scss";
class HREditable extends React.Component {
  constructor(props) {
    super(props);

    this.editInputRef = React.createRef();
    this.state = {
      data: "",
    };
  }

  UNSAFE_componentWillMount() {
    document.addEventListener("click", this.handleCompClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleCompClick, false);
  }

  handleCompClick = (e) => {
    if (!this.editRef.contains(e.target)) {
      //outside
      this.editInputRef.current.style.border = "none";
      return;
    } else {
      //inside
      this.editInputRef.current.focus();
      this.editInputRef.current.select();
      this.editInputRef.current.style.border = "2px solid #1092f4";
    }
  };

  handleFocus = (e) => {
    e.target.select();
    //set state to compare data and content, if the same, do not send update campaign
    this.setState({
      data: this.props.content,
    });
  };
  onBlurHandler = () => {
    let { data } = this.state;
    let { name, content } = this.props;
    if (data !== content) {
      this.props.onBlurInputHandler(name, data);
    }
  };
  onChangeHandler = (e) => {
    this.setState({
      data: e.target.value,
    });
  };
  render() {
    let { name, title, content } = this.props;
    return (
      <div className="edit-container">
        <div className="edit-title">{title}</div>
        <div
          className="info-title "
          ref={(node) => (this.editRef = node)}
          onClick={this.handleCompClick}
        >
          <input
            defaultValue={content}
            type="text"
            name={name}
            onChange={this.onChangeHandler}
            ref={this.editInputRef}
            onFocus={
              this.props.disabled !== undefined ? null : this.handleFocus
            }
            onBlur={this.onBlurHandler}
            disabled={this.props.disabled !== undefined ? true : false}
          />
        </div>
      </div>
    );
  }
}

export default HREditable;
