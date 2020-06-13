import React from "react";
import "./Settings.scss";

class Phone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
    };
  }
  componentDidMount() {
    this.setState({
      phone: this.props.user.phone,
    });
  }
  onChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onSaveUpdateUserHandler = () => {
    this.props.onSaveUpdateUserHandler({ phone: this.state.phone });
    this.props.togglePopUp();
  };
  render() {
    return (
      <div className="join-set-pop-up">
        <div className="join-set-pop-up-inner">
          <h3>Enter Your Phone Number</h3>
          <form>
            <input
              name="phone"
              value={this.state.phone}
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

export default Phone;
