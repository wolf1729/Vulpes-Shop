const mongoose = require('mongoose')
const schema = mongoose.Schema

const buyerDbModel = new schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: { type: Array, required: false },
})

module.exports = mongoose.model("buyer-Data", buyerDbModel)