import React from "react";
import "./Info.scss";
import { withRouter } from "react-router-dom";
import HREditable from "./Editable/Editable";
import "bootstrap/dist/css/bootstrap.min.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { Menu, Dropdown, Button, message } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Select } from 'antd';
const { Option } = Select;
import { connect } from "react-redux";
import * as actions from "../../../../redux/actions/index";
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
        amount_required: 0,
        work_type_id: 0,
        sex: 0,
        experience: 0,
        salary: 0,
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
      },
      campaign_id: this.props.match.params.campaign_id,
    };
  }
  componentDidMount() {
    let { campaign_id } = this.state;
    this.props.showCampaign(campaign_id);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.campaign,
    });
    console.log(this.props)
  }
  handleButtonClick = (e) => {
    message.info("Click on left button.");
    console.log("click left button", e);
  };

  handleMenuClick = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };

  handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  render() {
    let { data } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">
          <UserOutlined />
          1st menu item
        </Menu.Item>
        <Menu.Item key="2">
          <UserOutlined />
          2nd menu item
        </Menu.Item>
        <Menu.Item key="3">
          <UserOutlined />
          3rd item
        </Menu.Item>
      </Menu>
    );

    const children = [];

    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    return (
      <div className="hr-info-container container-fluid">
        <div className="hr-info-single-field">
          <HREditable title="Title" content={data.title} />
        </div>
        <div className="hr-info-single-field">
          <div className="hr-info-combobox-field">
            <div className="hr-title-field font-weight-bold py-1 m-2 ">
              Braches
            </div>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Please select"
              defaultValue={['a10', 'c12']}
              onChange={this.handleChange}
            >
              {children}
            </Select>,
          </div>
        </div>
        <div className="hr-info-single-field">
          <HREditable title="Destination" content="This is the destination" />
        </div>
        <div className="hr-info-double-field d-flex flex-row container-fluid p-0">
          <div className="row" style={{ width: "100%", margin: "0" }}>
            <div className="col-md-6 p-0">
              <HREditable
                title="Number of personel in need"
                content="This is the title"
              />
            </div>
            <div className="col-md-6 p-0">
              <div className="hr-info-combobox-field">
                <div className="hr-title-field font-weight-bold py-1 m-2 ">
                  Rank
                </div>
                <Dropdown
                  overlay={menu}
                  trigger={["click"]}
                  style={{ width: "100%" }}
                  overlayStyle={{ width: "auto" }}
                >
                  <Button>
                    Java <DownOutlined />
                  </Button>
                </Dropdown>
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
                <Dropdown
                  overlay={menu}
                  trigger={["click"]}
                  style={{ width: "100%" }}
                  overlayStyle={{ width: "auto" }}
                >
                  <Button>
                    Java <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
            </div>
            <div className="col-md-6 p-0">
              <div className="hr-info-combobox-field">
                <div className="hr-title-field font-weight-bold py-1 m-2 ">
                  Sex
                </div>
                <Dropdown
                  overlay={menu}
                  trigger={["click"]}
                  style={{ width: "100%" }}
                  overlayStyle={{ width: "auto" }}
                >
                  <Button>
                    Java <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
        <div className="hr-info-double-field d-flex flex-row container-fluid p-0">
          <div className="row" style={{ width: "100%", margin: "0" }}>
            <div className="col-md-6 p-0">
              <HREditable title="Salary" content="This is the title" />
            </div>
            <div className="col-md-6 p-0">
              <div className="hr-info-combobox-field">
                <div className="hr-title-field font-weight-bold py-1 m-2 ">
                  Experience
                </div>
                <Dropdown
                  overlay={menu}
                  trigger={["click"]}
                  style={{ width: "100%" }}
                  overlayStyle={{ width: "auto" }}
                >
                  <Button>
                    Java <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
        <div className="hr-info-double-field d-flex flex-row">
          <HREditable
            title="Application Deadline"
            content="This is the title"
          />
          <HREditable
            title="Name of application receiver"
            content="This is the title"
          />
        </div>
        <div className="hr-info-double-field d-flex flex-row">
          <HREditable
            title="Email that receive application"
            content="This is the title"
          />
          <HREditable title="Phone number" content="This is the title" />
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
  };
};
//get data from redux
const mapStateToProps = (state) => {
  return {
    campaign: state.campaign,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HRInfo));
