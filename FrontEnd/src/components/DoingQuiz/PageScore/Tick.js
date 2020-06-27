import React from "react";

class GrowAccuracyTick extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prevResult: 0,
            accuracy: 0,
        }
    }

    componentDidMount() {
        let { prevResult, accuracy } = this.props;
        this.setState({
            prevResult: prevResult,
            accuracy: accuracy
        })

        if (accuracy !== prevResult) {
            // let minus = accuracy - prevResult;
            // if (minus % 2 === 1) {
            //     let add = prevResult + 1;
            //     console.log("prevResult", this.state.prevResult)
            //     this.setState({
            //         prevResult: add,
            //     })
            // }
            this.increaseAccuracy = setInterval(
                () => {
                    this.Tick()
                }, 50
            );
        }
    }

    Tick = () => {
        let add2 = this.state.prevResult + 1;
        if (this.state.prevResult >= this.state.accuracy) {
            return
        }
        else
            this.setState({
                prevResult: add2,
            })
        //clearInterval(this.increaseAccuracy)
    }

    componentWillUnmount() {
        clearInterval(this.increaseAccuracy)
    }
    render() {
        //let { prevResult, accuracy } = this.props;
        return (
            <div className="tick-container">
                {Math.round(this.state.prevResult)}%
            </div>
        );
    }
}

export default GrowAccuracyTick;