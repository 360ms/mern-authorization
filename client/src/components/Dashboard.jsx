import React from "react"

import { connect } from "react-redux"
import { Container } from "shards-react"
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    CardFooter,
    Button,
} from "shards-react"

import { logoutUser } from "../redux/actions/auth.actions"

const Dashboard = ({ auth, logoutUser }) => {
    return (
        <Container className="text-center mt-5 user-card">
            <Card>
                <CardHeader>
                    Welcome, <strong>{auth.user.name}</strong>
                </CardHeader>
                <CardBody>
                    <CardTitle>User info</CardTitle>
                    <p>
                        Email: <strong>{auth.user.email}</strong>
                    </p>
                </CardBody>
                <CardFooter>
                    <Button theme="danger" onClick={logoutUser}>
                        Logout
                    </Button>
                </CardFooter>
            </Card>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { logoutUser })(Dashboard)
