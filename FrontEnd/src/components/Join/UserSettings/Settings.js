import React from "react";
import "./Settings.scss";
import JoinNav from "../Nav/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faUser,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";
import * as actions from "../../../redux/actions/index";
import UserNameEdit from "./UserNameEdit";
import Phone from "./Phone";
import PasswordEdit from "./PasswordEdit";
import PopUp from "../../../utils/PopUp/PopUp";
import UpgradeAcc from "./UpgradeAcc";
import { withRouter } from "react-router-dom";
class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowAvaEdit: false,
      isShowUserNameEdit: false,
      isShowPhoneEdit: false,
      isShowPasswordEdit: false,
      isShowDeleteAcc: false,
      isShowUpgradeAcc: false,
      user: {
        id: 0,
        name: "",
        role_id: 0,
        avatar: "",
        email: "",
        password: "",
        phone: "",
      },
    };
  }
  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) this.props.getUser();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.user.user,
    });
  }
  togglePopups = (type) => {
    switch (type) {
      case "ava": {
        this.setState({
          isShowAvaEdit: !this.state.isShowAvaEdit,
        });

        break;
      }

      case "username": {
        this.setState({
          isShowUserNameEdit: !this.state.isShowUserNameEdit,
        });

        break;
      }

      case "phone": {
        this.setState({
          isShowPhoneEdit: !this.state.isShowPhoneEdit,
        });

        break;
      }

      case "password": {
        this.setState({
          isShowPasswordEdit: !this.state.isShowPasswordEdit,
        });

        break;
      }

      case "upgradeAcc": {
        this.setState({
          isShowUpgradeAcc: !this.state.isShowUpgradeAcc,
        });

        break;
      }

      default:
        return;
    }
  };
  onSaveUpdateUserHandler = (data) => {
    this.props.updateUser({ ...this.state.user, ...data });
  };
  fileChangedHandler = (event) => {
    let fileReader = new FileReader();
    if (event.target.files[0]) {
      fileReader.readAsDataURL(event.target.files[0]); // fileReader.result -> URL.
      fileReader.onload = (progressEvent) => {
        let url = fileReader.result;
        this.props.uploadAvatarImage(url);
      };
    }
  };
  render() {
    let { user } = this.state;
    let { history } = this.props;
    return (
      <div className="settings-wrapper">
        <JoinNav />
        <div className="settings-container">
          <h3 className="page-title">Settings</h3>
          <div className="profile-settings">
            <div className="set-section-name">
              <span style={{ marginRight: "10px" }}>
                <FontAwesomeIcon icon={faUser} color="#FD7E14" />
              </span>
              Profile
            </div>
            <div className="set-ava" onClick={() => this.fileInput.click()}>
              <input
                style={{ display: "none" }}
                type="file"
                onChange={this.fileChangedHandler}
                ref={(fileInput) => (this.fileInput = fileInput)}
              />
              <div className="settings-section">
                <div className="set-section-title">Avatar</div>
                <div className="set-section-content">Picture</div>
              </div>
              <span className="set-icon">
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </div>
            <div
              className="set-user-name"
              onClick={() => this.togglePopups("username")}
            >
              <div className="settings-section">
                <div className="set-section-title">User Name</div>
                <div className="set-section-content">{user.name}</div>
              </div>
              <span className="set-icon">
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </div>

            <div
              className="set-grade"
              onClick={() => {
                this.togglePopups("phone");
              }}
            >
              <div className="settings-section">
                <div className="set-section-title">Phone</div>
                <div className="set-section-content">
                  {user.phone !== "" ? user.phone : "N/A"}
                </div>
              </div>
              <span className="set-icon">
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </div>
          </div>

          <div className="account-settings" style={{ marginTop: "30px" }}>
            <div className="set-section-name">
              <span style={{ marginRight: "10px" }}>
                <FontAwesomeIcon icon={faCogs} color="#FD7E14" />
              </span>
              Account settings
            </div>

            <div
              className="set-upgrade-role-section"
              onClick={() => {
                this.togglePopups("upgradeAcc");
              }}
            >
              <div className="sec-title">Update role</div>
              <span>
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </div>

            <div
              className="set-update-pass-section"
              onClick={() => {
                this.togglePopups("password");
              }}
            >
              <div className="sec-title">Update password</div>
              <span>
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </div>

            <div
              className="set-logout-section"
              onClick={() => {
                history.push("/");
                localStorage.clear();
              }}
            >
              <div className="sec-title">Log out</div>
              <span>
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </div>
          </div>
        </div>

        {this.state.isShowUserNameEdit ? (
          <UserNameEdit
            togglePopUp={() => this.togglePopups("username")}
            onSaveUpdateUserHandler={this.onSaveUpdateUserHandler}
            user={user}
          />
        ) : null}

        {this.state.isShowPhoneEdit ? (
          <Phone
            togglePopUp={() => this.togglePopups("phone")}
            onSaveUpdateUserHandler={this.onSaveUpdateUserHandler}
            user={user}
          />
        ) : null}

        {this.state.isShowPasswordEdit ? (
          <PasswordEdit
            togglePopUp={() => this.togglePopups("password")}
            onSaveUpdateUserHandler={this.onSaveUpdateUserHandler}
            user={user}
          ></PasswordEdit>
        ) : null}
        {this.state.isShowUpgradeAcc ? (
          <PopUp
            openPop={(open) => {
              this.setState({
                isShowUpgradeAcc: !open,
              });
            }}
          >
            <UpgradeAcc
              onSaveUpdateUserHandler={this.onSaveUpdateUserHandler}
              user={user}
              togglePopUp={() => this.togglePopups("upgradeAcc")}
            />
          </PopUp>
        ) : null}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    updateUser: (user) => {
      dispatch(actions.updateUser(user));
    },
    getUser: () => {
      dispatch(actions.getUser());
    },
    uploadAvatarImage: (file) => {
      dispatch(actions.uploadAvatarImage(file));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    questionTable: state.questionTable,
    user: state.user,
    completed: state.completed,
    subject: state.subject,
    campaigns: state.campaigns,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserSettings));
