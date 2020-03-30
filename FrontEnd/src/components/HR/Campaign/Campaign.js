import React from 'react'
import './Campaign.scss'
import { Tabs, Panel } from '../../../utils/Tab/Tabs'
import HRInfo from './Info/Info'
import HRInterview from './Interview/Interview'

import HRNav from '../Nav/Nav'
class HRCampaign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="hr-campaign-container">
                <HRNav />
                <div className="hr-campaign-grid">
                    <div className="row">
                        <div className="col-sm-1"></div>
                        <div className="col-xl-10">
                            <div className="hr-campaign-header">
                            </div>
                            <div className="hr-campaign-tabs">
                                <Tabs selected={1}>
                                    <Panel title="Infomation">
                                        <HRInfo />
                                    </Panel>
                                    <Panel title="Interview">
                                        <HRInterview />
                                    </Panel>
                                </Tabs>
                            </div>
                        </div>
                        <div className="col-sm-1"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HRCampaign;