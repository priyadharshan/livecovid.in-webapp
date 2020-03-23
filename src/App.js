import React, { Component } from "react";
import "./App.css";
import { getStateWiseData } from "./services/patients.service";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Help from "./pages/Help";
import Home from "./pages/Home";
import Toolbar from "./components/nav/Toolbar";
import Footer from "./components/Footer";
import Credits from "./pages/Credits";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      statewise: {},
      total: {},
      dayChange: {},
      isMobile: document.documentElement.clientWidth < 768
    };
  }

  componentDidMount() {
    getStateWiseData().then(({ data }) => {
      console.log(data);
      this.setState({
        ...this.state,
        statewise: data.statewise,
        total: data.total,
        dayChange: data.dayChange,
        isLoading: false
      });
    });
  }
  render() {
    return (
      <Router>
        <div>
          <Toolbar />
          <Switch>
            <Route exact path="/help">
              <Help></Help>
            </Route>
            <Route exact path="/credits">
              <Credits></Credits>
            </Route>
            <Route exact path="/">
              <Home
                isLoading={this.state.isLoading}
                dayChange={this.state.dayChange}
                total={this.state.total}
                statewise={this.state.statewise}
                isMobile={this.state.isMobile}
              ></Home>
            </Route>
          </Switch>
          <Footer></Footer>
        </div>
      </Router>
    );
  }
}

export default App;