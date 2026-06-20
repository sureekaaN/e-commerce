const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async(req,res)=>{
    const hashed = await bcrypt.hash(req.body.password,10);

    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashed
    });

    await user.save();

    res.json("Registered");
});

router.post("/login", async(req,res)=>{
    const user = await User.findOne({
        email:req.body.email
    });

    if(!user)
        return res.status(400).json("User not found");

    const valid = await bcrypt.compare(
        req.body.password,
        user.password
    );

    if(!valid)
        return res.status(400).json("Wrong Password");

    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET
    );

    res.json({token});
});

module.exports = router;

const router = require("express").Router();
const Product = require("../models/Product");

router.get("/", async(req,res)=>{
    const products = await Product.find();
    res.json(products);
});

router.post("/", async(req,res)=>{
    const product = new Product(req.body);
    await product.save();
    res.json(product);
});

module.exports = router;

const router = require("express").Router();
const Order = require("../models/Order");

router.post("/", async(req,res)=>{
    const order = new Order(req.body);
    await order.save();
    res.json(order);
});

module.exports = router;
