const express = require('express')
const buyerAuthRouter = express.Router()
const buyerAuthController = require('../controllers/buyerAuthController')

//API to Sign up
buyerAuthRouter.post('/sign-up', buyerAuthController.addNewBuyer)

//API to Login 
buyerAuthRouter.post('/login', buyerAuthController.loginExistingBuyer)

//API to get buyer details after the login
buyerAuthRouter.post('/loginDetails', buyerAuthController.buyerDetails)

//Route to add product id to cart
buyerAuthRouter.post('/addProductToCart', buyerAuthController.addProductToBuyerCart)

//Route to remove productId from the cart
buyerAuthRouter.post('/removeProductFromCart', buyerAuthController.removeProductFromCart)

module.exports = buyerAuthRouter