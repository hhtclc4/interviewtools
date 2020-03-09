import React from 'react'
import './Reports.scss'
import { withRouter } from "react-router-dom";

class ReportQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accuracy: 2,
        }
    }
    render() {
        let { accuracy } = this.state;
        let accuracyColor = () => {
            if (accuracy > 85)
                return "#7AD18E";
            if (accuracy > 50)
                return "#FDC954";
            return "#EC0B43";
        }
        let { history } = this.props;

        return (
            <div className="report-quiz-container container"
                onClick={() => {
                    history.push(`/admin/reports/report_detail`);
                }}
            >
                <div className="rq-row row">
                    <div className="rq-type col-sm">
                        Type name
                    </div>
                    <div className="rq-name col-sm">
                        Quiz name
                    </div>
                    <div className="rq-players col-sm">
                        Count
                    </div>
                    <div className="rq-accuracy col-sm" >
                        <span className="rounded"
                            style={{ backgroundColor: accuracyColor(), padding: '8px', color: 'white' }}>{accuracy}%</span>
                    </div>
                    <div className="rq-option col-sm"></div>
                </div>
            </div>
        );
    }
}

export default withRouter(ReportQuiz);