import React from 'react'
import './Editable.scss'
class HREditable extends React.Component {
    constructor(props) {
        super(props);

        this.editInputRef = React.createRef()
        this.state = {}
    }

    UNSAFE_componentWillMount() {
        document.addEventListener('click', this.handleCompClick, false)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleCompClick, false)
    }

    handleCompClick = (e) => {
        if (!this.editRef.contains(e.target)) {
            //outside
            this.editInputRef.current.style.border = "none";
            return
        }
        else {
            //inside
            this.editInputRef.current.focus();
            this.editInputRef.current.select();
            this.editInputRef.current.style.border = "2px solid #1092f4";
        }
    }

    handleFocus = (e) => {
        e.target.select()
    }
    render() {
        return (
            <div className="edit-container">
                <div className="edit-title">{this.props.title}</div>
                <div className="info-title "
                    ref={node => this.editRef = node}
                    onClick={this.handleCompClick}
                >
                    <input
                        defaultValue={this.props.content}
                        type="text"
                        ref={this.editInputRef}
                        onFocus={this.handleFocus}
                    />
                </div>
            </div>
        );
    }
}

export default HREditable;