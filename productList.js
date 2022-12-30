const products = require("./constants/productData");
const Product = require("./models/productSchema");

const product_list = async () => {
    try {
        await Product.insertMany(products);
        console.log("product list imported succesfully");
    } catch(err) {
        //console.log(err.code);
        if (err) return console.log("product list already present in database")
        console.log("Error while inserting product list", err.message)
    }
}

module.exports = product_list; 