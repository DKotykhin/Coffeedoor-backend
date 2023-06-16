import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
    userName: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        unique: true,
    },
    address: String,
    email: String,
    role: {
        type: String,
        enum: ['customer', 'user', 'admin'],
        default: 'customer',
    },
    reset: {
        token: String,
        expire: Date,
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