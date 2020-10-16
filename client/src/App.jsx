import React from "react"

import { Route, Switch } from "react-router-dom"
import { logoutUser, setCurrentUser } from "./redux/actions/auth.actions"
import { setAuthToken } from "./utils/setAuthToken"
import { store } from "./redux/store"

import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import PrivateRoute from "./components/PrivateRoute"
import Register from "./components/Register"
import Navigation from "./components/UI/Navbar"

import jwt_decode from "jwt-decode"
import HomePage from "./components/UI/HomePage"

if (localStorage.token) {
    const token = localStorage.token
    setAuthToken(token)

    const decoded = jwt_decode(token)
    store.dispatch(setCurrentUser(decoded))

    const currentTime = Date.now() / 1000

    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser())

        window.location.href = "/login"
    }
}

const App = () => {
    return (
        <>
            <Navigation />
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Switch>
                <PrivateRoute component={Dashboard} path="/dashboard" />
            </Switch>
        </>
    )
}

export default App
