#! /usr/bin/env node

console.log("Adding data to the database");

const mongoose = require('mongoose');
const Product = require('../backend/models/DbModel');
const firebaseFunction = require('../backend/firebase')

const imagePaths = {
    bag: "C:/Users/aryan/Downloads/bag.jpg",
    book: "C:/Users/aryan/Downloads/book.jpg",
    laptop: "C:/Users/aryan/Downloads/laptop.jpg",
    pd: "C:/Users/aryan/Downloads/pd.jpeg",
    pen: "C:/Users/aryan/Downloads/pen.jpg",
    phone: "C:/Users/aryan/Downloads/phone.jpeg"
};

const mongodb = process.argv[2];

async function main() {
    try {
        console.log("Connecting to the Database");
        await mongoose.connect(mongodb);
        await addProductDetails();
        console.log("All Products added");
    } catch (error) {
        console.error("Error during script execution:", error);
    } finally {
        mongoose.connection.close();
    }
}

async function addProductDetails() {
    console.log("Adding Products");
    await Promise.all([
        createNewProduct("Book", imagePaths.book, 200, 10),
        createNewProduct("Pen", imagePaths.pen, 10, 100),
        createNewProduct("Bag", imagePaths.bag, 500, 5),
        createNewProduct("Pendrive", imagePaths.pd, 150, 10),
        createNewProduct("Laptop", imagePaths.laptop, 10000, 2),
        createNewProduct("Phone", imagePaths.phone, 30000, 4)
    ]);
}

async function createNewProduct(name, img, price, amount) {

    //putting image in the firebase storage and getting its download URL
    let downloadURL = await firebaseFunction.uploadFileInStorage(img)

    const productDetail = {
        productName: name,
        productImg: downloadURL || '',
        productPrice: price,
        productStock: amount
    };

    try {
        const newProduct = new Product(productDetail);
        await newProduct.save();
        console.log(`New product added: ${name}`);
    } catch (error) {
        console.error(`Error adding product ${name}:`, error);
        throw error;
    }
}

main().catch((err) => console.log(err));
