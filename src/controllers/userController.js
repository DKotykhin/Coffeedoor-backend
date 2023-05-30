import userService from '../services/userService.js';

class UserController {
    async loginByToken(req, res, next) {
        try {
            const user = await userService.loginByToken(req.userId);
            const { _id, email, userName, avatarURL, role } = user;

            res.json({
                _id, email, userName, avatarURL, role,
                message: `User ${userName} successfully logged via token`,
            });
        } catch (error) {
            next(error)
        }
    }

    async register(req, res, next) {
        try {
            const user = await userService.fullRegister(req.body);
            const { user: { _id, email, userName, role }, token } = user;

            res.status(201).send({
                _id, email, userName, role, token,
                message: `User ${userName} successfully created`,
            });
        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            const user = await userService.login(req.body);
            const { user: { _id, email, userName, avatarURL, role }, token, message } = user;

            res.json({
                _id, email, userName, avatarURL, role, token,
                message: message ? message : `User ${userName} successfully logged`,
            });
        } catch (error) {
            next(error)
        }
    }

    async setPassword(req, res, next) {
        try {
            const user = await userService.setPassword(req.body);

            res.json(user)
        } catch (error) {
            next(error)
        }
    }
}

export default new UserController;