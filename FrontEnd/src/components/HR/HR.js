import React from 'react'
import './HR.scss'
import HRNav from './Nav/Nav'

class HRstaff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="hr-page-container">
                <HRNav />
                <div className="hr-page-grid">
                    <div className="row">
                        <div className="col-sm-1"></div>
                        <div className="col-xl-9">
                            <div className="hr-created-list  d-flex flex-column ">
                                <div className="hr-campaign-container">
                                </div>
                                <div className="hr-campaign-container">
                                </div>
                            </div>
                            <div className="hr-create-campaign">
                                <button className="create-campaign-btn">Create a new campaign</button>
                            </div>
                        </div>
                        <div className="col-sm-1"></div>
                    </div>
                </div>

            </div>
        );
    }
}

export default HRstaff;