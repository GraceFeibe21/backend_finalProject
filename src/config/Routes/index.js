import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import About from '../../pages/About'
import Dashboard from '../../pages/Dashboard'
import Login from '../../pages/Login'
import Register from '../../pages/Register'

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" >
                    <Dashboard />
                </Route>
                <Route path="/login" >
                    <Login title ="Welcome" />
                </Route>
                <Route path="/about" >
                    <About />
                </Route>
                <Route path="/register" >
                    <Register />
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes
