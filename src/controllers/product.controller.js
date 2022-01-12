const express = require("express");

const Product = require("../models/product.model");
const User = require("../models/user.model")

const transporter = require("../configs/email")

const router = express.Router();

router.post("",async (req,res)=>{
    try{
        const product = await Product.create(req.body);
        const user = await User.findById(product.user_id).lean().exec();

        const message = {
            from: "krankumar21895@gmail.com",
            to: user.email,
            subject: "New Product Created",
            text: "Product is created",
            html: "<h1>Product is created</h1>",
          };

          transporter.sendMail(message)

        return res.status(201).send(product);
    }catch(err){
        return res.status(500).send(err.message);
    }
});

router.get("",async (req,res)=>{
    try{
        const page= +req.query.page ||1;//default value 1
        const size = +req.query.size ||5;//default value 5
        const search = req.query.search;


        const skip =(page -1)*size;
        let products,totalPages;
        if(!search){
            products = await Product.find().skip(skip).limit(size).lean().exec() ;
            totalPages = Math.ceil((await Product.find().countDocuments())/size);
        }else{
            products = await Product.find({name:search}).skip(skip).limit(size).lean().exac() ;
            totalPages = Math.ceil((await Product.find().countDocuments())/size);
        }

        

        return res.status(201).send({products,totalPages});
    }catch(err){
        return res.status(500).send(err.message);
    }
})



module.exports = router;

