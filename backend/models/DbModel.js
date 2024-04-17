const mongoose = require('mongoose')
const schema = mongoose.Schema

const productModel = new schema({
    productName: {type: String, required: true},
    productImg: {type: String, required: true},
    productPrice: {type: Number, required: true},
    productDescription: {type: String, required: true},
    seller: {type: String, required: true}
})

module.exports = mongoose.model('Product', productModel)