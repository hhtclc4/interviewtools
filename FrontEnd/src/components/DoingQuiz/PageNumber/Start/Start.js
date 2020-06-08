import React from 'react'
import './Start.scss'
import StartCountDown from './CountDown/CountDown'
let count;
class PageNumberStart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 3,
        }
    }

    countDown = () => {
        let { step } = this.state;
        while (step >= -1) {
            count = setTimeout(() => {
                this.setState({
                    step: this.state.step - 1,
                })
            }, 1200);
            return <StartCountDown step={step} />
        }
        clearTimeout(count);
    }

    render() {
        let countElm = this.countDown();
        return (
            <div className="page-quiz-start">
                {countElm}
            </div>
        );
    }
}

export default PageNumberStart;