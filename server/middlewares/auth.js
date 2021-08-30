import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';


// middleware function requires (req, res, next) parameters 
function verifyJwt(req, res, next) {
    const token = req.cookies.jsonwebtoken;
    if (!token) {
        return res.status(401).send('Access Denied');
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({error: `Invalid token${JSON.stringify(err)}`});
    }
}

async function checkUser(req, res, next) {
    const token = req.cookies.jsonwebtoken;
    if (!token) {
        return res.redirect('/signin');
    }
    try {
        const verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        let user = await UserModel.findById(verifiedUser._id);
        next();
    } catch(err) {
        return res.redirect('/signin');
    }
}


export default { verifyJwt, checkUser };