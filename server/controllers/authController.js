import UserModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const register = async (req, res) => {
    try {
        console.log(`Request Body: ${JSON.stringify(req.body)}`);
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
        console.log(`isPasswordValid: ${isPasswordValid}`);
        if (!isPasswordValid) {
            return res.status(400).send("Invalid password");
        }
        //user exists & password is correct - return jsonwebtoken in response header
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET_KEY);
        console.log(`token: ${token}`);
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
    console.log(`[protectedRouteExample] ${JSON.stringify(req.cookies)}`);
    console.log(`[protectedRouteExample] Verified User: ${JSON.stringify(req.user)}`);
        
    if(!req.cookies.jsonwebtoken) {
        return res.status(401).send("Cookie is not present, user is unauthorized");
    }
    let user;
    console.log(`in JS a variable is: ${user} if it is not declared with a value`);
    try {
        user = await UserModel.findById(req.user._id);
        console.log(`User: ${JSON.stringify(user)}`);
    } catch (err) {
        console.log(`[protectedRouteExample] Something went wrong...`);
        return res.status(401).send({
            "message": `An error occurred: ${err}`
        });
    }

    return res.status(200).send(user);
}

const incrementCounter = async (req, res) => {
    if (req.user) {
        console.log(`Increment Counter has a user.`);
        let currentCounter = await UserModel.findById(req.user._id);
        let response = await UserModel.findByIdAndUpdate(req.user._id, {
            ...req.user,
            counter: currentCounter.counter + 1
        });
        return res.status(200).send("Counter has been incremented");
    } else {
        console.log(`user property cannot be found on req.`);
        return res.status(406).send("User is unidentified");
    }
}

export default { register, signIn, protectedRouteExample, incrementCounter };