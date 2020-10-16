const { Router } = require("express")
const router = Router()
const { check } = require("express-validator")

const authController = require("../controllers/auth.controller")

router.post(
    "/register",
    [
        check("name", "Name field is required!").exists(),
        check("email", "Email is invalid").isEmail(),
        check("password", "Password must be least at 6 characters!")
            .isLength({ min: 6 })
            .exists(),
    ],
    authController.register
)

router.post(
    "/login",
    [
        check("email", "Email is invalid").isEmail(),
        check("password", "Password must be least at 6 characters!").exists(),
    ],
    authController.login
)

module.exports = router
