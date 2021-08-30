import UserModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const register = async (req, res) => {
    try {
        let hash;
        if (req.body.hasOwnProperty("password")) {
            const salt = await bcrypt.genSalt(10);
            hash = await bcrypt.hash(req.body.password, salt)
        }
        req.body.password = hash;
        req.body.counter = 0;
        const user = new UserModel(req.body);
        await user.save();
        return res.status(201).send(user);
    } catch (err) {
        return res.status(404).json({
            error: JSON.stringify(err)
        });
    }
}

const signIn = async (req, res) => {
    try {
        const user = await UserModel.findOne({username: req.body.username});
        // Check if user exists
        if (!user) return res.status(400).send(`User does not exist: ${req.body.username}`);
        // Check if password is correct 
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send("Invalid password");
        }
        //user exists & password is correct - return jsonwebtoken in response header
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET_KEY);
        res.cookie('jsonwebtoken', token, {
            httpOnly: true,
            maxAge: Date.now() + 9999
        });
        return res.status(200).send(token);
    } catch (err) {
        return res.status(404).json({
            error: JSON.stringify(err)
        });
    }   
}

const protectedRouteExample = async (req, res) => {
    if(!req.cookies.jsonwebtoken) {
        return res.status(401).send("Cookie is not present, user is unauthorized");
    }
    let user;
    try {
        user = await UserModel.findById(req.user._id);
    } catch (err) {
        return res.status(401).send({
            "message": `An error occurred: ${err}`
        });
    }

    return res.status(200).send(user);
}

const signOut = async (req, res) => {
    return res.clearCookie("jsonwebtoken").status(200).json({message: "Successfully signed out."});
}


export default { register, signIn, protectedRouteExample, signOut };