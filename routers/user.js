import express from "express";
import User from "../models/user.js";
import authMiddleware from "../authMiddleware/authMiddleware.js";
import {
    deleteUserController,
    getAllUsersController,
    getUsers,
    getUsersByRoleController,
    sendEmailController
} from "../controller/UserController.js";
const router = express.Router();

router.use(authMiddleware);
router.post("/user",(req,res)=>{
        const user = new User({
        username:req.body.username,
        password:req.body.password,
        role:req.body.role,
        email:req.body.email
    })
        user.save().then((createdProduct=>{
            res.status(201).json(createdProduct)
        })
    ).catch((err)=>{
        res.status(500).json({
            error:err,
            success:false
        })
    })
});
router.post("/search",getUsers);
router.post("/role",getUsersByRoleController);
router.get("/",getAllUsersController);
router.post("/email",sendEmailController);
router.post("/",deleteUserController);
export default router;