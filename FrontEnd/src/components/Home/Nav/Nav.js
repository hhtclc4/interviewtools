import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/index";
import "./Nav.scss";
import { withRouter } from "react-router-dom";

import LoginPopup from "../LoginPopup/LoginPopup";
import SignupPopup from "../SignupPopup/SignupPopup";
class HomeNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPopup: false,
      checkLogin: false,
      showSignup: false,
      data: {
        id: 0,
        name: "",
        email: "",
        role_id: 0,
        ava: "",
      },
    };
  }
  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) this.props.getUser();
  }
  togglePopup = () => {
    this.setState({
      loginPopup: !this.state.loginPopup,
    });
  };

  toggleSignupPopup = () => {
    this.setState({
      showSignup: !this.state.showSignup,
    });
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      checkLogin: nextProps.login.checkLogin,
      token: nextProps.login.token,
      data: nextProps.login,
    });
    console.log(nextProps);
  }
  render() {
    let token = localStorage.getItem("token");
    let { data } = this.state;
    if (this.state.checkLogin || token) {
      switch (data.role_id) {
        case 1:
          this.props.history.push("/HR");
          break;
        case 2:
          this.props.history.push("/join");
          break;
        default:
          break;
      }
    }
    return (
      <div className="home-nav-container">
        <div className="logo">
          <img
            className="big-logo"
            src={require("../../../utils/images/logo.png")}
            alt="quiz-icon"
          />
        </div>
        <div className="button-group">
          {token ? (
            <div>{data.email}</div>
          ) : (
              <div>
                <button className="b-log-in" onClick={this.togglePopup}>
                  Login
              </button>
                <button className="b-sign-up" onClick={this.toggleSignupPopup}>
                  Sign up
              </button>
              </div>
            )}
        </div>

        {this.state.loginPopup ? (
          <LoginPopup togglePopup={this.togglePopup} />
        ) : null}

        {this.state.showSignup ? (
          <SignupPopup togglePopup={this.toggleSignupPopup} />
        ) : null}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    getUser: () => {
      dispatch(actions.getUser());
    },
  };
};
const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HomeNav));
