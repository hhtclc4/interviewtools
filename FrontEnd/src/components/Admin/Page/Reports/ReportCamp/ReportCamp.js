import React from 'react'
import './ReportCamp.scss'
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDollarSign,
    // faPencilAlt,
    // faTrashAlt,
    faScroll,
    faClock,
    faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";
class ReportCamp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        let { history } = this.props;
        return (
            <div className="report-camp-container"
                onClick={() => {
                    history.push(`/admin/reports/camp/report_detail`);
                }}
            >
                <div className="report-camp-overview">
                    <div className="campaign-overview-container d-flex flex-row p-2">
                        <div className="co-company-logo align-self-center p-2">
                            <div className="crop-comp-logo">
                                <img
                                    className="comp-logo"
                                    alt="logo"
                                    // src={
                                    //     data.image !== null
                                    //         ? data.image
                                    //         : require(`../../../utils/campaign_img/campain_pic0.png`)
                                    // }
                                    src={

                                        require(`../../../../../utils/campaign_img/campain_pic0.png`)
                                    }
                                />
                            </div>
                        </div>
                        <div className="co-require-and-desc d-flex flex-column">
                            <div className="co-title">
                                {/* <p className="text-truncate">{data.title}</p> */}
                                <p>React Dev</p>
                            </div>
                            <div className="co-salary d-flex flex-row">
                                <span className="co-adjust-icon d-flex flex-row justify-content-center">
                                    <FontAwesomeIcon icon={faDollarSign} size="sm" color="#FD7E14" />
                                </span>
                                <p>
                                    {/* {data.salary === 0 ? "Lương thỏa thuận" : data.salary + " triệu"} */}
                                    Luong thoa thuan
                                </p>
                            </div>

                            <div className="co-job-desc d-flex flex-column">
                                <p className="align-self-start" style={{ fontSize: "15px" }}>
                                    <span className="mr-2">
                                        <FontAwesomeIcon icon={faScroll} color="#fd7e14" />
                                    </span>
                                    Work description
                                </p>
                                {/* <Editor
                                    wrapperClassName="work-desc-wrapper"
                                    editorClassName="work-desc-editor"
                                    toolbarClassName="d-none"
                                    editorState={EditorState.createWithContent(textState)}
                                /> */}
                            </div>
                            <div className="co-subjects d-flex flex-row">
                                {/* {data.subjects.map((subject) => {
                                    return (
                                        <div key={subject.id} className="co-subject">
                                            {subject.title}
                                        </div>
                                    );
                                })} */}

                                <div className="co-subject">
                                    Java
                                </div>
                            </div>
                        </div>
                        <div className="co-tag d-flex flex-column justify-content-around ">
                            <div className="co-feature align-self-end">Hot</div>

                            <div className="co-publish align-self-end"></div>
                        </div>
                        <div className="co-options d-flex flex-column pl-3 justify-content-around">
                            {/* <button className="co-option-btn" onClick={this.onClickModifyHandler}>
                                <FontAwesomeIcon icon={faPencilAlt} size="lg" color="gray" />
                            </button>
                            <button className="co-option-btn">
                                <FontAwesomeIcon icon={faTrashAlt} size="lg" color="gray" />
                            </button> */}
                        </div>
                    </div>
                </div>
                <div className="report-camp-list">
                    <div className="rc-list-title">
                        Interviews list
                    </div>
                    <div className="rc-interview-container pt-3">
                        {/* {completedInterview[0].id === 0 ? (
                            <div>
                                <h1>None interviews completed</h1>
                            </div>
                        ) : ( */}

                        <div className="rc-list-partion row">
                            <div className="rc-partion-time col-sm ">
                                <span>
                                    <FontAwesomeIcon icon={faClock} /> Date
                                </span>
                            </div>
                            <div className="rc-partion-name col-sm">Interview name</div>
                            <div className="rc-partion-total-can col-sm">Total candidates</div>
                            <div className="rc-partion-acc col-md-5">Accuracy</div>
                        </div>
                        <div className="completed-list-container">
                            <div
                                className="interview-report-container py-3" //1 component interview
                            // onClick={this.toggleReportBody}
                            >
                                <div className="interview-report-header row m-0  py-2">
                                    <div className="rc-partion-time col-sm">
                                        <span>
                                            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                                            {/* {weekDay}, {month} {day}th {year} */}
                                        </span>
                                    </div>
                                    <div className="rc-partion-name col-sm">Fresher Interview</div>
                                    <div className="rc-partion-total-can col-sm">
                                        {/* {data.group_candidates.length} */}
                                            10
                                        </div>
                                    <div className="rc-partion-acc col-md-5">
                                        <div className="max-acc-progress">
                                            <div
                                                className="acc-progress"
                                            // style={{
                                            //     width: `${data.totalAccuracy}%`,
                                            //     backgroundColor: totalAccuracy,
                                            // }}
                                            >
                                                100%
                                                </div>
                                        </div>
                                    </div>
                                    {/* <button className="in-expand-btn" onClick={this.toggleReportBody}>
                                            <FontAwesomeIcon icon={faAngleDown} size="lg" />
                                        </button> */}
                                </div>
                            </div>
                        </div>
                        {/* )} */}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ReportCamp);