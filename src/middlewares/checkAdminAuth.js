import { findUserById } from '../utils/findUserById.js';

import ApiError from '../error/apiError.js';

const checkAdminAuth = async (req, res, next) => {

    const user = await findUserById(req.userId);
    if (user.role !== 'admin') {
        return next(ApiError.forbidden("You don't have permission"));
    }
    next()
}

export default checkAdminAuth;