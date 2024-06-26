const baseURL = "https://vulpesshopbackend.onrender.com"
// const baseURL = "http://localhost:3000"

const newSellerSignUp = async(username, password, name, phone) => {
    try{
        const details = await fetch(`${baseURL}/sellerAuth/sign-up`, {
            method: 'POST',

            body: JSON.stringify({
                username: username,
                password: password,
                name: name,
                phone: phone,
                products: []
            }), 

            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const sendingResult = await details.json()
        return sendingResult
    }
    catch(err) {
        console.log(err)
    }
}

//Getting existing user details
const existingUserDetails = async(username, password) => {
    try{
        const response = await fetch(`${baseURL}/sellerAuth/login`, {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const data = await response.json()
        return data
    }
    catch(err) {
        console.log(err)
    }
}

const sellerDetailsAfterLogin = async(sellerId) => {
    try{
        const response = await fetch(`${baseURL}/sellerAuth/loginDetails`, {
            method: 'POST',
            body: JSON.stringify({
                sellerId: sellerId
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const data = await response.json()
        return data
    }
    catch(err) {
        console.log(err)
    }
}

//Adding the product id to database
const addProductId = async(id, productId) => {
    try{
        const response = await fetch(`${baseURL}/sellerAuth/addProductId`, {
            method: 'POST',
            body: JSON.stringify({
                id: id,
                productId: productId
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const data = await response.json()
        return data 
    }
    catch(err) {
        console.log(err)
    }
}

//API call to delete the productId from the seller database
const removeProductid = async(userId, productId) => {
    try{
        const response = await fetch(`${baseURL}/sellerAuth/deleteProductId`, {
            method: 'POST',
            body: JSON.stringify({
                userId: userId,
                productId: productId
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const data = await response.json()
        return data
    }
    catch(err) {
        console.log(err)
    }
}

//Getting Basic Seller Details
const gettingBasicSellerDetails = async(id) => {
    try{
        const response = await fetch(`${baseURL}/sellerAuth/sellerBasicDetails`, {
            method: 'POST',
            body: JSON.stringify({
                userId: id 
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const data = await response.json()
        return data
    }
    catch(err) {
        console.log(err)
    }
}


export { newSellerSignUp, existingUserDetails, sellerDetailsAfterLogin, addProductId, removeProductid, gettingBasicSellerDetails }