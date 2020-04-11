import React from "react";

import "./Home.scss";
import { withRouter } from "react-router-dom";

import HomeNav from "../../components/Home/Nav/Nav";
import HomeBody from "../../components/Home/HomeBody/HomeBody";
import DetailRecruit from '../../components/Home/HomeBody/DetailRecruit/DetailRecruit'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="home-container">
        <HomeNav />
        <Router>
          <Switch>
            <Route exact path="/" component={HomeBody} />
            <Route path="/detail_recruit" component={DetailRecruit} />}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withRouter(Home);
