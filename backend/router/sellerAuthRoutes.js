const express = require('express');
const sellerAuthController = require('../controllers/sellerAuthController')
const sellerAuthRouter = express.Router();

//Route to add new seller
sellerAuthRouter.post('/sign-up', sellerAuthController.addNewSeller)

//Route to login the existing seller
sellerAuthRouter.post('/login', sellerAuthController.loginExistingSeller)

//Route to get seller details for login
sellerAuthRouter.post('/loginDetails', sellerAuthController.sellerDetails)

//Route to put product id in seller database
sellerAuthRouter.post('/addProductId', sellerAuthController.addProductIdToSellerData)

//Route to delete the product id from the seller's database
sellerAuthRouter.post('/deleteProductId', sellerAuthController.deleteProductId)

//Route to send seller basic details
sellerAuthRouter.post('/sellerBasicDetails', sellerAuthController.sellerBasicDetails)

module.exports = sellerAuthRouter;
