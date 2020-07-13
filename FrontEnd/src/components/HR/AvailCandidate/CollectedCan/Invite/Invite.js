import React from "react";
import "./Invite.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faPencilAlt,
  faTrashAlt,
  faScroll,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import { EditorState, convertFromHTML, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { connect } from "react-redux";
import * as actions from "../../../../../redux/actions/index";
class CollectedInvite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 0,
          title: "",
          subject_id: 0,
          level_id: 0,
          work_type_id: 0,
          salary: 0,
          user_id: 0,
          work_description: "lmao",
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
          created_at: "2020-05-27 12:48:20",
          updated_at: "2020-05-27 12:48:20",
        },
      ],
    };
  }
  onClickInviteToCampain = (campaign_id) => {
    let { user_id } = this.props;
    let { data } = this.state;
    for (let i = 0; i < data.length; i++)
      this.setState((preState) => ({
        data: preState.data.map((campaign) => {
          return campaign.id === campaign_id
            ? { ...campaign, isInvited: true }
            : { ...campaign };
        }),
      }));

    this.props.createInvitation({ campaign_id, user_id });
  };
  parseTwitterDate = (tdate) => {
    var K = () => {
      var a = navigator.userAgent;
      return {
        ie: a.match(/MSIE\s([^;]*)/),
      };
    };
    var system_date = new Date(Date.parse(tdate));
    var user_date = new Date();
    if (K.ie) {
      system_date = Date.parse(tdate.replace(/( \+)/, " UTC$1"));
    }
    var diff = Math.floor((user_date - system_date) / 1000);
    if (diff <= 1) {
      return "just now";
    }
    if (diff < 20) {
      return diff + " seconds ago";
    }
    if (diff < 40) {
      return "half a minute ago";
    }
    if (diff < 60) {
      return "less than a minute ago";
    }
    if (diff <= 90) {
      return "one minute ago";
    }
    if (diff <= 3540) {
      return Math.round(diff / 60) + " minutes ago";
    }
    if (diff <= 5400) {
      return "1 hour ago";
    }
    if (diff <= 86400) {
      return Math.round(diff / 3600) + " hours ago";
    }
    if (diff <= 129600) {
      return "1 day ago";
    }
    if (diff < 604800) {
      return Math.round(diff / 86400) + " days ago";
    }
    if (diff <= 777600) {
      return "1 week ago";
    }
    return "on " + system_date;
  };
  componentDidMount() {
    // this.props.showListCampaign();
    this.props.showCampaigns();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      data: [...nextProps.campaigns],
    });
  }
  render() {
    let { data } = this.state;
    console.log(data[0]);
    let tabElm = data.map((campaign, index) => {
      let createdTime = this.parseTwitterDate(campaign.created_at);

      const sampleMarkup = campaign.work_description;
      const blocksFromHTML = convertFromHTML(sampleMarkup);
      const textState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      return (
        <div
          key={campaign.id}
          className="campaign-overview-container d-flex flex-row p-2"
        >
          <div className="co-company-logo align-self-center p-2">
            <div className="crop-comp-logo">
              <img
                className="comp-logo"
                alt="logo"
                src={
                  campaign.image !== null
                    ? campaign.image
                    : require(`../../../../../utils/campaign_img/campain_pic${
                        index % 7
                      }.png`)
                }
              />
            </div>
          </div>
          <div className="co-require-and-desc d-flex flex-column">
            <div className="co-title">
              <p className="text-truncate">{campaign.title}</p>
            </div>
            <div className="co-salary d-flex flex-row">
              <span className="co-adjust-icon d-flex flex-row justify-content-center">
                <FontAwesomeIcon
                  icon={faDollarSign}
                  size="sm"
                  color="#FD7E14"
                />
              </span>
              <p>
                {campaign.salary === 0
                  ? "Lương thỏa thuận"
                  : campaign.salary + " triệu"}
              </p>
            </div>

            <div className="co-job-desc d-flex flex-column">
              <p className="align-self-start" style={{ fontSize: "15px" }}>
                <span className="mr-2">
                  <FontAwesomeIcon icon={faScroll} color="#fd7e14" />
                </span>
                Work description
              </p>
              <Editor
                wrapperClassName="work-desc-wrapper"
                editorClassName="work-desc-editor"
                toolbarClassName="d-none"
                editorState={EditorState.createWithContent(textState)}
              />
            </div>
            <div className="co-subjects d-flex flex-row">
              {campaign.subjects.map((subject) => {
                return (
                  <div key={subject.id} className="co-subject">
                    {subject.title}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="co-tag d-flex flex-column justify-content-around ">
            <div className="co-feature align-self-end">Hot</div>

            <div className="co-publish align-self-end">{createdTime}</div>
          </div>
          <div className="co-options d-flex flex-column pl-3 justify-content-around">
            <button
              className="co-option-btn"
              disabled={campaign.isInvited === undefined ? false : true}
              style={
                campaign.isInvited === undefined ? null : { opacity: "0.3" }
              }
              onClick={() => this.onClickInviteToCampain(campaign.id)}
            >
              {campaign.isInvited === undefined ? (
                <FontAwesomeIcon icon={faPlusSquare} size="lg" color="gray" />
              ) : (
                <FontAwesomeIcon icon={faCheck} size="lg" color="gray" />
              )}
            </button>
          </div>
        </div>
      );
    });
    return (
      <div className="collected-invite-container">
        <div className="c-i-title">Select Campaign for inviting</div>
        {/** */}

        {tabElm}
        {/** */}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    showListCampaign: () => {
      dispatch(actions.showListCampaign());
    },
    showCampaigns: () => {
      dispatch(actions.showCampaigns());
    },
    createInvitation: (data) => {
      dispatch(actions.createInvitation(data));
    },
  };
};
//get data from redux
const mapStateToProps = (state) => {
  return {
    campaigns: state.campaigns,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CollectedInvite);
