import express from "express";
import Request from "../models/request.js";
import {
    createRequestController,
    getAllRequestsController,
    getAllRequestsContractorController, updateStatus
} from "../controller/RequestController.js";
import authMiddleware from "../authMiddleware/authMiddleware.js";
const router = express.Router();

// router.post("/request",(req,res)=>{
//     const request = new Request({
//         phannerUserId:req.body.phannerUserId,
//         supperVendorId:req.body.supperVendorId,
//         quantity:req.body.quantity,
//         projectContractorUserId:req.body.projectContractorUserId,
//         status:req.body.status,
//     })
//     request.save().then((createdProduct=>{
//             res.status(201).json(createdProduct)
//         })
//     ).catch((err)=>{
//         res.status(500).json({
//             error:err,
//             success:false
//         })
//     })
// })
router.use(authMiddleware);
router.post("/request",createRequestController);
router.post("/vendorRequest",getAllRequestsController);
router.post("/contractorRequest",getAllRequestsContractorController);
router.post("/status",updateStatus);
export default router;