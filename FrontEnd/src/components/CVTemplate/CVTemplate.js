import React from "react";
import "./CVTemplate.scss";
import { withRouter } from "react-router-dom";
//import EditorConvertToHTML from '../../utils/EditorConvertToHTML/EditorConvertToHTML'
import { Editor } from "react-draft-wysiwyg";
import EmploymentOverview from "./EmploymentOverview/Employment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import EducationOverview from "./EducationOverview/Education";
import SkillOverview from "./SkillOverview/Skill";
import CVPreview from "./CVPreview/CVPreview";

import { connect } from "react-redux";
import * as actions from "../../redux/actions/index";
class CVTemplateCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpemEmp: false,
            user: {
                name: "",
                email: "",
                phone: "",
                avatar: "",
                job_title: "",
            },
            education: [
                {
                    university: "",
                    degree: 0,
                    completion_time: 0,
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
                    exp: 0,
                    city: "",
                    description: "",
                },
            ],
            listSubjects: [
                {
                    id: 0,
                    title: "",
                },
            ],
        };
    }
    componentDidMount() {
        this.props.getUser();
        this.props.showListSubject();
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log(nextProps.user.user);
        this.setState({
            user: nextProps.user.user,
            listSubjects: nextProps.subject.subjects,
        });
    }
    toggleEmpDetail = () => {
        this.setState({
            isOpenEmp: !this.state.isOpenEmp,
        });
    };
    onChangeUserHandler = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        this.setState({
            user: {
                ...this.state.user,
                [name]: value,
            },
        });
    };
    onChangeEducationHandler = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        this.setState({
            education: {
                ...this.state.education,
                [name]: value,
            },
        });
    };
    onChangeSkillsHandler = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        this.setState({
            skills: {
                ...this.state.skills,
                [name]: value,
            },
        });
    };
    onChangeEmploymentHandler = (employment, index) => {
        let temp = [...this.state.employments];
        temp[index] = { ...employment };
        this.setState({
            employments: [...temp],
        });
        console.log("employments", temp);
    };
    onClickAddEmployment = () => {
        let employment = {
            position: 0,
            company: "",
            exp: 0,
            city: "",
            description: "",
        };
        let temp = [...this.state.employments];
        temp.push(employment);
        this.setState({
            employments: [...temp],
        });
        console.log(temp);
    };
    onChangeEducationHandler = (education, index) => {
        let temp = [...this.state.education];
        temp[index] = { ...education };
        this.setState({
            education: [...temp],
        });
        console.log("education", temp);
    };
    onClickAddEducation = () => {
        let edu = {
            university: "",
            degree: 0,
            completion_time: 0,
            description: "",
        };
        let temp = [...this.state.education];
        temp.push(edu);
        this.setState({
            education: [...temp],
        });
        console.log(temp);
    };
    onChangeSkillHandler = (skill, index) => {
        let temp = [...this.state.skills];
        temp[index] = { ...skill };
        this.setState({
            skills: [...temp],
        });
        console.log("skills", temp);
    };
    onClickAddSkill = () => {
        let skill = {
            subject_id: 1,
            level: 0,
            description: "",
        };
        let temp = [...this.state.skills];
        temp.push(skill);
        this.setState({
            skills: [...temp],
        });
        console.log(temp);
    };
    render() {
        let { user, employments, listSubjects, skills, education } = this.state;
        let employmentElm = employments.map((employment, index) => {
            return (
                <EmploymentOverview
                    key={index}
                    index={index}
                    employment={employment}
                    onChangeEmploymentHandler={this.onChangeEmploymentHandler}
                />
            );
        });
        let educationElm = education.map((edu, index) => {
            return (
                <EducationOverview
                    key={index}
                    index={index}
                    education={edu}
                    onChangeEducationHandler={this.onChangeEducationHandler}
                />
            );
        });
        let skillsElm = skills.map((skill, index) => {
            return (
                <SkillOverview
                    key={index}
                    skill={skill}
                    index={index}
                    listSubjects={listSubjects}
                    onChangeSkillHandler={this.onChangeSkillHandler}
                />
            );
        });
        return (
            <div className="cv-creator-container">
                <div className="select-cv-content">
                    <div className="cv-completeness">
                        <div className="cv-completeness-bar"></div>
                    </div>
                    <div className="cv-personal-detail">
                        <div className="cv-section-title">Personal Details</div>
                        <div className="cv-section-input">
                            <div className="half">
                                <div className="cv-input">
                                    {/**component of an input  */}
                                    <div className="cv-input-title">Job title</div>
                                    <div className="cv-input-ipt">
                                        <input
                                            value={user.job_title}
                                            name="job_title"
                                            onChange={this.onChangeUserHandler}
                                        />
                                    </div>
                                </div>
                                <div className="cv-input">
                                    <div className="cv-input-title">name</div>
                                    <div className="cv-input-ipt">
                                        <input value={user.name} name="name" />
                                    </div>
                                </div>
                                <div className="cv-input">
                                    <div className="cv-input-title">email</div>
                                    <div className="cv-input-ipt">
                                        <input value={user.email} name="email" />
                                    </div>
                                </div>
                            </div>
                            <div className="half">
                                <div className="cv-input">
                                    <div className="cv-input-title">Job title</div>
                                    <div className="cv-input-ipt">
                                        <input />
                                    </div>
                                </div>
                                <div className="cv-input">
                                    <div className="cv-input-title">Job title</div>
                                    <div className="cv-input-ipt">
                                        <input />
                                    </div>
                                </div>
                                <div className="cv-preview">
                                    <CVPreview />
                                </div>
                                <div className="cv-input">
                                    <div className="cv-input-title">Phone</div>
                                    <div className="cv-input-ipt">
                                        <input value={user.phone} name="phone" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cv-professional-sumary">
                        <div className="cv-section-title">Professional Summary</div>
                        <p>Include 2-3 clear sentences about your overall experience</p>
                        <Editor />
                    </div>
                    <div className="cv-employment-history">
                        <div className="cv-section-title">Employment History</div>
                        <p>
                            Include your last 10 years of relevant experience and dates in
                            this section. List your most recent position first
            </p>
                        <div className="cv-emp-list">
                            {/**section item control */}
                            {employmentElm}
                            {/**End of section item control */}
                            <button onClick={this.onClickAddEmployment}>
                                <span>
                                    <FontAwesomeIcon icon={faPlus} />
                                    <span>Add Employment</span>
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="cv-education">
                        <div className="cv-section-title">Education</div>
                        <p>
                            If relevant, include your most recent educational achievements and
                            the dates here
            </p>
                        <div className="cv-education-list">
                            {educationElm}
                            <button onClick={this.onClickAddEducation}>
                                <span>
                                    <FontAwesomeIcon icon={faPlus} />
                                    <span>Add Education</span>
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="skill">
                        <div className="cv-section-title">Skills</div>
                        <div className="cv-skill-list">
                            {skillsElm}
                            <button onClick={this.onClickAddSkill}>
                                <span>
                                    <FontAwesomeIcon icon={faPlus} />
                                    <span>Add Skill</span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="cv-preview"></div>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        getUser: () => {
            dispatch(actions.getUser());
        },
        showListSubject: () => {
            dispatch(actions.showListSubject());
        },
    };
};
const mapStateToProps = (state) => {
    return {
        user: state.user,
        subject: state.subject,
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(CVTemplateCreator));
