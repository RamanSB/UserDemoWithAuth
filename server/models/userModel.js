import mongoose from 'mongoose';

const userModelSchema = mongoose.Schema({
    "username": {
        required: "Username is required",
        min: 5,
        max: 30,
        trim: true,
        type: String,
        unique: "Username already exists"
    },
    "email": {
        required: "Email address is required",
        trim: true,
        min: 8,
        max: 256,
        type: String,
        match: [/.+\@.+\..+/],
        unique: "Email already exists"
    },
    "password": {
        required: "Password is required",
        type: String
    },
    "created": {
        default: Date.now,
        type: Date
    }
});

const UserModel = mongoose.model("User", userModelSchema);

export default UserModel;