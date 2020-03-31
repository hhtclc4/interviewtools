import React from 'react'
import './HR.scss'
import HRNav from './Nav/Nav'
import CampaignOverview from './CampaignOverview/CampaignOverview'

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
                    <div className="row" style={{ minHeight: '100%', height: 'fit-content' }}>
                        <div className="col-sm-1"></div>
                        <div className="col-sm-10 hr-manage-container">
                            <div className="hr-manage-header d-flex flex-row justify-content-between">
                                <p className="hr-campaign-count align-self-center">
                                    All campaigns (11)
                                </p>
                                <button className="hr-create-campaign-btn align-self-center">Create new campaign</button>
                            </div>

                            <div className="hr-manage-body d-flex flex-row">
                                <div className="hr-created-list  d-flex flex-column mt-4">
                                    <CampaignOverview />
                                    <CampaignOverview />
                                </div>
                                <div className="hr-manage-stat-container mt-4">
                                    <div className="hr-manage-stat"></div>

                                </div>
                            </div>
                        </div>
                        <div className="col-sm-1"></div>
                    </div>
                </div>
            </div >
        );
    }
}

export default HRstaff;