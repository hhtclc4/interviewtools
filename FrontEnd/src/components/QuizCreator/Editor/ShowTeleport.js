import React from 'react';
import './Editor.scss';
import "font-awesome/css/font-awesome.min.css";
import { faSearch, faArrowRight, faUser, faBookmark, faBook, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class Teleport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "default name",
        }
    }
    render() {
        let { title } = this.state;
        return (
            <div class="teleport-container">
                <div className="teleport-inner d-flex flex-column">
                    <div className="teleport-header sticky-top d-flex flex-row">
                        <div className="position-relative d-flex">
                            <input className="default-by-name-input" />
                            <FontAwesomeIcon size="lg" icon={faSearch} style={{ left: '-28px' }} className="position-relative align-self-center" />
                        </div>
                        <button className="close-teleport-btn"
                            onClick={this.props.closePopup}
                        ><FontAwesomeIcon icon={faArrowRight} size="2x" />
                        </button>
                    </div>
                    <div className="teleport-body flex-grow-1 d-flex flex-row pl-2 pt-2">
                        <div className="teleport-quiz-list pb-2 pr-2">
                            <p>Showing the result of <b>{title}</b></p>
                            <div className="teleport-quiz-overview d-flex flex-column">
                                <div className="d-flex flex-row flex-grow-1">
                                    <img src={require("./images/print.png")} alt="quiz-ava" className="mr-2" />
                                    <div>Quiz title</div>
                                </div>
                                <div className="d-flex flex-row">
                                    <div className="mr-2 text-truncate" style={{ flexBasis: '33%' }}><FontAwesomeIcon icon={faUser} size="sm" className="mr-2" />
                                        Owner name
                                    </div>
                                    <div className="mr-2" style={{ flexBasis: '33%' }}><FontAwesomeIcon icon={faBookmark} size="sm" className="mr-2" />
                                        Subject
                                    </div>
                                    <div className="mr-2" style={{ flexBasis: '33%' }}><FontAwesomeIcon icon={faBook} size="sm" className="mr-2" />
                                        Grade
                                    </div>
                                </div>
                            </div>
                            <div className="teleport-quiz-overview d-flex flex-column">
                                <div className="d-flex flex-row">
                                    <img src={require("./images/print.png")} alt="quiz-ava" className="mr-2" />
                                    <div>Quiz title</div>
                                </div>
                            </div>
                            <div className="teleport-quiz-overview d-flex flex-column">
                                <div className="d-flex flex-row">
                                    <img src={require("./images/print.png")} alt="quiz-ava" className="mr-2" />
                                    <div>Quiz title</div>
                                </div>
                            </div>
                            <div className="teleport-quiz-overview d-flex flex-column">
                                <div className="d-flex flex-row">
                                    <img src={require("./images/print.png")} alt="quiz-ava" className="mr-2" />
                                    <div>Quiz title</div>
                                </div>
                            </div>
                            <div className="teleport-quiz-overview d-flex flex-column">
                                <div className="d-flex flex-row">
                                    <img src={require("./images/print.png")} alt="quiz-ava" className="mr-2" />
                                    <div>Quiz title</div>
                                </div>
                            </div>
                            <div className="teleport-quiz-overview d-flex flex-column">
                                <div className="d-flex flex-row">
                                    <img src={require("./images/print.png")} alt="quiz-ava" className="mr-2" />
                                    <div>Quiz title</div>
                                </div>
                            </div>
                            <div className="teleport-quiz-overview d-flex flex-column">
                                <div className="d-flex flex-row">
                                    <img src={require("./images/print.png")} alt="quiz-ava" className="mr-2" />
                                    <div>Quiz title</div>
                                </div>
                            </div>
                            <div className="teleport-quiz-overview d-flex flex-column">
                                <div className="d-flex flex-row">
                                    <img src={require("./images/print.png")} alt="quiz-ava" className="mr-2" />
                                    <div>Quiz title</div>
                                </div>
                            </div>
                            <div className="teleport-quiz-overview d-flex flex-column">
                                <div className="d-flex flex-row">
                                    <img src={require("./images/print.png")} alt="quiz-ava" className="mr-2" />
                                    <div>Quiz title</div>
                                </div>
                            </div>
                            <div className="teleport-quiz-overview d-flex flex-column">
                                <div className="d-flex flex-row">
                                    <img src={require("./images/print.png")} alt="quiz-ava" className="mr-2" />
                                    <div>Quiz title</div>
                                </div>
                            </div>
                            <div className="teleport-quiz-overview d-flex flex-column">
                                <div className="d-flex flex-row">
                                    <img src={require("./images/print.png")} alt="quiz-ava" className="mr-2" />
                                    <div>Quiz title</div>
                                </div>
                            </div>
                        </div>
                        <div className="teleport-question-of-quiz flex-grow-1 p-2">
                            <div className="teleport-single-question my-2 d-flex flex-column p-2">
                                <div>
                                    <p><span>Order. </span>Question content</p>
                                </div>
                                <div className="position-relative">
                                    <hr />
                                    <p
                                        className="position-absolute p-1"
                                        style={{ backgroundColor: 'white', top: '12%', left: '10px', width: 'fit-content', fontSize: '12px' }}
                                    >
                                        answer choices
                                    </p>
                                </div>
                                <div className="teleport-question-choice-list d-flex flex-row flex-wrap">
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                </div>

                            </div>
                            <div className="teleport-single-question my-2 d-flex flex-column p-2">
                                <div>
                                    <p><span>Order. </span>Question content</p>
                                </div>
                                <div className="position-relative">
                                    <hr />
                                    <p
                                        className="position-absolute p-1"
                                        style={{ backgroundColor: 'white', top: '12%', left: '10px', width: 'fit-content', fontSize: '12px' }}
                                    >
                                        answer choices
                                    </p>
                                </div>
                                <div className="teleport-question-choice-list d-flex flex-row flex-wrap">
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                </div>

                            </div>
                            <div className="teleport-single-question my-2 d-flex flex-column p-2">
                                <div>
                                    <p><span>Order. </span>Question content</p>
                                </div>
                                <div className="position-relative">
                                    <hr />
                                    <p
                                        className="position-absolute p-1"
                                        style={{ backgroundColor: 'white', top: '12%', left: '10px', width: 'fit-content', fontSize: '12px' }}
                                    >
                                        answer choices
                                    </p>
                                </div>
                                <div className="teleport-question-choice-list d-flex flex-row flex-wrap">
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                </div>

                            </div>
                            <div className="teleport-single-question my-2 d-flex flex-column p-2">
                                <div>
                                    <p><span>Order. </span>Question content</p>
                                </div>
                                <div className="position-relative">
                                    <hr />
                                    <p
                                        className="position-absolute p-1"
                                        style={{ backgroundColor: 'white', top: '12%', left: '10px', width: 'fit-content', fontSize: '12px' }}
                                    >
                                        answer choices
                                    </p>
                                </div>
                                <div className="teleport-question-choice-list d-flex flex-row flex-wrap">
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                </div>

                            </div>
                            <div className="teleport-single-question my-2 d-flex flex-column p-2">
                                <div>
                                    <p><span>Order. </span>Question content</p>
                                </div>
                                <div className="position-relative">
                                    <hr />
                                    <p
                                        className="position-absolute p-1"
                                        style={{ backgroundColor: 'white', top: '12%', left: '10px', width: 'fit-content', fontSize: '12px' }}
                                    >
                                        answer choices
                                    </p>
                                </div>
                                <div className="teleport-question-choice-list d-flex flex-row flex-wrap">
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                </div>

                            </div>
                            <div className="teleport-single-question my-2 d-flex flex-column p-2">
                                <div>
                                    <p><span>Order. </span>Question content</p>
                                </div>
                                <div className="position-relative">
                                    <hr />
                                    <p
                                        className="position-absolute p-1"
                                        style={{ backgroundColor: 'white', top: '12%', left: '10px', width: 'fit-content', fontSize: '12px' }}
                                    >
                                        answer choices
                                    </p>
                                </div>
                                <div className="teleport-question-choice-list d-flex flex-row flex-wrap">
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                </div>

                            </div>
                            <div className="teleport-single-question my-2 d-flex flex-column p-2">
                                <div>
                                    <p><span>Order. </span>Question content</p>
                                </div>
                                <div className="position-relative">
                                    <hr />
                                    <p
                                        className="position-absolute p-1"
                                        style={{ backgroundColor: 'white', top: '12%', left: '10px', width: 'fit-content', fontSize: '12px' }}
                                    >
                                        answer choices
                                    </p>
                                </div>
                                <div className="teleport-question-choice-list d-flex flex-row flex-wrap">
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                </div>

                            </div>
                            <div className="teleport-single-question my-2 d-flex flex-column p-2">
                                <div>
                                    <p><span>Order. </span>Question content</p>
                                </div>
                                <div className="position-relative">
                                    <hr />
                                    <p
                                        className="position-absolute p-1"
                                        style={{ backgroundColor: 'white', top: '12%', left: '10px', width: 'fit-content', fontSize: '12px' }}
                                    >
                                        answer choices
                                    </p>
                                </div>
                                <div className="teleport-question-choice-list d-flex flex-row flex-wrap">
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                </div>

                            </div>
                            <div className="teleport-single-question my-2 d-flex flex-column p-2">
                                <div>
                                    <p><span>Order. </span>Question content</p>
                                </div>
                                <div className="position-relative">
                                    <hr />
                                    <p
                                        className="position-absolute p-1"
                                        style={{ backgroundColor: 'white', top: '12%', left: '10px', width: 'fit-content', fontSize: '12px' }}
                                    >
                                        answer choices
                                    </p>
                                </div>
                                <div className="teleport-question-choice-list d-flex flex-row flex-wrap">
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                </div>

                            </div>
                            <div className="teleport-single-question my-2 d-flex flex-column p-2">
                                <div>
                                    <p><span>Order. </span>Question content</p>
                                </div>
                                <div className="position-relative">
                                    <hr />
                                    <p
                                        className="position-absolute p-1"
                                        style={{ backgroundColor: 'white', top: '12%', left: '10px', width: 'fit-content', fontSize: '12px' }}
                                    >
                                        answer choices
                                    </p>
                                </div>
                                <div className="teleport-question-choice-list d-flex flex-row flex-wrap">
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                </div>

                            </div>
                            <div className="teleport-single-question my-2 d-flex flex-column p-2">
                                <div>
                                    <p><span>Order. </span>Question content</p>
                                </div>
                                <div className="position-relative">
                                    <hr />
                                    <p
                                        className="position-absolute p-1"
                                        style={{ backgroundColor: 'white', top: '12%', left: '10px', width: 'fit-content', fontSize: '12px' }}
                                    >
                                        answer choices
                                    </p>
                                </div>
                                <div className="teleport-question-choice-list d-flex flex-row flex-wrap">
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                    <div className="cho-content">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                color="#F14D76"
                                                size="lg"
                                            />
                                            <span>Sample choice</span>
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Teleport;