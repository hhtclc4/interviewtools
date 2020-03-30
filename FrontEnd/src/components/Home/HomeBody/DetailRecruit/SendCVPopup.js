import React from "react";
import './DetailRecruit.scss'
class SendCV extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="send-cv-container send-cv-pop-up">
                <div className="send-cv-pop-up-inner container-fluid">
                    <div className="row" style={{ height: '100%' }}>
                        <div className="col-md-3"></div>
                        <div className="col-lg-6 d-flex flex-column justify-content-around">
                            <div className="send-cv-content border border-dark p-4">
                                <div className="send-cv-header d-flex flex-row  mb-4 ">
                                    <img alt="cv" style={{ height: '60px', marginRight: '10px' }} src={require("../../images/CV.png")} />
                                    <p className="d-flex flex-column justify-content-around">Give us your CV</p>
                                </div>
                                <div className="send-cv-title mb-2"><b>Java Dev (Spring, MVC) ~ 1000$- 2000$ at Techcom Securities</b></div>
                                <div className="send-cv-name d-flex flex-row justify-content-between  mb-2">
                                    <p>Your Name:</p>
                                    <input />
                                </div>
                                <div className="send-cv-email d-flex flex-row justify-content-between  mb-2">
                                    <p>Your Email:</p>
                                    <input />
                                </div>
                                <div className="send-cv-imp-cv d-flex flex-row justify-content-between  mb-2">
                                    <p>Your CV:</p>
                                    <input />
                                </div>
                                <div className="send-cv-special  mb-2">
                                    <p>What skills, work projects or achievements make you a strong candidate?</p>
                                    <textarea className="special-txt" placeholder="Write what make you more special, stronger than other candidates"></textarea>
                                </div>
                                <div className="send-cv-btn-group float-right">
                                    <button className="send-cv-btn">Send my CV</button>
                                    <button
                                        onClick={this.props.closePopup}
                                        className="close-popup-btn"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SendCV;