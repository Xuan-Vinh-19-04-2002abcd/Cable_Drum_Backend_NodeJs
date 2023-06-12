import User from '../models/user.js';

function getAllUsers() {
    return User.find();
}

async function searchUsers(text) {
    let query = {};

    if (text) {
        query.$or = [
            { role: { $regex: text, $options: 'i' } },
            { username: { $regex: text, $options: 'i' } }
        ];
    }

    try {
        const users = await User.find(query);
        return users;
    } catch (error) {
        throw new Error(`Error Searching ${error.message}`);
    }
}
function getUsersByRole(role) {
    const query = { role };

    return User.find(query);
}
export {getAllUsers,searchUsers,getUsersByRole} ;
