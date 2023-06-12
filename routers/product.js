import express from "express";
import Product from "../models/product.js";
import authMiddleware from "../authMiddleware/authMiddleware.js";
const router = express.Router();
router.use(authMiddleware);
router.get("/",async (req,res)=>{
    const ProductList = await Product.find();
    if (!ProductList){
        res.status(500).json({success:false})
    }
    res.send(ProductList)
})
router.post("/count",(req,res)=>{
    const product = new Product({
        name:req.body.name,
        image:req.body.image,
        countInStock:req.body.countInStock
    })
    product.save().then((createdProduct=>{
            res.status(201).json(createdProduct)
        })
    ).catch((err)=>{
        res.status(500).json({
            error:err,
            succsess:false
        })
    })
})
export default router;