import React from "react"
import PropTypes from "prop-types"
import * as Yup from "yup"

import { useEffect } from "react"
import { connect } from "react-redux"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { FormGroup, Container, Row, Col, Button } from "shards-react"
import { NavLink, withRouter } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"

import { registerUser } from "../redux/actions/auth.actions"

const Register = (props) => {
    useEffect(() => {
        if (props.auth.isAuthenticated) {
            props.history.push("/dashboard")
        }
    }, [props.auth.isAuthenticated, props.history])

    const registerSchema = Yup.object().shape({
        name: Yup.string().required("Name field is required!"),
        email: Yup.string()
            .email("Incorrent email!")
            .required("Email field is required!"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters!")
            .required("Password field is required!"),
    })

    return (
        <Container fluid className="form">
            <Row>
                <Col className="form__part form__pic" />
                <Col className="form__part form__control">
                    <Formik
                        initialValues={{
                            name: "",
                            email: "",
                            password: "",
                        }}
                        validationSchema={registerSchema}
                        onSubmit={(values) => {
                            props.registerUser(values, props.history)
                        }}
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
                                    <label htmlFor="name">Name</label>
                                    <Field
                                        className={
                                            "form-control" +
                                            (errors.name && touched.name
                                                ? " is-invalid"
                                                : "")
                                        }
                                        id="name"
                                        name="name"
                                        type="string"
                                        placeholder="John Watson"
                                    />
                                    {errors.name && touched.name ? (
                                        <span className="error">
                                            <ErrorMessage name="name" />
                                        </span>
                                    ) : null}
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
                                    <Button theme="success">Register</Button>
                                </FormGroup>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </Container>
    )
}

Register.propTypes = {
    auth: PropTypes.object.isRequired,
    registerUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default withRouter(connect(mapStateToProps, { registerUser })(Register))
