import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/index";
import "./Nav.scss";
import { withRouter } from "react-router-dom";

import LoginPopup from "../LoginPopup/LoginPopup";
import SignupPopup from "../SignupPopup/SignupPopup";
import { Menu, Dropdown, Button } from "antd";

class HomeNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPopup: false,
      showSignup: false,
      data: {
        id: 0,
        name: "",
        email: "",
        role_id: 0,
        avatar: "",
        type: 0,
      },
      invitation: [],
    };
  }
  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      this.props.getUser();
      this.props.getInvitationAPI();
    }
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
      token: nextProps.login.token,
      data: nextProps.login,
      invitation: nextProps.invitation,
    });
  }

  dropUserActions = (e) => {
    this.drop.click();
  };
  render() {
    let token = localStorage.getItem("token");
    let { data, invitation } = this.state;
    let { history } = this.props;
    let invitationLength = invitation.length;
    const userActions = (
      <Menu>
        <Menu.Item
          disabled={data.type ? true : false}
          onClick={() => {
            history.push("/cvcreator");
          }}
        >
          Publish your CV
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            history.push("/join");
          }}
        >
          Join The Quiz
        </Menu.Item>
        {data.role_id === 1 ? (
          <Menu.Item
            onClick={() => {
              history.push("/HR");
            }}
          >
            Manage Campaign
          </Menu.Item>
        ) : null}

        <Menu.Item
          onClick={() => {
            history.push("/settings");
          }}
        >
          Setting
        </Menu.Item>
        <Menu.Item
          disabled={invitationLength ? false : true}
          onClick={() => {
            history.push("/invitation");
          }}
        >
          Invitation
          <span className="number-invitation float-right">
            {invitationLength}
          </span>
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            history.push("/");
            localStorage.clear();
          }}
        >
          Log out
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="home-nav-container">
        <div className="logo">
          <img
            className="big-logo"
            src={require("../../../utils/images/logo.png")}
            alt="quiz-icon"
            onClick={() => this.props.history.push("/")}
          />
        </div>
        <div className="button-group">
          {token ? (
            <Dropdown
              overlay={userActions}
              placement="bottomRight"
              trigger={["click"]}
            >
              <Button style={{ top: 0 }}>
                <div className="login-user">
                  <span className="user-ava">
                    <img
                      alt="ava"
                      src={
                        data.avatar
                          ? data.avatar
                          : require("../images/default-ava.png")
                      }
                      className="mr-1"
                    />
                  </span>
                  {data.email}
                </div>
              </Button>
            </Dropdown>
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
    getInvitationAPI: () => {
      dispatch(actions.getInvitationAPI());
    },
  };
};
const mapStateToProps = (state) => {
  return {
    login: state.login,
    invitation: state.invitation,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HomeNav));
