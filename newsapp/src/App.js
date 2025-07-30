import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  pageSize = 15 // no of news we want on a single page
  state={
    progress:0
  }
  setProgress=(progress)=>
  {
    this.setState({progress:progress})
  }
  render() {
    return (
      <Router>
        <Navbar />
        <LoadingBar
        height={3}
          color="#f11946"
          progress={this.state.progress}
        
        />
        <Routes>
          <Route
            exact
            path="/"
            element={<News setProgress={this.setProgress}     pageSize={this.pageSize} country="us" category="science" />}
          />
          <Route exact path="/bussiness" element={<News setProgress={this.setProgress}   key="bussiness " pageSize={this.pageSize} country="us" category="bussiness" />}
          />key=" "
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress}   key=" entertainment" pageSize={this.pageSize} country="us" category="entertainment" />}
          />key=" "
          <Route exact path="/general" element={<News setProgress={this.setProgress}   key=" general" pageSize={this.pageSize} country="us" category="general" />}
          />key=" "
          <Route exact path="/health" element={<News setProgress={this.setProgress}   key="health " pageSize={this.pageSize} country="us" category="health" />}
          />key=" "
          <Route exact path="/science" element={<News setProgress={this.setProgress}   key=" science" pageSize={this.pageSize} country="us" category="science" />}
          />key=" "
          <Route exact path="/sports" element={<News setProgress={this.setProgress}   key=" sports" pageSize={this.pageSize} country="us" category="sports" />}
          />key=" "
          <Route exact path="/technology" element={<News setProgress={this.setProgress}   key=" technology" pageSize={this.pageSize} country="us" category="technology" />}
          />
        </Routes>
      </Router>
    );
  }
}
