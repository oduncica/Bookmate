import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import Library from './components/Library';
import Suggestions from './components/Suggestions';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/library" component={Library} />
        <Route path="/suggestions" component={Suggestions} />
        <Route path="*" component={() => <h1>404 Not Found</h1>} />
      </Switch>
    </Router>
  );
}

export default App;
