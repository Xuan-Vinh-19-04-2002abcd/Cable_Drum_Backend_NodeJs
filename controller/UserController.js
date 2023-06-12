import {searchUsers, getUsersByRole, getAllUsers} from "../service/UserService.js";
import sendEmaill from "../service/EmailService.js";

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


export {getUsers,getUsersByRoleController,getAllUsersController,sendEmailController};
