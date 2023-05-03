import UserModel from "../models/UserModel.js";
import ApiError from '../error/apiError.js';

class UserService {

    async register(data) {
        const { phone, userName, address, email } = data;
        const candidat = await UserModel.findOne({ phone });
        if (candidat) {
            throw ApiError.badRequest(`User with ${phone} phone already exist`)
        }

        const user = await UserModel.create({
            userName,
            phone,
            address,
            email,
        });

        if (!user) {
            throw ApiError.internalError('Server error! Try again')
        }

        return user;
    }
}

export default new UserService;