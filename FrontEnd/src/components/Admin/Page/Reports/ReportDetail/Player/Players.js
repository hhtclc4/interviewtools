import React from "react";
import "./Players.scss";
import { withRouter } from "react-router-dom";
import PopUp from "../../../../../../utils/PopUp/PopUp";
import QuizPop from "../Quiz/Quiz";
class ReportPlayers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  togglePopUp = () => {
    // if (this.state.isShowQuiz === true) {
    //   this.setState({
    //     isShowQuiz: false,
    //   })
    // }
    console.log(this.state.isShowQuiz);
    this.setState({
      isShowQuiz: !this.state.isShowQuiz,
      isOpenPopup: !this.state.isOpenPopup,
    });
  };
  render() {
    let { data } = this.props;
    let { isShowQuiz, isOpenPopup } = this.state;
    return (
      <div
        className="report-detail-player-container container-fluid "
        onClick={!isOpenPopup ? this.togglePopUp : null}
      >
        {isShowQuiz ? (
          <PopUp
            openPop={(open) => {
              setTimeout(() => {
                this.setState({
                  isShowQuiz: !open,
                  isOpenPopup: false,
                });
              }, 150);
            }}
          >
            <QuizPop togglePopUp={this.togglePopUp} />
          </PopUp>
        ) : null}
        <div className="rd-player-row row shadow-sm d-flex flex-row ">
          <div className="rdp-ava align-self-center col-1">
            <img
              alt="rdp-ava"
              src={require("../../../../../../utils/images/defaultava.png")}
            />
          </div>
          <div className="rdp-name col-1 align-self-center">{data.name}</div>
          {/*De so zo*/}
          <div className="rdp-accuracy-bar col-4 align-self-center">
            50
          </div>{" "}
          {/*De so zo*/}
          <div className="rdp-accuracy-rate col-3 align-self-center">
            100
          </div>{" "}
          {/*De so zo*/}
          <div className="rdp-score col-3 align-self-center">9000</div>{" "}
          {/*De so zo*/}
        </div>
      </div>
    );
  }
}

export default withRouter(ReportPlayers);
