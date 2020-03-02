import React from 'react';
import './Editor.scss';

class ShowImportPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="import-popup-container">
                <div className="popup">
                    <form>
                        <div className="popup_inner">
                            <div className="popup-header d-flex flex-row justify-content-start mb-2">
                                <div>
                                    <img style={{ height: '64px', width: '64px', marginRight: '20px' }} src={require("./images/import.png")} alt="import" />
                                </div>
                                <div className="d-flex flex-row align-items-center">
                                    <h3>Import from file</h3>
                                </div>
                            </div>
                            <div className="popup-body mb-2">
                                <p>Description</p>
                                <div className="input-file-container py-5 rounded border d-flex  justify-content-center">
                                    <img style={{ height: '70px', width: '100px' }} src={require("./images/print.png")} alt="print"
                                        className=""
                                    />
                                </div>
                            </div>
                            <div className="popup-footer">
                                <button
                                    onClick={this.props.closePopup}
                                >Close</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default ShowImportPopUp;