import React from "react";
import './NoteAndCV.scss'
import { Tabs, Panel } from '../../../../../utils/Tab/Tabs'
import CVPreview from '../../../../CVTemplate/CVPreview/CVPreview'
import EditorConvertToHTML from '../../../../../utils/EditorConvertToHTML/EditorConvertToHTML'
class AutoNoteAndCV extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "",
                email: "",
                phone: "",
                avatar: "",
                job_title: "",
                description: "",
            },
            education: [
                {
                    university: "",
                    degree: 0,
                    date_begin: "2016-06-14",
                    date_end: "2020-06-14",
                    description: "",
                },
            ],

            skills: [
                {
                    subject_id: 1,
                    level: 0,
                    description: "",
                },
            ],
            employments: [
                {
                    position: 0,
                    company: "",
                    city: "",
                    date_begin: "2016-06-14",
                    date_end: "2020-06-14",
                    description: "",
                },
            ],
            listSubjects: [
                {
                    id: 0,
                    title: "C#",
                },
                {
                    id: 1,
                    title: "C++",
                },
            ],
        }
    }
    onChangeEditorTextHandler = (description) => {
        this.setState({
            user: {
                ...this.state.user,
                description,
            },
        });
    };
    render() {
        let { user, education, skills, employments, listSubjects } = this.state;
        return (
            <div className="auto-note-cv-container">
                <Tabs selected={this.props.active}>
                    <Panel title="CV">
                        <CVPreview
                            user={user}
                            education={education}
                            skills={skills}
                            employments={employments}
                            listSubjects={listSubjects}
                        />
                    </Panel>
                    <Panel title="Note">
                        <EditorConvertToHTML
                            onChangeEditorTextHandler={this.onChangeEditorTextHandler}
                            placeholder="Note something about this candidate"
                            text={user.description === null ? "" : user.description}
                        />
                        <button
                            className="close-btn float-right"
                            onClick={this.props.closePopup}
                        >
                            Close
                  </button>
                        <button
                            className="save-btn float-right mr-2"
                            onClick={this.onClickSaveNote}
                        >
                            Save
                  </button>
                    </Panel>
                </Tabs>
            </div>
        );
    }
}

export default AutoNoteAndCV;