import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from "../models/UserModel.js";
import ApiError from '../error/apiError.js';
import { findUserById } from '../utils/findUserById.js';

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

    async loginByToken(id) {
        const user = await findUserById(id);

        return user;
    }

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
        const { phone, userName, address, email, password } = data;
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
        let user;
        if (email) {
            user = await UserModel.findOne({ email });
        }
        if (!user && phone) {
            user = await UserModel.findOne({ phone });
        }
        if (!user) {
            throw ApiError.notFound("Can't find user")
        }
        let isValidPass;
        if (user.passwordHash) {
            isValidPass = bcrypt.compare(password, user.passwordHash)
        } else return {
            user,
            message: "You don't have password yet. Please, set the new one"
        }
        if (!isValidPass) {
            throw ApiError.badRequest('Incorrect login or password')
        }
        const token = generateToken(user._id);

        return { user, token };
    }

    async setPassword(data) {
        const { phone, email, password } = data;
        let user;
        if (email) {
            user = await UserModel.findOne({ email });
        }
        if (!user && phone) {
            user = await UserModel.findOne({ phone });
        }
        if (!user) {
            throw ApiError.notFound("Can't find user")
        }
        const passwordHash = await createPasswordHash(password);
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: user._id },
            { passwordHash },
            { returnDocument: 'after' },
        );
        if (!updatedUser) {
            throw ApiError.forbidden("Modified forbidden")
        }

        return updatedUser;
    }
}

export default new UserService;