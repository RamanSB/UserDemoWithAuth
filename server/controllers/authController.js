import UserModel from "../models/userModel.js";
import bcrypt from 'bcrypt';


const register = async (req, res) => {
    try {
        console.log(`Request Body: ${JSON.stringify(req.body)}`);
        let hash;
        if (req.body.hasOwnProperty("password")) {
            const salt = await bcrypt.genSalt(10);
            hash = await bcrypt.hash(req.body.password, salt)
        }
        req.body.password = hash;
        const user = new UserModel(req.body);
        await user.save();
        return res.status(200).send(user);
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
        //user exists & password is correct
        return res.status(200).send('Logged in!');
    } catch (err) {
        return res.status(404).json({
            error: JSON.stringify(err)
        });
    }
}

export default { register, signIn }