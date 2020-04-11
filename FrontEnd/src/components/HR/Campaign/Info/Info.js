import React from "react";
import "./Info.scss";
import { withRouter } from "react-router-dom";
import HREditable from "./Editable/Editable";
import "bootstrap/dist/css/bootstrap.min.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { Select } from "antd";
import { connect } from "react-redux";
import * as actions from "../../../../redux/actions/index";
const { Option } = Select;
class HRInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      data: {
        id: 0,
        title: "",
        subject_id: 0,
        company_address: "",
        level_id: 0,
        amount_required: "",
        work_type_id: 0,
        experience: 0,
        salary: "",
        deadline: "",
        user_id: 0,
        work_description: "",
        candidate_req: "",
        candidate_benefits: "",
        location: "",
        subjects: [
          {
            id: 0,
            title: "",
          },
        ],
        user: {
          name: "",
          email: "",
          phone: "",
        },
        level: {
          id: 0,
          name: "",
        },
        work_type: {
          id: 0,
          name: "",
        },
      },
      listSubjects: [{ id: 0 }],
      listLevels: [{ id: 0 }],
      listWorkTypes: [{ id: 0 }],

      campaign_id: this.props.match.params.campaign_id,
    };
  }
  componentDidMount() {
    let { campaign_id } = this.state;
    this.props.showCampaign(campaign_id);
    this.props.showListSubject();
    this.props.showListWorkType();
    this.props.showListLevel();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      data: nextProps.campaign,
      listSubjects: nextProps.subject.subjects,
      listLevels: nextProps.level,
      listWorkTypes: nextProps.work_type,
    });
  }
  handleButtonClick = (e) => {
    console.log("click left button", e);
  };

  handleMenuClick = (e) => {
    console.log("click", e);
  };

  onChangeSelectSingle = (key, value) => {
    let { data } = this.state;
    this.props.updateCampaign({ ...data, [key]: value });
  };
  onChangeSelectMulti = (arrValue) => {
    let { data, campaign_id, listSubjects } = this.state;
    let campaign_subject = [];
    let newSubjects = [];
    for (let i = 0; i < arrValue.length; i++) {
      campaign_subject.push({ campaign_id, subject_id: arrValue[i] });
      newSubjects.push(listSubjects.find((sub) => sub.id === arrValue[i]));
    }

    this.props.updateCampaign({
      ...data,
      subjects: newSubjects,
      campaign_subject,
    });
  };
  onBlurInputHandler = (key, value) => {
    let { data } = this.state;
    this.props.updateCampaign({ ...data, [key]: value });
  };
  levelMenu = () => {
    let { listLevels } = this.state;
    let menu = listLevels.map((level) => {
      return (
        <Option key={level.id} value={level.id}>
          {level.name}
        </Option>
      );
    });
    return menu;
  };
  workTypeMenu = () => {
    let { listWorkTypes } = this.state;
    let menu = listWorkTypes.map((type) => {
      return (
        <Option key={type.id} value={type.id}>
          {type.name}
        </Option>
      );
    });
    return menu;
  };
  subjectMenu = () => {
    let { listSubjects } = this.state;
    let menu = listSubjects.map((subject) => {
      return (
        <Option key={subject.id} value={subject.id}>
          {subject.title}
        </Option>
      );
    });
    return menu;
  };
  experienceMenu = () => {
    let arr = [0, 1, 2, 3];
    let menu = arr.map((num) => {
      return (
        <Option key={num} value={num}>
          {num === 0 ? "Non require" : `${num} years`}
        </Option>
      );
    });
    return menu;
  };
  render() {
    let { data } = this.state;

    let levelMenu = this.levelMenu();
    let workTypeMenu = this.workTypeMenu();
    let currentSubjects = data.subjects.map((subject) => {
      return subject.id;
      // [1,2,3]
    });
    let subjectMenu = this.subjectMenu();
    let experienceMenu = this.experienceMenu();
    return (
      <div className="hr-info-container container-fluid">
        <div className="hr-info-single-field">
          <HREditable
            title="Title"
            name="title"
            content={data.title}
            onBlurInputHandler={this.onBlurInputHandler}
          />
        </div>
        <div className="hr-info-single-field">
          <div className="hr-info-combobox-field">
            <div className="hr-title-field font-weight-bold py-1  ml-0 ">
              Braches
            </div>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Please select"
              onChange={this.onChangeSelectMulti}
              value={currentSubjects}
            >
              {subjectMenu}
            </Select>
          </div>
        </div>
        <div className="hr-info-single-field">
          <HREditable
            title="Company Adress"
            name="company_address"
            content={data.company_address}
            onBlurInputHandler={this.onBlurInputHandler}
          />
        </div>
        <div className="hr-info-double-field d-flex flex-row container-fluid p-0">
          <div className="row" style={{ width: "100%", margin: "0" }}>
            <div className="col-md-6 p-0">
              <HREditable
                mode="multiple"
                title="Number of personel in need"
                name="amount_required"
                content={data.amount_required.toString()}
                onBlurInputHandler={this.onBlurInputHandler}
              />
            </div>
            <div className="col-md-6 p-0">
              <div className="hr-info-combobox-field">
                <div className="hr-title-field font-weight-bold py-1 m-2 ">
                  Level
                </div>
                <Select
                  style={{ width: "100%" }}
                  mode="multiple"
                  placeholder="Please select"
                  onChange={(value) =>
                    this.onChangeSelectSingle("level_id", value)
                  }
                  value={data.level_id}
                >
                  {levelMenu}
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className="hr-info-double-field">
          <div className="row" style={{ width: "100%", margin: "0" }}>
            <div className="col-md-6 p-0">
              <div className="hr-info-combobox-field">
                <div className="hr-title-field font-weight-bold py-1 m-2 ">
                  Type of work
                </div>
                <Select
                  style={{ width: "100%" }}
                  mode="multiple"
                  placeholder="Please select"
                  onChange={(value) =>
                    this.onChangeSelectSingle("work_type_id", value)
                  }
                  value={data.work_type_id}
                >
                  {workTypeMenu}
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className="hr-info-double-field d-flex flex-row container-fluid p-0">
          <div className="row" style={{ width: "100%", margin: "0" }}>
            <div className="col-md-6 p-0">
              <HREditable
                title="Salary"
                name="salary"
                content={data.salary}
                onBlurInputHandler={this.onBlurInputHandler}
              />
            </div>
            <div className="col-md-6 p-0">
              <div className="hr-info-combobox-field">
                <div className="hr-title-field font-weight-bold py-1 m-2 ">
                  Experience (Year)
                </div>
                <Select
                  style={{ width: "100%" }}
                  mode="multiple"
                  placeholder="Please select"
                  onChange={(value) =>
                    this.onChangeSelectSingle("experience", value)
                  }
                  value={data.experience}
                >
                  {experienceMenu}
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className="hr-info-double-field d-flex flex-row">
          {/* ///////////////////////////////////////////////////////////// */}
          {/* ///////////////////////////////////////////////////////////// */}

          {/* ///////////////////////////////////////////////////////////// */}

          <HREditable
            title="Application Deadline"
            name={data.deadline}
            content={data.deadline}
            onBlurInputHandler={this.onBlurInputHandler}
          />
          <HREditable
            title="Name of application receiver"
            name=""
            content={data.user.name}
            disabled={true}
          />
        </div>
        <div className="hr-info-double-field d-flex flex-row">
          <HREditable
            title="Email that receive application"
            name=""
            content={data.user.email}
            disabled={true}
          />
          <HREditable
            title="Phone number"
            name=""
            content={data.user.phone}
            disabled={true}
          />
        </div>

        <div className="hr-title-field font-weight-bold py-1 m-2 ">
          Job description
        </div>
        <div className="hr-editor-field  py-2 m-2">
          <Editor
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapper-editor"
            editorClassName="text-input-editor"
            onEditorStateChange={this.onEditorStateChange}
          />
        </div>

        <div className="hr-title-field font-weight-bold py-1 m-2 ">
          Candidate Requirement
        </div>
        <div className="hr-editor-field  py-2 m-2">
          <Editor
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapper-editor"
            editorClassName="text-input-editor"
            onEditorStateChange={this.onEditorStateChange}
          />
        </div>

        <div className="hr-title-field font-weight-bold py-1 m-2 ">
          Candidate Benefits
        </div>
        <div className="hr-editor-field  py-2 m-2">
          <Editor
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapper-editor"
            editorClassName="text-input-editor"
            onEditorStateChange={this.onEditorStateChange}
          />
        </div>
      </div>
    );
  }
}
//send action to redux
const mapDispatchToProps = (dispatch, props) => {
  return {
    showCampaign: (campaign_id) => {
      dispatch(actions.showCampaign(campaign_id));
    },
    showListSubject: () => {
      dispatch(actions.showListSubject());
    },
    updateCampaign: (data) => {
      dispatch(actions.updateCampaign(data));
    },
    showListLevel: () => {
      dispatch(actions.showListLevel());
    },
    showListWorkType: () => {
      dispatch(actions.showListWorkType());
    },
  };
};
//get data from redux
const mapStateToProps = (state) => {
  return {
    campaign: state.campaign,
    subject: state.subject,
    work_type: state.work_type,
    level: state.level,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HRInfo));
