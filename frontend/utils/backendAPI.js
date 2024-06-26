const baseURL = "https://vulpesshopbackend.onrender.com"
// const baseURL = "http://localhost:3000"

//Function to get all the product details
const allProducts = async() => {
    try{ 
        const response = await fetch(baseURL, {mode: 'cors'})
        const data = await response.json()
        return data
    }
    catch(err) {
        console.log(err)
    }
}

//api call to get details of specific product
const getDetails = async(productId) => {
    try{
        const details = await fetch(`${baseURL}/specificProduct`, {
            method: 'POST',
            body: JSON.stringify({
                productId: productId
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const data = await details.json()
        return data
    }
    catch(err) {
        console.log(err)
    }
}

const addProductAPI = async(name, price, image, description, sellerId) => {
    try{
        const response = await fetch(`${baseURL}/addNewProduct`, {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                price: price,
                image: image,
                description: description,
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

const getSellerProductsAPI = async(productId) => {
    try{
        const response = await fetch(`${baseURL}/getSellerProducts`, {
            method: 'POST',
            body: JSON.stringify({
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

const getBuyerProductsAPI = async(productId) => {
    try{
        const response = await fetch(`${baseURL}/getBuyerProducts`, {
            method: 'POST',
            body: JSON.stringify({
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

//Delete product from the main database
const deleteProduct = async(productId) => {
    try{
        await fetch(`${baseURL}/deleteProduct`, {
            method: 'POST',
            body: JSON.stringify({
                productId: productId
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    }
    catch(err) {
        console.log(err)
    }
}

const searchedProductByNameDetails = async(searchedName) => {
    try{
        const details = await fetch(`${baseURL}/searchProductByName`, {
            method: 'POST',
            body: JSON.stringify({
                searchName: searchedName
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const data = await details.json()
        return data
    }
    catch(err) {
        console.log(err)
    }
}

export { allProducts, addProductAPI, getSellerProductsAPI, getBuyerProductsAPI, deleteProduct, getDetails, searchedProductByNameDetails }