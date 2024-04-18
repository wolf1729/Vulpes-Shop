const productModel = require('../models/DbModel')
//const firebaseFunction = require('../../frontend/utils/firebase')
const asyncHandler = require('express-async-handler')

//function to get all the products from the database
const allProducts = asyncHandler(async(req, res) => {
    try{
        const products = await productModel.find()
        res.send(products)
    }
    catch(err) {
        console.log(err)
    }
})

//function to get details of specific product
const productDetails = asyncHandler(async(req, res) => {
    const { productId } = req.body

    try{
        const product = await productModel.findOne({ _id: productId })
        res.send(product)
    }
    catch(err) { 
        console.log(err)
    }
})

//Function to add product to the database
const addProductToDatabase = asyncHandler(async(req, res) => {
    const { name, price, image, description, sellerId } = req.body

    // let downloadURL = ""
    // downloadURL = await firebaseFunction.uploadFileInStorage(image, name)

    const productDetail = { 
        productName: name,
        productImg: image,
        productPrice: price,
        productDescription: description,
        seller: sellerId
    };

    try {
        const newProduct = new productModel(productDetail);
        await newProduct.save();
        res.send(newProduct._id)
    } catch (error) {
        console.error(`Error adding product ${name}:`, error);
        throw error;
    }
})

const getSellersProductDetails = asyncHandler(async(req, res) => {
    const { productId } = req.body

    try{
        const sellerProducts = await productModel.findOne({ _id: productId })
        res.send(sellerProducts)
    }
    catch(err) {
        console.log(err)
    }
})

const getBuyerProductDetails = asyncHandler(async(req, res) => {
    const { productId } = req.body

    try{
        const sellerProducts = await productModel.findOne({ _id: productId })
        res.send(sellerProducts)
    }
    catch(err) {
        console.log(err)
    }
})


const deleteProductfromMainDatabase = asyncHandler(async(req, res) => {
    const { productId } = req.body

    try{
        const deleteTheProduct = await productModel.deleteOne({ _id: productId })
    }
    catch(err) {
        console.log(err)
        console.log('Item not deleted')
    }
})

module.exports = { allProducts, productDetails, addProductToDatabase, getSellersProductDetails, getBuyerProductDetails, deleteProductfromMainDatabase }