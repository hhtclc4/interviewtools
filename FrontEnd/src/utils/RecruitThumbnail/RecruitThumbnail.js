import React from 'react';
import './RecruitThumbnail.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import history from '../../history'
class RecruitThumbnail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postFeature: "none",
        }
    }
    render() {

        let { postFeature } = this.state;
        return (
            < div className="recruit-thumb-wrapper " >
                <div className="recruit-thumb-container">
                    <div className="re-crop-img" onClick={() => {
                        history.push("/detail_recruit")
                    }}>
                        <img className="display-center" alt="re-post" src={require("../QuizThumbnail/images/thumbnail.jpg")}
                        />
                    </div>
                    <div className="re-flat-info d-flex flex-row">
                        <div className="re-salary d-flex flex-row">
                            <span className="re-adjust-icon d-flex flex-row justify-content-center">
                                <FontAwesomeIcon icon={faDollarSign} size="sm" color="#FD7E14" />
                            </span>
                            <p>7-10 m</p>
                        </div>
                        <div className="re-destination d-flex flex-row">
                            <span className="re-adjust-icon d-flex flex-row justify-content-center">
                                <FontAwesomeIcon icon={faMapMarkerAlt} color="#FD7E14" />
                            </span>
                            <p>HCM City</p>
                        </div>
                    </div>
                    <div className="re-required-position">
                        <b>FrontEnd Developer</b>
                    </div>

                    <div className="re-company-name">
                        <p>Google INC</p>
                    </div>
                    {postFeature === "new" ?
                        <div className="re-new-recruit">

                        </div>
                        : <div className="re-hot-recruit">

                        </div>
                    }
                </div>
            </div >
        );
    }
}

export default RecruitThumbnail;