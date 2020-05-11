import React from "react";
import "./SignupPopup.scss";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSignature, faLock, faClipboardCheck, faPhone, faRandom } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope, faBuilding } from '@fortawesome/free-regular-svg-icons'
import GoogleLogin from 'react-google-login';
import { Select } from 'antd';

const { Option } = Select;
class SignupPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowSignup: false,
    };
  }

  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  render() {
    let { isShowSignup } = this.state;

    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option className="ant-option-signup" key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    return (
      <div className="signup-pop-container">
        <div className="signup-pop-inner-container">
          <div className="row" style={{ height: '100%', width: '100%' }}>
            <div className="col-sm-3"></div>
            <div className="col-md-6 d-flex flex-column justify-content-center">
              <div className="signup-pop-inner-crop"
                style={isShowSignup ? { height: '20%' } : {}}
              >
                <img className="signup-pop-inner-img"
                  alt="cover"
                  src={require("../images/signupcover.png")}
                >
                </img>
              </div>
              <div className="signup-pop-inner"
                style={isShowSignup ? { height: '70%' } : {}}
              >
                <div className="signup-header">
                  <div className="signup-header-text text-center">
                    <p>Don't lose your vocation-</p>
                    <p>Create a free account</p>
                  </div>
                  <button className="signup-close-btn"
                    onClick={this.props.togglePopup}
                  ><FontAwesomeIcon icon={faTimes} size="1x" color="#ff4d4d" /></button>
                  <div className="some-dash"></div>
                </div>
                <div className="signup-body text-center">
                  <p>Sign up:</p>
                  <GoogleLogin
                    clientId="834803701033-g7ml11mlo6ltssrujeoh14pc279v1dkd.apps.googleusercontent.com"
                    disabled={false}
                    className="custom-signup-btn"
                  >
                  </GoogleLogin>

                  <div className="divide-or">
                    <p>-or-</p>
                  </div>

                  <div className="signup-email text-center">
                    <p>Sign up with email</p>
                    <div className="signup-email-input-group">
                      <span className="signup-email-icon"><FontAwesomeIcon icon={faEnvelope} color="#808080" /></span>
                      <input type="text" className="signup-email-ipt"
                        placeholder="example@gmail.com"
                        onClick={() => {
                          this.setState({
                            isShowSignup: true
                          })
                        }}
                      />
                    </div>
                    <div className={isShowSignup ? "signup-via-email-group" : "signup-via-email-group d-none"} >
                      <div className="signup-group ">{/**name */}
                        <span className="signup-email-icon"><FontAwesomeIcon icon={faSignature} color="#808080" /></span>
                        <input type="text"
                          placeholder="Enter your name ..."
                        />
                      </div>
                      <div className="signup-group">{/**pass */}
                        <span className="signup-email-icon"><FontAwesomeIcon icon={faLock} color="#808080" /></span>
                        <input type="text"
                          placeholder="Enter your password ..."
                        />
                      </div>
                      <div className="signup-group">{/**confirm pass */}
                        <span className="signup-email-icon"><FontAwesomeIcon icon={faClipboardCheck} color="#808080" /></span>
                        <input type="text"
                          placeholder="Confirm your password ..."
                        />
                      </div>
                      <div className="signup-ant-group">{/**company */}
                        <span className="signup-email-icon"><FontAwesomeIcon icon={faBuilding} color="#808080" /></span>
                        <Select mode="tags" placeholder="Select company"
                          style={{ width: '50%', marginBottom: '5px' }}
                          onChange={this.handleChange} tokenSeparators={[',']}>
                          {children}
                        </Select>
                      </div>
                      <div className="signup-ant-group">{/**role */}
                        <span className="signup-email-icon"><FontAwesomeIcon icon={faRandom} color="#808080" /></span>
                        <Select mode="multiple" placeholder="Select role"
                          style={{ width: '50%', marginBottom: '5px' }}
                          onChange={this.handleChange} tokenSeparators={[',']}
                        >
                          {children}
                        </Select>
                      </div>
                      <div className="signup-group"> {/**phone */}
                        <span className="signup-email-icon"><FontAwesomeIcon icon={faPhone} color="#808080" /></span>
                        <input type="text"
                          placeholder="Enter your phone number ..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="signup-footer d-flex flex-row justify-content-center">
                  <p>Already have an account</p>
                  <button className="login-btn">
                    Login
                  </button>
                </div>
              </div>
            </div>
            <div className="col-sm-3"></div>
          </div>

        </div>
      </div>
    );
  }
}

export default withRouter(SignupPopup);
