import React from 'react'
import './Nav.scss'

class HRNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="hr-nav-container">
                <div className="logo">
                    <img alt="logo" className="big-logo" src={require("../../../utils/images/logo.png")}
                        style={{ height: '56px' }}
                    />
                </div>
            </div>
        );
    }
}

export default HRNav;