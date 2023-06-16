import userService from '../services/userService.js';

class UserController {
    async loginByToken(req, res, next) {
        try {
            const user = await userService.loginByToken(req.userId);
            const { passwordHash, ...rest } = user._doc;

            res.json({
                user: rest,
                message: `User ${user.userName} successfully logged via token`,
            });
        } catch (error) {
            next(error)
        }
    }

    async register(req, res, next) {
        try {
            const { user, token } = await userService.fullRegister(req.body);
            const { passwordHash, ...rest } = user._doc;

            res.status(201).send({
                user: rest,
                token,
                message: `User ${user.userName} successfully created`,
            });
        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            const { user, token, message } = await userService.login(req.body);
            const { passwordHash, ...rest } = user._doc;

            res.json({
                user: rest,
                token,
                message,
            });
        } catch (error) {
            next(error)
        }
    }

    async setPassword(req, res, next) {
        try {
            const { user, message } = await userService.setPassword(req.body);
            const { passwordHash, ...rest } = user._doc;

            res.json({
                user: rest,
                message,
            })
        } catch (error) {
            next(error)
        }
    }

    async resetPassword(req, res, next) {
        try {
            const status = await userService.resetPassword(req.body.email);

            res.json(status);
        } catch (error) {
            next(error)
        }
    }

    async setNewPassword(req, res, next) {
        try {
            const status = await userService.setNewPassword(req.body);

            res.json(status);
        } catch (error) {
            next(error)
        }
    }

    async confirmPassword(req, res, next) {
        try {
            const status = await userService.confirmPassword(req.body.password, req.userId);

            res.json(status);

        } catch (error) {
            next(error)
        }
    }

    async updatePassword(req, res, next) {
        try {
            const status = await userService.updatePassword(req.body.password, req.userId);

            res.json(status);

        } catch (error) {
            next(error)
        }
    }

    async updateProfile(req, res, next) {
        try {
            const { user, message } = await userService.updateProfile(req.body, req.userId);

            const { passwordHash, ...rest } = user._doc;

            res.json({
                user: rest,
                message,
            })

        } catch (error) {
            next(error)
        }
    }
}

export default new UserController;