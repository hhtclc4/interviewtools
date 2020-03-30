import React from "react";
import "./HomeBody.scss";
import RecruitThumbnail from '../../../utils/RecruitThumbnail/RecruitThumbnail'
import { Tabs, Panel } from '../../../utils/Tab/Tabs'
class HomeBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotTabsCount: 4,
    };
  }
  render() {
    return (
      <div className="home-body-container container-fluid">
        {/* <video className="video-intro" src={require("../images/outlanders_header.webm")} autoPlay={true} loop={true}></video> */}
        <div className="row">
          <div className="col-2"></div>
          <div className="col-lg-8 py-3 px-0">
            <div className="candidate-job-seek container-fluid">
              <div className="candidate-job-seek-header p-3 d-flex flex-row">

                <img className="candidate-post-icon" alt="news" src={require("../images/news.png")} />
                <h4 className="flex-grow-1">
                  RECENT HOT JOB
                </h4>
                <h4>
                  See all >>
                </h4>
              </div>
              <div className="candidate-job-seek-body">
                <div className="recruit-list pb-4">
                  <Tabs selected={0}>
                    <Panel title="">
                      <RecruitThumbnail />
                      <RecruitThumbnail />
                      <RecruitThumbnail />
                      <RecruitThumbnail />
                      <RecruitThumbnail />
                      <RecruitThumbnail />
                      <RecruitThumbnail />
                      <RecruitThumbnail />
                      <RecruitThumbnail />
                    </Panel>
                    <Panel title="">
                      <RecruitThumbnail />
                      <RecruitThumbnail />
                      <RecruitThumbnail />
                      <RecruitThumbnail />
                      <RecruitThumbnail />
                      <RecruitThumbnail />
                      <RecruitThumbnail />
                    </Panel>
                    <Panel title="">
                      <RecruitThumbnail />
                      <RecruitThumbnail />
                      <RecruitThumbnail />
                      <RecruitThumbnail />
                      <RecruitThumbnail />
                      <RecruitThumbnail />
                      <RecruitThumbnail />
                      <RecruitThumbnail />
                    </Panel>
                  </Tabs>

                </div>
              </div>
            </div>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    );
  }
}

export default HomeBody;
