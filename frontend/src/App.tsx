import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Navbar,
  EditExercise,
  ExercisesList,
  CreateExercise,
  CreateUser,
} from "./components";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={ExercisesList} />
        <Route exact path="/edit/:id" component={EditExercise} />
        <Route exact path="/create" component={CreateExercise} />
        <Route exact path="/user" component={CreateUser} />
      </Switch>
    </Router>
  );
};

export default App;
