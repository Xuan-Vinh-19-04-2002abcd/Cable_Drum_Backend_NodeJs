import jwt from 'jsonwebtoken';
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();

async function login(email, password) {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return { error: 'User does not exist', statusCode: 404 };
        }

        if (user.password !== password) {
            return { error: 'Invalid Password', statusCode: 401 };
        }

        const token = jwt.sign({ userId: user._id }, `${process.env.Secret_key}`, { expiresIn: '10day' });
        return { user, token, statusCode: 200 };
    } catch (error) {
        return { error: `Login Fail: ${error.message}`, statusCode: 500 };
    }
}

export default login;
