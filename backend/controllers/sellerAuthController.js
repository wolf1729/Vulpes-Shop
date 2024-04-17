const sellerAuthModel = require('../models/sellerModel')
const asyncHandler = require('express-async-handler')

//controller to add new seller user
const addNewSeller = asyncHandler( async(req, res) => {
    const { username, password, name, phone } = req.body
    try{
        const userDetails = {
            username: username,
            password: password,
            name: name,
            phone: phone,
            products: []
        }
        
        const newUser = new sellerAuthModel(userDetails);
        await newUser.save();
        res.send('New User Added')
        console.log(`New User added: ${username}`);
    }
    catch(err) {
        console.log(err)
    }
})

//Controller to get login details of the existing user
const loginExistingSeller = asyncHandler( async(req, res) => {
    const { username, password } = req.body
    try{
        const userDetails = await sellerAuthModel.findOne({ username: username })
        
        if (userDetails.password === password ){
            res.json({
                sellerId: userDetails._id
            })
            console.log(userDetails._id)
        }
        else {
            res.send('Email or Password is wrong')
        }
    }
    catch(err) {
        console.log('Error in Fetching details')
    }
})

//Controller to get seller details
const sellerDetails = asyncHandler(async(req, res) => {
    const { sellerId } = req.body

    try{
        const userDetails = await sellerAuthModel.findOne({ _id: sellerId })
        res.send(userDetails)
        console.log(userDetails)
    }
    catch(err) {
        console.log(err)
    }
})

//Function to add the product id to the seller data
const addProductIdToSellerData = asyncHandler( async(req, res) => {
    const { id, productId } = req.body

    try{
        const result = await sellerAuthModel.updateOne(
            { _id: id }, // Filter criteria
            { $push: { product: productId } } // Update operation
          );
      
          // Check if the update was successful
          if (result.nModified === 1) {
            console.log('Element added to the array.');
            res.send('added')
            return true;
          } else {
            console.log('Element was not added to the array.');
            res.send('not added')
            return false;
          }
    }
    catch(err) {
        console.log(err)
    }
})

//Delete the product Id from the seller database
const deleteProductId = asyncHandler(async(req, res) => {
    const { userId, productId } = req.body

    try{
        const deleteTheProductId = await sellerAuthModel.updateOne({ "_id": userId }, { $pull: { "product" : productId}})
        console.log('productId Deleted')
    }
    catch(err) {
        console.log(err)
    }
})

//Controller to get seller details for the product page
const sellerBasicDetails = asyncHandler(async(req, res) => {
    const { userId } = req.body

    try{
        const basicDetails = await sellerAuthModel.findOne({ _id: userId })
        res.json({
            name: basicDetails.name,
            phone: basicDetails.phone
        })
        console.log(basicDetails)
    }
    catch(err) {
        console.log(err)
    }
})

module.exports = { addNewSeller, loginExistingSeller, sellerDetails, addProductIdToSellerData, deleteProductId, sellerBasicDetails }