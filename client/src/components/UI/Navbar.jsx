import React, { useState } from "react"

import {
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    Collapse,
    Container,
} from "shards-react"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { logoutUser } from "../../redux/actions/auth.actions"

const Navigation = ({ auth, logoutUser }) => {
    const [collapseOpen, setCollapseOpen] = useState(false)

    return (
        <Navbar type="dark" theme="success" expand="md">
            <Container>
                <NavLink className="navbar-brand" to="/">
                    Authorization
                </NavLink>
                <NavbarToggler
                    onClick={setCollapseOpen.bind(this, !collapseOpen)}
                />

                <Collapse open={collapseOpen} navbar>
                    <Nav navbar className="ml-auto">
                        {!auth.isAuthenticated ? (
                            <>
                                <NavItem>
                                    <NavLink className="nav-link" to="/login">
                                        Login
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink
                                        className="nav-link"
                                        to="/register"
                                    >
                                        Register
                                    </NavLink>
                                </NavItem>
                            </>
                        ) : (
                            <>
                                <NavItem>
                                    <NavLink
                                        className="nav-link"
                                        to="/dashboard"
                                    >
                                        Dashboard
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className="nav-link"
                                        onClick={logoutUser}
                                        to="#"
                                    >
                                        Logout
                                    </NavLink>
                                </NavItem>
                            </>
                        )}
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { logoutUser })(Navigation)
