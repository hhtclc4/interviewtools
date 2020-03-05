import React from "react";
import "./Editor.scss";
import "font-awesome/css/font-awesome.min.css";
import {
    faSearch,
    faArrowRight,
    faUser,
    faBookmark,
    faBook,
    faCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import * as actions from "./../../../redux/actions/index";
class Teleport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "default name",
            arrTable: [
                {
                    id: 0,
                    title: "",
                    grade_begin: 0,
                    grade_end: 0,
                    image: "",
                    questions: [],
                    user: {
                        first_name: "",
                        last_name: ""
                    }
                }
            ],
            firstQuestionArr: [
                {
                    id: 0,
                    question: "",
                    type: 0,
                    question_choices: [
                        {
                            id: 0,
                            answer: "",
                            is_right: 0,
                        }
                    ],
                }
            ]
        };
    }


    componentDidMount() {
        let { title } = this.props;
        this.setState(
            {
                title: title
            }
        )
        this.props.teleportQuestionAndAnswersAPI(title);

    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState(
            {
                arrTable: nextProps.teleport,
                firstQuestionArr: nextProps.teleport[0].questions
            }
        )

    }

    render() {
        let { title, arrTable, firstQuestionArr } = this.state;
        let userName = "";
        let quizOverviewElm = arrTable.map(table => { //table - 1 element in arr
            userName = `${table.user.first_name} ${table.user.last_name}`;
            return (
                <div key={table.id} className="teleport-quiz-overview d-flex flex-column">
                    <div className="d-flex flex-row flex-grow-1">
                        <img
                            src={table.image !== null ? table.image : require("./images/print.png")}

                            alt="quiz-ava"
                            className="mr-2"
                        />
                        <div>{table.title}</div>
                    </div>
                    <div className="d-flex flex-row">
                        <div
                            className="mr-2 text-truncate"
                            style={{ flexBasis: "33%" }}
                        >
                            <FontAwesomeIcon icon={faUser} size="sm" className="mr-2" />
                            {userName}
                        </div>
                        <div className="mr-2" style={{ flexBasis: "33%" }}>
                            <FontAwesomeIcon
                                icon={faBookmark}
                                size="sm"
                                className="mr-2"
                            />
                            {table.grade_begin}
                        </div>
                        <div className="mr-2" style={{ flexBasis: "33%" }}>
                            <FontAwesomeIcon icon={faBook} size="sm" className="mr-2" />
                            {table.grade_end}
                        </div>
                    </div>
                </div>
            );
        })
        console.log("object", firstQuestionArr)
        let questionElm = firstQuestionArr.map((index, question) => {
            let answerElm = question.question_choices.map((choice) => {
                return (
                    <div className="cho-content">
                        <span>
                            <FontAwesomeIcon
                                icon={faCircle}
                                color={choice.is_right ? "#00C985" : "#F14D76"}
                                size="lg"
                            />
                            <span>{choice.answer}</span>
                        </span>
                    </div>
                )
            })
            return (
                <div key={question.id} className="teleport-single-question my-2 d-flex flex-column p-2">
                    <div>
                        <p>
                            <span>{index + 1}. </span>{question.question}
                        </p>
                    </div>
                    <div className="position-relative">
                        <hr />
                        <p
                            className="position-absolute p-1"
                            style={{
                                backgroundColor: "white",
                                top: "12%",
                                left: "10px",
                                width: "fit-content",
                                fontSize: "12px"
                            }}
                        >
                            answer choices
                        </p>
                    </div>
                    <div className="teleport-question-choice-list d-flex flex-row flex-wrap">
                        {answerElm}
                    </div>
                </div>
            )
        })
        return (
            <div className="teleport-container">
                <div className="teleport-inner d-flex flex-column">
                    <div className="teleport-header sticky-top d-flex flex-row">
                        <div className="position-relative d-flex">
                            <input className="default-by-name-input" />
                            <FontAwesomeIcon
                                size="lg"
                                icon={faSearch}
                                style={{ left: "-28px" }}
                                className="position-relative align-self-center"
                            />
                        </div>
                        <button
                            className="close-teleport-btn"
                            onClick={this.props.closePopup}
                        >
                            <FontAwesomeIcon icon={faArrowRight} size="2x" />
                        </button>
                    </div>
                    <div className="teleport-body flex-grow-1 d-flex flex-row pl-2 pt-2">
                        <div className="teleport-quiz-list pb-2 pr-2">
                            <p>
                                Showing the result of <b>{title}</b>
                            </p>
                            {quizOverviewElm}
                        </div>
                        {/* ///////////////// question/////////////
////////////////////////////
/////////////////////////////// */}
                        <div className="teleport-question-of-quiz flex-grow-1 p-2">
                            {questionElm}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch, props) => {
    // connect to redux by function, load data from data base, this is step 2
    return {
        teleportQuestionAndAnswersAPI: title => {
            dispatch(actions.teleportQuestionAndAnswersAPI(title));
        },
        createQuestionAndAnswersAPI: (question_table_id, data, answers) => {
            dispatch(
                actions.createQuestionAndAnswersAPI(question_table_id, data, answers)
            );
        }
    };
};
const mapStateToProps = state => {
    //connect to redux by props, loadded data store here, this is step 3
    return {
        teleport: state.teleport
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Teleport);
