import React from 'react'
import './Invitation.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt, faDollarSign } from '@fortawesome/free-solid-svg-icons';

class InviteCampOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                id: 0,
                title: "",
                subject_id: 0,
                company_address: "",
                level_id: 0,
                amount_required: 0,
                work_type_id: 0,
                sex: 0,
                experience: 0,
                salary: 0,
                deadline: "",
                user_id: 0,
                work_description: "",
                location: "",
                user: {
                    company: {
                        id: 0,
                        address: "",
                    },
                },
                subjects: [
                    {
                        id: 0,
                        title: "",
                    },
                ],
            },
        }
    }
    render() {
        return (
            <div className="invite-camp-overview-container">
                <div className="i-c-o-wrapper">
                    <div className="i-c-o-img">
                        <img alt="ava"
                            src={require("../images/news.png")}
                        />
                    </div>
                    <div className="i-c-o-info">
                        <div className="i-c-o-title">
                            ReactJs Developer
                        </div>
                        <div className="i-c-o-company">
                            Google
                        </div>
                        <div className="i-c-o-salary-and-location">
                            <span><FontAwesomeIcon color="#fd7e14" className="mr-2" icon={faMapMarkedAlt} />TP HCM</span>
                            <span><FontAwesomeIcon color="#fd7e14" className="mr-2" icon={faDollarSign} />Agreement</span>
                        </div>
                        {/* <div className="i-c-o-suject-list">
                            <div className="i-c-o-subject">
                                ReactJs
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="i-c-o-buttons float-right">
                    <button className="i-c-o-accept">Accept</button>
                    <button className="i-c-o-decline">Decline</button>
                </div>
            </div>
        );
    }
}

export default InviteCampOverview;