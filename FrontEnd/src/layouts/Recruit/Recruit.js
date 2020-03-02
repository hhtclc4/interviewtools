import React from 'react'
import './Recruit.scss'

import RecruitNav from '../../components/Recruit/Nav/Nav'
import RecruitSignup from '../../components/Recruit/RecruitForm/RecruitForm'
class Recruit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="recruit-page containter-fluid">
                <div className="row">
                    <div className="col-xl ">
                        <RecruitNav />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl">
                        <RecruitSignup />
                    </div>
                </div>
            </div>
        );
    }
}

export default Recruit;