import React, { Component } from "react"
import "./RecruitForm.scss"
import 'bootstrap/dist/css/bootstrap.min.css';


class RecruitSignup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="recruit-signup-container container ">
                <div className="section-name row ">
                    <div className="col-xl shadow-sm p-3 mt-2">
                        <h4 className="mb-0">Create a new recruit post</h4>
                    </div>
                </div>
                <div className="input-fields row ">
                    <div className="input-container col-xl px-5 py-3 ">
                        <div className="single-field py-4">
                            <div className=" font-weight-bold">
                                Title
                            </div>
                            <div className="font-italic">
                                Description here
                            </div>
                            <div>
                                <input />
                            </div>
                        </div>
                        <div className="single-field py-4">
                            <div className="font-weight-bold">
                                Title
                            </div>
                            <div className="font-italic">
                                Description here
                            </div>
                            <div>
                                <input />
                            </div>
                        </div>
                        <div className="single-field py-4">
                            <div className="font-weight-bold">
                                Title
                            </div>
                            <div className="font-italic">
                                Description here
                            </div>
                            <div>
                                <input />
                            </div>
                        </div>
                        <div className="double-field py-4 d-flex flex-row">
                            <div className="field-1 mr-3">
                                <div className=" font-weight-bold">
                                    Title
                                </div>
                                <div className="font-italic">
                                    Description here
                                </div>
                                <div>
                                    <input />
                                </div>
                            </div>
                            <div className="field-1 ml-3">
                                <div className=" font-weight-bold">
                                    Title
                                </div>
                                <div className="font-italic">
                                    Description here
                                </div>
                                <div>
                                    <input />
                                </div>
                            </div>
                        </div>
                        <div className="double-field py-4 d-flex flex-row">
                            <div className="field-1 mr-3">
                                <div className=" font-weight-bold">
                                    Title
                                </div>
                                <div className="font-italic">
                                    Description here
                                </div>
                                <div>
                                    <input />
                                </div>
                            </div>
                            <div className="field-1 ml-3">
                                <div className=" font-weight-bold">
                                    Title
                                </div>
                                <div className="font-italic">
                                    Description here
                                </div>
                                <div>
                                    <input />
                                </div>
                            </div>
                        </div>
                        <div className="double-field py-4 d-flex flex-row">
                            <div className="field-1 mr-3">
                                <div className=" font-weight-bold">
                                    Title
                                </div>
                                <div className="font-italic">
                                    Description here
                                </div>
                                <div>
                                    <input />
                                </div>
                            </div>
                            <div className="field-1 ml-3">
                                <div className=" font-weight-bold">
                                    Title
                                </div>
                                <div className="font-italic">
                                    Description here
                                </div>
                                <div>
                                    <input />
                                </div>
                            </div>
                        </div>
                        <hr style={{ width: '95%' }} />
                        <div className="double-field py-4 d-flex flex-row">
                            <div className="field-1 mr-3">
                                <div className=" font-weight-bold">
                                    Title
                                </div>
                                <div className="font-italic">
                                    Description here
                                </div>
                                <div>
                                    <input />
                                </div>
                            </div>
                            <div className="field-1 ml-3">
                                <div className=" font-weight-bold">
                                    Title
                                </div>
                                <div className="font-italic">
                                    Description here
                                </div>
                                <div>
                                    <input />
                                </div>
                            </div>
                        </div>
                        <div className="double-field py-4 d-flex flex-row">
                            <div className="field-1 mr-3">
                                <div className=" font-weight-bold">
                                    Title
                                </div>
                                <div className="font-italic">
                                    Description here
                                </div>
                                <div>
                                    <input />
                                </div>
                            </div>
                            <div className="field-1 ml-3">
                                <div className=" font-weight-bold">
                                    Title
                                </div>
                                <div className="font-italic">
                                    Description here
                                </div>
                                <div>
                                    <input />
                                </div>
                            </div>
                        </div>
                        <hr style={{ width: '95%' }} />
                    </div>
                </div>
            </div>
        );
    }
}

export default RecruitSignup;