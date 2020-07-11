import React from 'react'
import './Invitation.scss'
import { withRouter } from "react-router-dom";

class Invitation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                Invitation here
            </div>
        );
    }
}

export default withRouter(Invitation);