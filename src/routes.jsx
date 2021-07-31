import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/home /home";
import Login from "./pages/user/login/login"
import Projects from "./pages/user/projects/projects";
import UpdateProject from './pages/user/projects/update/updateProject'

const Routes = () => {
  return (
    <Router>
      <Route path="/home" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/projects" exact component={Projects} />
      <Route path="/update" exact component={UpdateProject} />
    </Router>
  );
};

export default Routes;
