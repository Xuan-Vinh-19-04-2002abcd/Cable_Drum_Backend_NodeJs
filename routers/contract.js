import express from "express";
import Contract from "../models/contract.js";
const router = express.Router();
import {
    getAllContractsBySuppervendorIdController,
    getAllContractsController
} from "../controller/ContractController.js";
import authMiddleware from "../authMiddleware/authMiddleware.js";
// router.use(authMiddleware);
router.post("/contract",(req,res)=>{
    const contract = new Contract({
        suppervendorId:req.body.supplyVendorId,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        contractAmount:req.body.contractAmount
    })
    contract.save().then((createdProduct=>{
            res.status(201).json(createdProduct)
        })
    ).catch((err)=>{
        res.status(500).json({
            error:err,
            success:false
        })
    })
})
router.get("/",getAllContractsController);
router.post("/vendor",getAllContractsBySuppervendorIdController)
export default router;