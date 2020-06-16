import React from "react";
import "./RecruitEditor.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import * as actions from "../../../../redux/actions/index";
import { withRouter } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Select } from "antd";
import EditorConvertToHTML from "../../../../utils/EditorConvertToHTML/EditorConvertToHTML";
const { Option } = Select;

class RecruitCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: "",
        level_id: 0,
        work_type_id: 0,
        salary: 0,
        user_id: 0,
        work_description: "",
        status: true,
        subjects: [
          {
            id: 0,
            title: "",
          },
        ],
      },
      user: {
        name: "",
        email: "",
        phone: "",
        company: {
          address: "",
        },
      },
      campaign_subject: [],
      listSubjects: [{ id: 0 }],
      listLevels: [{ id: 0 }],
      listWorkTypes: [{ id: 0 }],
    };
  }
  componentDidMount() {
    this.props.showListSubject();
    this.props.showListWorkType();
    this.props.showListLevel();
    this.props.getUser();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps.user);
    this.setState({
      listSubjects: nextProps.subject.subjects,
      listLevels: nextProps.level,
      listWorkTypes: nextProps.work_type,
      user: nextProps.user.user,
    });
  }

  onSubmitCreateHandler = () => {
    let { data } = this.state;
    this.props.createCampaignAPI(data);
    this.props.history.push("/HR");
  };
  onChangeEditorTextHandler = (work_description) => {
    this.setState({
      data: {
        ...this.state.data,
        work_description,
      },
    });
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
  onChangeSelectSingle = (key, value) => {
    let { data } = this.state;
    console.log(key, value);
    this.setState({
      data: { ...data, [key]: value },
    });
  };
  onChangeSelectMulti = (arrValue) => {
    let { data, listSubjects } = this.state;
    let campaign_subject = [];
    let newSubjects = [];
    for (let i = 0; i < arrValue.length; i++) {
      campaign_subject.push({ subject_id: arrValue[i] });
      newSubjects.push(listSubjects.find((sub) => sub.id === arrValue[i]));
    }
    this.setState({
      data: {
        ...data,
        subjects: newSubjects,
      },
      campaign_subject,
    });
  };
  onChangeInputHandler = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({
      data: {
        ...this.state.data,
        [name]: value,
      },
    });
  };
  render() {
    const { data, user } = this.state;

    let levelMenu = this.levelMenu();
    let workTypeMenu = this.workTypeMenu();

    let subjectMenu = this.subjectMenu();

    return (
      <div className="recruit-signup-container container ">
        <div className="section-name row pb-3 ">
          <div
            className="recruit-title col-xl p-3 mt-2"
            style={{ backgroundColor: "white", marginBottom: "10px" }}
          >
            <h4 className="mb-0">Create a new recruit post</h4>
          </div>
        </div>
        <div className="input-fields row ">
          <div className="input-container col-xl px-5 py-3 ">
            <div className="single-field py-4">
              <div className=" font-weight-bold py-1">Title</div>
              <div className="font-italic py-1 recruit-field-note">
                Write briefly about position and job
              </div>
              <div>
                <input
                  name="title"
                  value={data.title}
                  type="text"
                  placeholder="Add title for this campaign"
                  onChange={this.onChangeInputHandler}
                />
              </div>
            </div>
            <div className="single-field py-4">
              <div className="font-weight-bold py-1">Major</div>
              <div className="font-italic py-1 recruit-field-note">
                Choose maximum 3 majors from dropdow below
              </div>
              <div>
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  onChange={this.onChangeSelectMulti}
                >
                  {subjectMenu}
                </Select>
              </div>
            </div>
            <div className="single-field py-4">
              <div className="font-weight-bold py-1">Work Address</div>
              <div className="font-italic py-1 recruit-field-note">
                Work station location
              </div>
              <div>
                <input
                  value={user.company.address}
                  type="text"
                  disabled={true}
                />
              </div>
            </div>
            <div className="double-field py-4 d-flex flex-row">
              <div className="field-1 mr-3">
                <div className=" font-weight-bold py-1">Level</div>
                <div className="font-italic py-1 recruit-field-note"></div>
                <div>
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    onChange={(value) =>
                      this.onChangeSelectSingle("level_id", value)
                    }
                  >
                    {levelMenu}
                  </Select>
                </div>
              </div>
              <div className="field-1 ml-3">
                <div className=" font-weight-bold py-1">Type of work</div>
                <div className="font-italic py-1 recruit-field-note"></div>
                <div>
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    onChange={(value) =>
                      this.onChangeSelectSingle("work_type_id", value)
                    }
                  >
                    {workTypeMenu}
                  </Select>
                </div>
              </div>
            </div>

            <div className="double-field py-4 d-flex flex-row">
              <div className="field-1 mr-3">
                <div className=" font-weight-bold py-1 ">
                  Salary ($)
                  <div className="font-italic py-1 recruit-field-note">
                    *Note: 0 is salary agreement
                  </div>
                </div>

                <input
                  name="salary"
                  value={data.salary}
                  type="text"
                  placeholder="Add salary"
                  onChange={this.onChangeInputHandler}
                />
              </div>
              <div className="field-1 ml-3">
                <div className=" font-weight-bold py-1">
                  Name of application receiver
                </div>
                <div className="font-italic py-1 recruit-field-note">
                  Let candidates know receiver name for convenient vocative
                </div>
                <div>
                  <input
                    name="user_name"
                    value={user.name}
                    type="text"
                    disabled={true}
                  />
                </div>
              </div>
            </div>
            <hr style={{ width: "95%" }} />

            <div className="double-field py-4 d-flex flex-row">
              <div className="field-1 mr-3">
                <div className=" font-weight-bold py-1">
                  Email that receive application
                </div>
                <div className="font-italic py-1 recruit-field-note">
                  This email will be received applications
                </div>
                <div>
                  <input
                    name="user_email"
                    value={user.email}
                    type="text"
                    disabled={true}
                  />
                </div>
              </div>
              <div className="field-1 ml-3">
                <div className=" font-weight-bold py-1">Phone number</div>
                <div className="font-italic py-1 recruit-field-note">
                  For contact with candidates
                </div>
                <div>
                  <input
                    name="user_phone"
                    value={user.phone}
                    type="text"
                    disabled={true}
                  />
                </div>
              </div>
            </div>
            <hr style={{ width: "95%" }} />
            <div className="editor-field py-4">
              <div className="font-weight-bold py-1">Job description</div>
              <div className="font-italic py-1 recruit-field-note">
                Describe works that depend on recruitment position
              </div>
              <EditorConvertToHTML
                onChangeEditorTextHandler={this.onChangeEditorTextHandler}
                text=""
                placeholder="Describe works "
              />
            </div>
            <div className="submit-btn d-flex flex-row justify-content-center">
              <button className="post-btn" onClick={this.onSubmitCreateHandler}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    showListSubject: () => {
      dispatch(actions.showListSubject());
    },
    createCampaignAPI: (data) => {
      dispatch(actions.createCampaignAPI(data));
    },
    showListLevel: () => {
      dispatch(actions.showListLevel());
    },
    showListWorkType: () => {
      dispatch(actions.showListWorkType());
    },
    getUser: () => {
      dispatch(actions.getUser());
    },
  };
};

const mapStateToProps = (state) => {
  return {
    campaign: state.campaign,
    subject: state.subject,
    work_type: state.work_type,
    level: state.level,
    user: state.user,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RecruitCreate));
