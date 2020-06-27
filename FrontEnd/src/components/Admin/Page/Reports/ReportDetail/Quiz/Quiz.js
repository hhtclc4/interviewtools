import React from 'react';
import './Quiz.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

class QuizPop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        return (
            <div className="quiz-pop-container">
                <div className="qp-player-overview">
                    <div className="qp-player-ava">
                        <img alt="ava" src={require("../../../../../../utils/images/icon.png")} />
                    </div>
                    <div className="qp-player-info">
                        <div className="qp-player-name">
                            tri ha
                        </div>
                        <div className="qp-date">
                            Date: 12-12-2012, 12:12am
                        </div>
                    </div>
                    <div className="qp-actions flex-fill">
                        <button>Delete</button>
                    </div>
                </div>
                <div className="qp-player-result">
                    <div className="result-bar">
                        <div className="right-result"></div>
                        <div className="wrong-result"></div>
                    </div>
                    <div className="result-amount">
                        <div className="right-amount">20</div>
                        <div className="wrong-amount">20</div>
                    </div>
                    <div className="result-accuracy">
                        <div className="right-acc">50% correct</div>
                        <div className="wrong-acc">50% incorrect</div>
                        <div className="unattempt-acc">0% unattempt</div>
                    </div>
                </div>
                <div className="qp-result-list">
                    <div className="qp-question-result">
                        <div className="question-text">1. Kate knows that the most effective way to communicate important information
             about the project to her team is with a face-to-face conversation. Is this Agile Principle or Practice?</div>
                        <div className="choose-result" style={{ color: 'green' }}><span className="mr-2"><FontAwesomeIcon icon={faCheck} /></span>Principle</div>
                        <div className="choose-result" style={{ color: 'red' }}><span className="mr-2"><FontAwesomeIcon icon={faTimes} size="lg" /></span>Principle</div>
                    </div>
                    <div className="qp-question-result">
                        <div className="question-text">1. Kate knows that the most effective way to communicate important information
             about the project to her team is with a face-to-face conversation. Is this Agile Principle or Practice?</div>
                        <div className="choose-result" style={{ color: 'green' }}><span className="mr-2"><FontAwesomeIcon icon={faCheck} /></span>Principle</div>
                        <div className="choose-result" style={{ color: 'red' }}><span className="mr-2"><FontAwesomeIcon icon={faTimes} size="lg" /></span>Principle</div>
                    </div>
                </div>
                <button
                    onClick={this.props.closePopup}
                >Close</button>
            </div>
        );
    }
}

export default QuizPop;