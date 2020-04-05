import React from 'react'
import './Interview.scss'
import { Menu, Dropdown, Button, Icon } from "antd";
class InterviewPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {

        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1">1st menu item</Menu.Item>
                <Menu.Item key="2">2nd menu item</Menu.Item>
                <Menu.Item key="3">3rd item</Menu.Item>
            </Menu>
        );
        return (
            <div className="interview-popup-container">
                <div className="interview-popup-inner container-fluid">
                    <div className="row " style={{ height: '100%' }}>
                        <div className="col-md-3"></div>
                        <div className="col-lg-6 d-flex flex-column justify-content-around">
                            <div className="interview-popup-content p-3">
                                <div className="interview-popup-header d-flex flex-row">
                                    <img alt="interview"
                                        src={require("../../images/Interview.png")}
                                        style={{ width: '60px', marginRight: '5px' }}
                                    />
                                    <p className="align-self-center">Create new interview period</p>
                                </div>
                                <div
                                    className="create-new-interview-period d-flex flex-column justify-content-between p-3 flex-wrap"
                                >
                                    <div className="cni-name mb-2 mr-2">
                                        <p>Set interview name</p>
                                        <input
                                            className="interview-period-attribute"
                                            placeholder="Enter interview name..."
                                        />
                                    </div>
                                    <div className="cni-time mb-2 mr-2">
                                        <p>Pick interview time</p>
                                        <div className="cin-time-attribute d-flex flex-row">
                                            <div className="cni-time-week-day">
                                                <Dropdown
                                                    overlay={menu}
                                                    trigger={["click"]}
                                                    className="mr-1"
                                                >
                                                    <Button style={{ top: "0" }}>
                                                        Week day <Icon type="down" />
                                                    </Button>
                                                </Dropdown>
                                            </div>
                                            <div className="cni-time-month">
                                                <Dropdown
                                                    overlay={menu}
                                                    trigger={["click"]}
                                                    className="mr-1"
                                                >
                                                    <Button style={{ top: "0" }}>
                                                        Month <Icon type="down" />
                                                    </Button>
                                                </Dropdown>
                                            </div>
                                            <div className="cni-time-day">
                                                <Dropdown
                                                    overlay={menu}
                                                    trigger={["click"]}
                                                    className="mr-1"
                                                >
                                                    <Button style={{ top: "0" }}>
                                                        Day <Icon type="down" />
                                                    </Button>
                                                </Dropdown>
                                            </div>
                                            <div className="cni-time-hour">
                                                <Dropdown overlay={menu} trigger={["click"]}>
                                                    <Button style={{ top: "0" }}>
                                                        Hour <Icon type="down" />
                                                    </Button>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cni-target mb-2 mr-2">
                                        <p>Set interview target</p>
                                        <div className="cni-targer-attribute">
                                            <input
                                                className="interview-period-attribute-count mr-1"
                                                placeholder="from"
                                            />
                                            <input
                                                className="interview-period-attribute-count"
                                                placeholder="to"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="float-right "
                                    onClick={this.props.closePopup}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                        <div className="col-md-3"></div>
                    </div>

                </div>
            </div>
        );
    }
}

export default InterviewPopup;