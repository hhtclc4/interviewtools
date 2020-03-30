import React from "react";

import "./Home.scss";

import HomeNav from "../../components/Home/Nav/Nav";
import HomeBody from "../../components/Home/HomeBody/HomeBody";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="home-container" >
        <HomeNav />
        <HomeBody />
      </div>
    );
  }
}

export default Home;
