import React from 'react'

import './CanOverview.scss'
import { Tabs, Panel } from '../../../utils/Tab/Tabs'
class NoteandCV extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="note-and-cv-popup-container">
                <div className="row m-0" style={{ height: '100%', width: '100%' }} >
                    <div className="col-sm-2"></div>
                    <div className="col-md-8 d-flex flex-column justify-content-center">
                        <div className="note-and-cv-popup-inner">
                            <div className="note-and-cv-tabs">
                                <Tabs selected={this.props.openTab}>
                                    <Panel title="CV">
                                        CV-content
                                    </Panel>
                                    <Panel title="Note">
                                        <textarea></textarea>
                                    </Panel>
                                </Tabs>
                                <button
                                    className="close-btn float-right"
                                    onClick={this.props.closePopup}
                                >Close
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="col-sm-2"></div>
                </div>

            </div>
        );
    }
}

export default NoteandCV;