import React from 'react'
import './Overview.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons'

class DiscoverOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="do-container d-flex flex-row">
                <div className="do-recruit-cover-crop">
                    <img src={require("../../images/comp-1.jpg")} alt="cover" />
                </div>
                <div className="do-recruit-info-container d-flex flex-column flex-fill">
                    <div className="do-recruit-title">Title Java Dev</div>
                    <div className="do-recruit-company">Vin Group test</div>
                    <div className="do-recruit-detail d-flex flex-row justify-content-between flex-fill align-items-center">
                        <div className="do-salary">
                            <span className="mr-1"><FontAwesomeIcon icon={faDollarSign} /></span>
                            1000$
                        </div>
                        <div className="do-location">
                            <span className="mr-1"><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
                            Tp.HCM
                        </div>
                        <div className="do-post-time">
                            <span className="mr-1"><FontAwesomeIcon icon={faClock} size="lg" /></span>
                            12 hours ago
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DiscoverOverview;