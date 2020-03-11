import React from 'react'
import './Reports.scss'
import ReportQuiz from './ReportQuiz';
class Reports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="reports-page-container container py-4">
                <div className="report-table-header row p-2">
                    <div className="col-sm">
                        Type
                    </div>
                    <div className="col-sm">
                        Quiz name
                    </div>
                    <div className="col-sm">
                        Total players
                    </div>
                    <div className="col-sm">
                        Accuracy
                    </div>
                    <div className="col-sm">
                        Options
                    </div>
                </div>
                <div className="report-table-body rounded overflow-hidden shadow">
                    <ReportQuiz />
                    <ReportQuiz />
                </div>
                <div className="report-table-pagination"></div>
            </div>
        );
    }
}

export default Reports;