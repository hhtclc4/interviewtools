import React from "react";
import "./Settings.scss";
class UserNameEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }
  componentDidMount() {
    this.setState({
      name: this.props.user.name,
    });
  }
  onChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onSaveUpdateUserHandler = () => {
    this.props.onSaveUpdateUserHandler({ name: this.state.name });
    this.props.togglePopUp();
  };
  render() {
    return (
      <div className="join-set-pop-up">
        <div className="join-set-pop-up-inner">
          <h3>Pick a funny and cool name</h3>
          <form>
            <input
              name="name"
              value={this.state.name}
              onChange={this.onChangeHandler}
            />
          </form>
          <div className="set-btn-group">
            <button className="set-cancel-btn" onClick={this.props.togglePopUp}>
              Cancel
            </button>
            <button
              onClick={this.onSaveUpdateUserHandler}
              className="set-save-btn"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserNameEdit;
