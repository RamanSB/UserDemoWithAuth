import UserModel from '../models/userModel.js';

const incrementCounter = async (req, res) => {
    if (req.user) {
        let userResponse = await UserModel.findById(req.user._id);
        await UserModel.findByIdAndUpdate(req.user._id, {
            ...req.user,
            counter: userResponse.counter + 1
        });
        return res.status(200).send("Counter has been incremented");
    } else {
        return res.status(406).send("User is unidentified");
    }
}

export default { incrementCounter };

