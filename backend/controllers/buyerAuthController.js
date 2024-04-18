const buyerAuthModel = require('../models/buyerModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

//Controller to add new buyer details to database
const addNewBuyer = asyncHandler( async(req, res) => {
    const { name, username, password, } = req.body

    const passwordHash = await bcrypt.hash(password, 10);

    try{
        const userDetails = {
            name: name,
            username: username,
            password: passwordHash,
            cart: []
        }
        
        const newUser = new buyerAuthModel(userDetails);
        await newUser.save();
        res.send('New User Added')
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
        
        const isPasswordMatch = await bcrypt.compare(password, userDetails.password);

        if (isPasswordMatch) {
            return res.json({ buyerId: userDetails._id });
        } else {
            return res.json({ buyerId: null });
        }
    }
    catch(err) {
        res.json({
            buyerId: null
        })
    }
})

//Controller to get user details after login
const buyerDetails = asyncHandler(async(req, res) => {
    const { buyerId } = req.body

    try{
        const userDetails = await buyerAuthModel.findOne({ _id: buyerId })
        res.send(userDetails)
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
    }
    catch(err) {
        console.log(err)
    }
})

module.exports = { addNewBuyer, loginExistingBuyer, buyerDetails, addProductToBuyerCart, removeProductFromCart }