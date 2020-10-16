const express = require("express")
const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 9000
require("./mongodb/db")

const authRouter = require("./routes/auth.routes")

app.use(express.json())
app.use(cors())

app.use("/api/auth", authRouter)

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
}

app.listen(PORT, () => console.log(`The server has started on PORT ${PORT} ✔`))
