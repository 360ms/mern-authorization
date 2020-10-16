const c = require("config")
const mongoose = require("mongoose")

mongoose
    .connect(process.env.MONGO_URI || c.get("mongoURI"), {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
    })
    .then(() => console.log(`Mongodb connected ✔`))
    .catch((error) => console.log(`Mongodb error: ${error.message}`))

module.exports = mongoose.connection
