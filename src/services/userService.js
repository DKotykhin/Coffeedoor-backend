import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from "../models/UserModel.js";
import ApiError from '../error/apiError.js';

const generateToken = (_id) => {
    return jwt.sign(
        { _id },
        process.env.SECRET_KEY,
        { expiresIn: "2d" }
    )
};
const createPasswordHash = async (password) => {
    const salt = await bcrypt.genSalt(5);
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
};

class UserService {

    async rawRegister(data) {
        const { phone, userName, address } = data;
        const user = await UserModel.findOne({ phone });
        if (user) {
            return user;
        } else {
            const user = await UserModel.create({
                userName,
                phone,
                address,
            });
            if (!user) {
                throw ApiError.internalError('Server error! Try again')
            }
            return user;
        }
    }

    async fullRegister(data) {
        const { phone, userName, address, email } = data;
        if (email) {
            const candidat = await UserModel.findOne({ email });
            if (candidat) {
                throw ApiError.badRequest(`User ${email} already exist. Please login`)
            }
        };
        if (phone) {
            const candidat = await UserModel.findOne({ phone });
            if (candidat) {
                throw ApiError.badRequest(`User with ${phone} phone already exist. Please login`)
            }
        };

        const passwordHash = await createPasswordHash(password);
        const user = await UserModel.create({
            userName,
            phone,
            address,
            email,
            passwordHash,
        });
        if (!user) {
            throw ApiError.internalError('Server error! Try again')
        };
        const token = generateToken(user._id);

        return { user, token };
    }

    async login(data) {
        const { phone, email, password } = data;
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw ApiError.notFound("Can't find user")
        }
        const isValidPass = bcrypt.compare(password, user.passwordHash)
        if (!isValidPass) {
            throw ApiError.badRequest('Incorrect login or password')
        }
        const token = generateToken(user._id);

        return { user, token };
    }
}

export default new UserService;