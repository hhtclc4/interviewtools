import React from 'react'
import './Discover.scss'
import HomeNav from '../Nav/Nav'
import { Select } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import DiscoverOverview from './Overview/Overview'
const { Option } = Select;
class Homediscover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    locationMenu = () => {
        const children = [];
        for (let i = 10; i < 36; i++) {
            children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
        }

        return children;
    }
    render() {

        let locationMenu = this.locationMenu();
        return (
            <div className="discover-page-container">
                <HomeNav />
                <div className="discover-main">
                    <div className="candidate-job-search-container mb-4 ">
                        <div className="candidate-job-search">
                            <input className="search-ipt flex-fill" placeholder="Search jobs ..." />
                            <div className="control-select-and-icon mx-2 ">
                                <span className="insert-icon"><FontAwesomeIcon icon={faMapMarkerAlt} color="#fd7e14" /></span>
                                <Select
                                    style={{ width: '100%', fontSize: '18px' }}
                                    placeholder="Select location..."
                                >
                                    {locationMenu}
                                </Select>
                            </div>
                            <button className="search-btn">Search</button>
                        </div>
                    </div>

                    <div className="search-result-header">
                        <h5>Top results for <em><strong>Test</strong></em></h5>
                    </div>

                    <div className="search-result-list">
                        <DiscoverOverview />
                        <DiscoverOverview />
                    </div>
                </div>
            </div>
        );
    }
}

export default Homediscover;