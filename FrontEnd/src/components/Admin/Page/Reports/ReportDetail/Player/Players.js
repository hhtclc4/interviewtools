import React from 'react'
import './Players.scss'
class ReportPlayers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="report-detail-player-container container-fluid ">
                <div className="rd-player-row row shadow-sm d-flex flex-row ">
                    <div className="rdp-ava align-self-center col-1">
                        <img alt="rdp-ava" src={require("../../../../../../utils/images/defaultava.png")} />
                    </div>
                    <div className="rdp-name col-1 align-self-center">Name</div>{/*De so zo*/}
                    <div className="rdp-accuracy-bar col-4 align-self-center">50</div> {/*De so zo*/}
                    <div className="rdp-accuracy-rate col-3 align-self-center">100</div> {/*De so zo*/}
                    <div className="rdp-score col-3 align-self-center">9000</div> {/*De so zo*/}
                </div>
            </div>
        );
    }
}

export default ReportPlayers;