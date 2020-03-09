import React from 'react'
import './Players.scss'
class ReportPlayers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="report-detail-player-container ">
                <div className="rd-player-row shadow-sm d-flex flex-row ">
                    <div className="rdp-ava align-self-center">
                        <img alt="rdp-ava" src={require("../../../../../../utils/images/defaultava.png")} />
                    </div>
                    <div className="rdp-name"></div>{/*De so zo*/}
                    <div className="rdp-accuracy-bar"></div> {/*De so zo*/}
                    <div className="rdp-accuracy-rate"></div> {/*De so zo*/}
                    <div className="rdp-score"></div> {/*De so zo*/}
                </div>
            </div>
        );
    }
}

export default ReportPlayers;