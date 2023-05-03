import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
    userName: String,
    phone: {
        type: String,
        unique: true,
    },
    address: String,
    email: {
        type: String,
        unique: true,
    },
    passwordHash: String,
    avatarURL: String,
},
    {
        timestamps: true,
        versionKey: false,
        collection: 'User',
    }
);

export default model('User', userSchema);