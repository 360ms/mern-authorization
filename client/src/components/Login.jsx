import React, { useEffect } from "react"
import PropTypes from "prop-types"
import * as Yup from "yup"

import { connect } from "react-redux"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { NavLink, withRouter } from "react-router-dom"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FormGroup, Container, Row, Col, Button } from "shards-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { loginUser } from "../redux/actions/auth.actions"

const Login = (props) => {
    useEffect(() => {
        if (props.auth.isAuthenticated) {
            props.history.push("/dashboard")
        }
    }, [props.auth.isAuthenticated, props.history])

    const loginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email!")
            .required("Email is required field!"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters!")
            .required("Password is required field!"),
    })

    return (
        <Container fluid className="form">
            <Row>
                <Col className="form__part form__control">
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        validationSchema={loginSchema}
                        onSubmit={(values) => props.loginUser(values)}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <FormGroup>
                                    <NavLink to="/" className="text-success">
                                        <FontAwesomeIcon icon={faArrowLeft} />
                                        &nbsp; Back to home
                                    </NavLink>
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        className={
                                            "form-control" +
                                            (errors.email && touched.email
                                                ? " is-invalid"
                                                : "")
                                        }
                                        id="email"
                                        name="email"
                                        placeholder="example@gmail.com"
                                    />
                                    {errors.email && touched.email ? (
                                        <span className="error">
                                            <ErrorMessage name="email" />
                                        </span>
                                    ) : null}
                                </FormGroup>

                                <FormGroup>
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        className={
                                            "form-control" +
                                            (errors.password && touched.password
                                                ? " is-invalid"
                                                : "")
                                        }
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="********"
                                    />
                                    {errors.password && touched.password ? (
                                        <span className="error">
                                            <ErrorMessage name="password" />
                                        </span>
                                    ) : null}
                                </FormGroup>

                                <FormGroup>
                                    <Button theme="success">Login</Button>
                                </FormGroup>
                            </Form>
                        )}
                    </Formik>
                </Col>
                <Col className="form__part form__pic" />
            </Row>
        </Container>
    )
}

Login.propTypes = {
    auth: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default withRouter(connect(mapStateToProps, { loginUser })(Login))
