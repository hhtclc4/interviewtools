import React from "react";
import "./RecruitForm.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { withRouter } from "react-router-dom";
import { Select, Divider, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import EditorConvertToHTML from '../../../../utils/EditorConvertToHTML/EditorConvertToHTML'
const { Option } = Select;

let index = 0;
class RecruitCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        id: 0,
        title: "",
        subject_id: 0,
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
      items: ['Lương thỏa thuận'],
      name: '',
    };
  }

  onNameChange = event => {
    this.setState({
      name: event.target.value,
    });
  };

  addItem = () => {
    console.log('addItem');
    const { items, name } = this.state;
    this.setState({
      items: [...items, name || `New item ${index++}`],
      name: '',
    });
  };
  onClickCreateHandler = () => {
    console.log(this.state.data)
  }
  onChangeEditorTextHandler = (work_description) => {
    this.setState({
      data: {
        work_description
      }
    })
    console.log(this.state.data.work_description);
  }
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  render() {
    const children = [];
    const { items, name } = this.state;
    for (let i = 10; i < 20; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
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
                <input />
              </div>
            </div>
            <div className="single-field py-4">
              <div className="font-weight-bold py-1">Branch</div>
              <div className="font-italic py-1 recruit-field-note">
                Choose maximum 3 branches from dropdow below
              </div>
              <div>
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Please select"

                  onChange={this.handleChange}
                >
                  {children}
                </Select>
              </div>
            </div>
            <div className="single-field py-4">
              <div className="font-weight-bold py-1">Destination</div>
              <div className="font-italic py-1 recruit-field-note">
                Work station location
              </div>
              <div>
                <input />
              </div>
            </div>
            <div className="double-field py-4 d-flex flex-row">
              {/* <div className="field-1 mr-3">
                <div className=" font-weight-bold py-1">
                  Number of personnel in need
                </div>
                <div className="font-italic py-1 recruit-field-note">
                  Leave this field blank in case of no limit in recruitment
                </div>
                <div>
                  <input />
                </div>
              </div> */}
              <div className="field-1 mr-3">
                <div className=" font-weight-bold py-1">Level</div>
                <div className="font-italic py-1 recruit-field-note"></div>
                <div>
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"

                    onChange={this.handleChange}
                  >
                    {children}
                  </Select>
                </div>
              </div>
              <div className="field-1 ml-3">
                <div className=" font-weight-bold py-1">Type of work</div>
                <div className="font-italic py-1 recruit-field-note"></div>
                <div>
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"

                    onChange={this.handleChange}
                  >
                    {children}
                  </Select>
                </div>
              </div>
            </div>
            <div className="double-field py-4 d-flex flex-row">

              {/* <div className="field-1 ml-3">
                <div className=" font-weight-bold py-1">Sex</div>
                <div className="font-italic py-1 recruit-field-note"></div>
                <div>
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"

                    onChange={this.handleChange}
                  >
                    {children}
                  </Select>
                </div>
              </div> */}
            </div>
            <div className="double-field py-4 d-flex flex-row">
              <div className="field-1 mr-3">
                <div className=" font-weight-bold py-1 ">Salary</div>
                <div className="font-italic py-1 recruit-field-note">
                  Set salary available maybe cause reduction in number of
                  applicants
                </div>
                <Select
                  style={{ width: '100%' }}
                  placeholder="custom dropdown render"
                  dropdownRender={menu => (
                    <div>
                      {menu}
                      <Divider style={{ margin: '4px 0' }} />
                      <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                        <Input style={{ flex: 'auto' }} value={name} onChange={this.onNameChange} />
                        <a
                          style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                          onClick={this.addItem}
                        >
                          <PlusOutlined /> Add item
                        </a>
                      </div>
                    </div>
                  )}
                >
                  {items.map(item => (
                    <Option key={item}>{item}</Option>
                  ))}
                </Select>
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
              {/* <div className="field-1 ml-3">
                <div className=" font-weight-bold py-1">Experience</div>
                <div className="font-italic py-1 recruit-field-note"></div>
                <div>
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"

                    onChange={this.handleChange}
                  >
                    {children}
                  </Select>
                </div>
              </div> */}
            </div>
            <hr style={{ width: "95%" }} />
            <div className="double-field py-4 d-flex flex-row">
              {/* <div className="field-1 mr-3">
                <div className=" font-weight-bold py-1">
                  Application Deadline
                </div>
                <div className="font-italic py-1 recruit-field-note">
                  After this date, the recruitment won't be displayed
                </div>
                <div>
                  <input />
                </div>
              </div> */}

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
                <div className=" font-weight-bold py-1">Phone number</div>
                <div className="font-italic py-1 recruit-field-note">
                  For contact with candidates
                </div>
                <div>
                  <input />
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
                work_description=""
              />
            </div>
            <div className="submit-btn d-flex flex-row justify-content-center">
              <button className="post-btn"
                onClick={this.onClickCreateHandler}
              >Post</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RecruitCreate);
