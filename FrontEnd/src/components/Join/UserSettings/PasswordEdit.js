import React from "react";
import "./Settings.scss";
import Swal from "sweetalert2";

class PassworpdEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      new_password: "",
      confirm_new_password: "",
    };
  }
  componentDidMount() {}
  onChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onSaveUpdateUserHandler = () => {
    let { password, new_password, confirm_new_password } = this.state;
    if (password !== this.props.user.password) {
      Swal.fire({
        position: "top",
        type: "error",
        title: "Oops...",
        text: "Your password is not right!",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      this.setState({
        password: "",
        confirm_new_password: "",
        new_password: "",
      });
    } else if (confirm_new_password !== new_password) {
      Swal.fire({
        position: "top",
        type: "error",
        title: "Oops...",
        text: "Your new password is not match!",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      this.setState({
        confirm_new_password: "",
        new_password: "",
      });
    } else {
      this.props.onSaveUpdateUserHandler({ password: this.state.new_password });
      this.props.togglePopUp();
    }
  };
  render() {
    let { password, new_password, confirm_new_password } = this.state;
    console.log(this.state);
    return (
      <div className="join-set-pop-up">
        <div className="join-set-pop-up-inner">
          <h3>Update Password</h3>
          <h3>Enter your password</h3>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.onChangeHandler}
            placeholder="Enter your password ..."
          />
          <h3>Enter new password</h3>
          <input
            type="password"
            name="new_password"
            value={new_password}
            onChange={this.onChangeHandler}
            placeholder="Enter your new password ..."
          />{" "}
          <h3>Confirm new password</h3>
          <input
            type="password"
            name="confirm_new_password"
            value={confirm_new_password}
            onChange={this.onChangeHandler}
            placeholder="Confirm your new password ..."
          />{" "}
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

export default PassworpdEdit;
