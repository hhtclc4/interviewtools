import React from "react"
import "./RecruitForm.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class RecruitSignup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="recruit-signup-container container ">
                <div className="section-name row pb-3 ">
                    <div className="recruit-title col-xl p-3 mt-2" style={{ backgroundColor: 'white', marginBottom: '10px' }}>
                        <h4 className="mb-0">Create a new recruit post</h4>
                    </div>
                </div>
                <div className="input-fields row ">
                    <div className="input-container col-xl px-5 py-3 ">
                        <div className="single-field py-4">
                            <div className=" font-weight-bold py-1">
                                Title
                            </div>
                            <div className="font-italic py-1 recruit-field-note">
                                Write briefly about position and job
                            </div>
                            <div>
                                <input />
                            </div>
                        </div>
                        <div className="single-field py-4">
                            <div className="font-weight-bold py-1">
                                Branch
                            </div>
                            <div className="font-italic py-1 recruit-field-note">
                                Choose maximum 3 branches from dropdow below
                            </div>
                            <div>
                                <input />
                            </div>
                        </div>
                        <div className="single-field py-4">
                            <div className="font-weight-bold py-1">
                                Destination
                            </div>
                            <div className="font-italic py-1 recruit-field-note">
                                Work station location
                            </div>
                            <div>
                                <input />
                            </div>
                        </div>
                        <div className="double-field py-4 d-flex flex-row">
                            <div className="field-1 mr-3">
                                <div className=" font-weight-bold py-1">
                                    Number of personnel in need
                                </div>
                                <div className="font-italic py-1 recruit-field-note">
                                    Leave this field blank in case of no limit in recruitment
                                </div>
                                <div>
                                    <input />
                                </div>
                            </div>
                            <div className="field-1 ml-3">
                                <div className=" font-weight-bold py-1">
                                    Rank
                                </div>
                                <div className="font-italic py-1 recruit-field-note">
                                </div>
                                <div>
                                    <input />
                                </div>
                            </div>
                        </div>
                        <div className="double-field py-4 d-flex flex-row">
                            <div className="field-1 mr-3">
                                <div className=" font-weight-bold py-1">
                                    Type of work
                                </div>
                                <div className="font-italic py-1 recruit-field-note">
                                </div>
                                <div>
                                    <input />
                                </div>
                            </div>
                            <div className="field-1 ml-3">
                                <div className=" font-weight-bold py-1">
                                    Sex
                                </div>
                                <div className="font-italic py-1 recruit-field-note">
                                </div>
                                <div>
                                    <input />
                                </div>
                            </div>
                        </div>
                        <div className="double-field py-4 d-flex flex-row">
                            <div className="field-1 mr-3">
                                <div className=" font-weight-bold py-1 ">
                                    Salary
                                </div>
                                <div className="font-italic py-1 recruit-field-note">
                                    Set salary available maybe cause reduction in number of applicants
                                </div>
                                <div>
                                    <input />
                                </div>
                            </div>
                            <div className="field-1 ml-3">
                                <div className=" font-weight-bold py-1">
                                    Experience
                                </div>
                                <div className="font-italic py-1 recruit-field-note">
                                </div>
                                <div>
                                    <input />
                                </div>
                            </div>
                        </div>
                        <hr style={{ width: '95%' }} />
                        <div className="double-field py-4 d-flex flex-row">
                            <div className="field-1 mr-3">
                                <div className=" font-weight-bold py-1">
                                    Application Deadline
                                </div>
                                <div className="font-italic py-1 recruit-field-note">
                                    After this date, the recruitment won't be displayed
                                </div>
                                <div>
                                    <input />
                                </div>
                            </div>
                            <div className="field-1 ml-3">
                                <div className=" font-weight-bold py-1">
                                    Name of application receiver
                                </div>
                                <div className="font-italic py-1 recruit-field-note">
                                    Let candidates know receiver name for convenient vocative
                                </div>
                                <div>
                                    <input />
                                </div>
                            </div>
                        </div>
                        <div className="double-field py-4 d-flex flex-row">
                            <div className="field-1 mr-3">
                                <div className=" font-weight-bold py-1">
                                    Email that receive application
                                </div>
                                <div className="font-italic py-1 recruit-field-note">
                                    This email will be received applications
                                </div>
                                <div>
                                    <input />
                                </div>
                            </div>
                            <div className="field-1 ml-3">
                                <div className=" font-weight-bold py-1">
                                    Phone number
                                </div>
                                <div className="font-italic py-1 recruit-field-note">
                                    For contact with candidates
                                </div>
                                <div>
                                    <input />
                                </div>
                            </div>
                        </div>
                        <hr style={{ width: '95%' }} />
                        <div className="editor-field py-4">
                            <div className="font-weight-bold py-1">
                                Job description
                            </div>
                            <div className="font-italic py-1 recruit-field-note">
                                Describe works that depend on recruitment position
                            </div>
                            <Editor
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapper-editor"
                                editorClassName="text-input-editor"
                                onEditorStateChange={this.onEditorStateChange}
                            />
                        </div>
                        <div className="editor-field py-4">
                            <div className="font-weight-bold py-1">
                                Candidate requirements
                            </div>
                            <div className="font-italic py-1 recruit-field-note">
                                Required ability to effort works, prior skills
                            </div>
                            <Editor
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapper-editor"
                                editorClassName="text-input-editor"
                                onEditorStateChange={this.onEditorStateChange}
                            />
                        </div>
                        <div className="editor-field py-4">
                            <div className="font-weight-bold py-1">
                                Candidates benefit
                            </div>
                            <div className="font-italic py-1 recruit-field-note">
                                About insurrance, travel, team building, training,...
                            </div>
                            <Editor
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapper-editor"
                                editorClassName="text-input-editor"
                                onEditorStateChange={this.onEditorStateChange}
                            />
                        </div>
                        <div className="submit-btn d-flex flex-row justify-content-center">
                            <button className="post-btn">Post</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecruitSignup;