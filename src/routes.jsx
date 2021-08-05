import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/user/login/login"
import Projects from "./pages/user/projects/projects";
import UpdateProject from './pages/user/projects/update/updateProject'
import CreateProject from "./pages/projects/createProject";
import CreateUser from "./pages/user/create/createUser";

const Routes = () => {
  return (
    <Router>
      <Route path="/login" exact component={Login} />
      <Route path="/projects" exact component={Projects} />
      <Route path="/update" exact component={UpdateProject} />
      <Route path="/home" component={Home} />
      <Route path="/createuser" component={CreateUser} />
      <Route path="/createProject" component = {CreateProject} />
    </Router>
  );
};

export default Routes;
