const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:"user"
    }
});

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:String,
    price:Number,
    description:String,
    image:String
});

module.exports = mongoose.model("Product", productSchema);

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId:String,
    products:Array,
    total:Number
});

module.exports = mongoose.model("Order", orderSchema);
