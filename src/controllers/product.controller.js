const express = require("express");

const Product = require("../models/product.model")

const router = express.Router();

router.post("",async (req,res)=>{
    try{
        const product = await Product.create(req.body);
        return res.status(201).send(product);
    }catch(err){
        return res.status(500).send(err.message);
    }
});

router.get("",async (req,res)=>{
    try{
        const page= +req.query.page ||1;//default value 1
        const size = +req.query.size ||5;//default value 5


        const skip =(page -1)*size;

        const products = await Product.find().skip(skip).limit(size).lean() //.exac();
        const totalPages = Math.ceil((await Product.find().countDocuments())/size);

        return res.status(201).send({products,totalPages});
    }catch(err){
        return res.status(500).send(err.message);
    }
})



module.exports = router;