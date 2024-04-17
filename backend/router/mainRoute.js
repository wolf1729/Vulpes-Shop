const express = require('express')
const router = express.Router()
const productController = require('../controllers/mainController')

//API to get all products
router.get('/', productController.allProducts)

//get details of specific product
router.post('/specificProduct', productController.productDetails)

//API to add new products
router.post('/addNewProduct', productController.addProductToDatabase)

//Get Specific Seller Products
router.post('/getSellerProducts', productController.getSellersProductDetails)

//Get Specific Buyer Products
router.post('/getBuyerProducts', productController.getBuyerProductDetails)

//API to delete the product from product database
router.post('/deleteProduct', productController.deleteProductfromMainDatabase)

module.exports = router