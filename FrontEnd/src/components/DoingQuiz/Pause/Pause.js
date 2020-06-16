import React from 'react'
import './Pause.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRunning, faFlagCheckered } from '@fortawesome/free-solid-svg-icons';
class PauseQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="pause-container">
                <div className="pause-content">
                    <div className="pause-quiz-progress">
                        <div className="pause-quiz-progress-bar">
                            <div className="progress-display">
                                <div className="questions-done"></div>
                                <div className="question-present"></div>
                                <div className="questions-left"></div>
                            </div>
                            <span className="run"><FontAwesomeIcon icon={faRunning}
                                color="white"
                            /></span>
                            <span className="flag"><FontAwesomeIcon icon={faFlagCheckered}
                                color="white"
                            /></span>
                        </div>
                        <div className="pause-legend d-flex flex-row justify-content-between">
                            <div className="start-legend">Start</div>
                            <div className="end-legend">End</div>
                        </div>
                        <div className="pause-question-left">
                            3 questions remaining
                        </div>
                        <div className="pause-actions">
                            <button className="pause-resume-btn"> Resume Quiz</button>
                            <button className="pause-exit-btn"> Save and Exit</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PauseQuiz;