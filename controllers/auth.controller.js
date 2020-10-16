const User = require("../mongodb/models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const c = require("config")

const register = async (req, res) => {
    const body = req.body
    const { name, email, password } = body

    const candidate = await User.findOne({ email })
    if (candidate)
        return res.status(400).json({
            message: "Email already exist!",
        })

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = new User({ name, email, password: hashedPassword })
    await newUser
        .save()
        .then(() => res.json({ message: "User created! ✔" }))
        .catch((error) => res.json({ message: error.message }))
}

const login = async (req, res) => {
    const body = req.body
    const { email, password } = body

    await User.findOne({ email })
        .then(async (user) => {
            if (!user)
                return res.status(501).json({ message: "User not found!" })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch)
                return res.status(501).json({ message: "User not found!" })

            const token = jwt.sign(
                { name: user.name, email },
                c.get("secret"),
                {
                    expiresIn: 500,
                }
            )

            return res.json({
                message: "Welcome! 😅",
                token: `Bearer ${token}`,
                userData: {
                    name: user.name,
                    email,
                },
            })
        })
        .catch((error) => res.status(404).json({ message: error.message }))
}

module.exports = {
    register,
    login,
}
