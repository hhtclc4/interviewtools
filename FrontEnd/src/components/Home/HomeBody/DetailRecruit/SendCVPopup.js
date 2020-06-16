import React from "react";
import "./DetailRecruit.scss";
import LoginPopup from "../../LoginPopup/LoginPopup";
import { connect } from "react-redux";
import * as actions from "../../../../redux/actions/index";
import { withRouter } from "react-router-dom";
import { FileJpgOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import EditorConvertToHTML from "../../../../utils/EditorConvertToHTML/EditorConvertToHTML";

class SendCV extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPopup: false,
      user: {
        name: "",
        email: "",
        checkLogin: false,
      },
      candidate: {
        campaign_id: this.props.data.id,
        cv: "",
        description: "",
      },
    };
  }
  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) this.props.getUser();
  }
  toggleLoginPopup = () => {
    this.setState({
      loginPopup: !this.state.loginPopup,
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log("nextprop", nextProps);
    if (nextProps.candidate.campaign_id !== 0) {
      Swal.fire({
        position: "center",
        type: "success",
        title: "Send Successfully",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      this.props.toggleSendCVPopUp();
    } else {
      this.setState({
        user: { ...nextProps.login },
      });
      if (nextProps.candidate.isSendCvBefore) {
        this.props.toggleSendCVPopUp();
      }
    }
  }
  onChangeInputHandler = (e) => {
    this.setState({
      candidate: { ...this.state.candidate, [e.target.name]: e.target.value },
    });
  };
  onClickSendCV = () => {
    this.props.createCandidate(this.state.candidate);
  };
  onChangeEditorTextHandler = (description) => {
    this.setState({
      candidate: {
        ...this.state.candidate,
        description,
      },
    });
  };
  fileChangedHandler = (event) => {
    let fileReader = new FileReader();
    let { candidate } = this.state;
    if (event.target.files[0]) {
      fileReader.readAsDataURL(event.target.files[0]); // fileReader.result -> URL.
      fileReader.onload = (progressEvent) => {
        let url = fileReader.result;
        //console.log("url", url);
        // Something like: data:image/png;base64,iVBORw...Ym57Ad6m6uHj96js
        this.setState({
          candidate: {
            ...candidate,
            cv: url,
          },
        });
      };
    }
  };
  render() {
    let { data } = this.props;
    let { user } = this.state;
    let stringSubject = "";
    data.subjects.map((subject) => {
      return (stringSubject += ` ${subject.title}`);
    });

    let formCV = () => {
      return (
        <div>
          <div className="send-cv-name d-flex flex-row justify-content-between  mb-2">
            <p>Your Name: {user.name}</p>
          </div>
          <div className="send-cv-email d-flex flex-row justify-content-between  mb-2">
            <p>Your Email: {user.email}</p>
          </div>
          <div className="send-cv-imp-cv d-flex flex-row justify-content-between  mb-2">
            <p>Your CV:</p>
            <FileJpgOutlined onClick={() => this.fileInput.click()} />
            <input
              style={{ display: "none" }}
              type="file"
              onChange={this.fileChangedHandler}
              ref={(fileInput) => (this.fileInput = fileInput)}
            />
          </div>
          <div className="send-cv-special  mb-2">
            <p>
              What skills, work projects or achievements make you a strong
              candidate?
            </p>
            <EditorConvertToHTML
              onChangeEditorTextHandler={this.onChangeEditorTextHandler}
              text=""
              placeholder="Write what make you more special, stronger than other candidates"
            />
            {/* <textarea
              name="description"
              value={candidate.description}
              onChange={this.onChangeInputHandler}
              className="special-txt"
              placeholder="Write what make you more special, stronger than other candidates"
            ></textarea> */}
          </div>
          <div className="send-cv-btn-group float-right">
            <button className="send-cv-btn" onClick={this.onClickSendCV}>
              Send my CV
            </button>
            <button
              onClick={this.props.toggleSendCVPopUp}
              className="close-popup-btn"
            >
              Close
            </button>
          </div>
        </div>
      );
    };
    return (
      <div className="send-cv-container send-cv-pop-up">
        <div className="send-cv-pop-up-inner container-fluid">
          <div className="row" style={{ height: "100%" }}>
            <div className="col-md-3"></div>
            <div className="col-lg-6 d-flex flex-column justify-content-around">
              <div className="send-cv-content border border-dark p-4">
                <div className="send-cv-header d-flex flex-row  mb-4 ">
                  <img
                    alt="cv"
                    style={{ height: "60px", marginRight: "10px" }}
                    src={require("../../images/CV.png")}
                  />
                  <p className="d-flex flex-column justify-content-around">
                    Give us your CV
                  </p>
                </div>
                <div className="send-cv-title mb-2">
                  <b>
                    {data.title} ({stringSubject}) ~ 1000$- 2000$ at Techcom
                    Securities
                  </b>
                </div>
                {localStorage.getItem("token") ? (
                  formCV()
                ) : (
                  <div className="send-cv-btn-group float-right">
                    <button
                      className="login-button"
                      onClick={this.toggleLoginPopup}
                    >
                      Login
                    </button>
                    <button
                      onClick={this.props.toggleSendCVPopUp}
                      className="close-popup-btn"
                    >
                      Close
                    </button>
                  </div>
                )}
                {this.state.loginPopup ? (
                  <LoginPopup
                    togglePopup={this.toggleLoginPopup}
                    doneLogin={this.doneLogin}
                  />
                ) : null}
              </div>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    loginAPI: (state) => {
      dispatch(actions.loginAPI(state));
    },
    getUser: () => {
      dispatch(actions.getUser());
    },
    createCandidate: (data) => {
      dispatch(actions.createCandidate(data));
    },
    checkIfCandidateSendCVBefore: (campaign_id) => {
      dispatch(actions.checkIfCandidateSendCVBefore(campaign_id));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    login: state.login,
    candidate: state.candidate,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SendCV));
