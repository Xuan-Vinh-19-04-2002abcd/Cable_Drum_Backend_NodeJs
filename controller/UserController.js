import {searchUsers, getUsersByRole, getAllUsers, deleteUser} from "../service/UserService.js";
import sendEmaill from "../service/EmailService.js";
import {response} from "express";

async function getUsers(req, res) {
    const { text } = req.body;

    try {
        const users = await searchUsers(text);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function getUsersByRoleController(req, res) {
    try {
        const { role } = req.body;
        const users = await getUsersByRole(role);
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function getAllUsersController(req,res) {
    try {
        const  allUsers = await getAllUsers();
        return res.status(200).json(allUsers);

    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
}
function sendEmailController(req,res) {
    const {email,quantity} = req.body;
    console.log(email,quantity);
    sendEmaill(email, quantity)
        .then(() => {
            res.json({ message: 'Email sent successfully' });
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Error sending email' });
        });

}
async function deleteUserController(req,res) {
    const {userId} = req.body;
    try {
        const response =  await deleteUser(userId)
        return res.status(response.status).json({message:response.message});

    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
}

export {getUsers,getUsersByRoleController,getAllUsersController,sendEmailController,deleteUserController};
