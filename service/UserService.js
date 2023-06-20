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

async function deleteUser(userId) {
    try {
        await User.deleteOne({ _id:userId });
        return { message: "Delete Successfully", status: 200 };
    } catch (error) {
        return { message: "Delete Failed", status: 500 };
    }
}

export {getAllUsers,searchUsers,getUsersByRole,deleteUser} ;
