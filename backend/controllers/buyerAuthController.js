const buyerAuthModel = require('../models/buyerModel')
const asyncHandler = require('express-async-handler')

//Controller to add new buyer details to database
const addNewBuyer = asyncHandler( async(req, res) => {
    const { name, username, password, } = req.body
    try{
        const userDetails = {
            name: name,
            username: username,
            password: password,
            cart: []
        }
        
        const newUser = new buyerAuthModel(userDetails);
        await newUser.save();
        res.send('New User Added')
        console.log(`New User added: ${username}`);
    }
    catch(err) {
        console.log(err)
    }
})

//Controller to get login details of the existing user
const loginExistingBuyer = asyncHandler( async(req, res) => {
    const { username, password } = req.body
    try{
        const userDetails = await buyerAuthModel.findOne({ username: username })
        
        if (userDetails.password === password ){
            res.json({
                buyerId: userDetails._id
            })
            console.log(userDetails)
        }
    }
    catch(err) {
        console.log('Error in Fetching details')
    }
})

//Controller to get user details after login
const buyerDetails = asyncHandler(async(req, res) => {
    const { buyerId } = req.body

    try{
        const userDetails = await buyerAuthModel.findOne({ _id: buyerId })
        res.send(userDetails)
        console.log(userDetails)
    }
    catch(err) {
        console.log(err)
    }
})

//Controller to add product to cart
const addProductToBuyerCart = asyncHandler( async(req, res) => {
    const { id, productId } = req.body

    try{
        const result = await buyerAuthModel.updateOne(
            { _id: id }, // Filter criteria
            { $push: { cart: productId } } // Update operation
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

//Controller to remove product from the cart
const removeProductFromCart = asyncHandler(async(req, res) => {
    const { userId, productId } = req.body

    try{
        await buyerAuthModel.updateOne({ "_id": userId }, { $pull: { "cart" : productId }})
        console.log('productId Deleted')
    }
    catch(err) {
        console.log(err)
    }
})

module.exports = { addNewBuyer, loginExistingBuyer, buyerDetails, addProductToBuyerCart, removeProductFromCart }