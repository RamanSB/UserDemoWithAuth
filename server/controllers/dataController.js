import UserModel from '../models/userModel.js';

const incrementCounter = async (req, res) => {
    if (req.user) {
        console.log(`Increment Counter ha a user.`);
        let response = await UserModel.findByIdAndUpdate(req.user._id, {
            ...req.user,
            counter: 2 + 1
        });
        return res.status(200).send("Counter has been incremented");
    } else {
        return res.status(406).send("User is unidentified");
    }
}

export default { incrementCounter };

