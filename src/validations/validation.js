import { body } from 'express-validator';

const phone = body('phone')
    .isMobilePhone(['uk-UA', 'pl-PL']).withMessage('Incorrect mobile phone')

const password = body('password')
    .isString().withMessage('Incorrect data format')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 chars long')
    .isLength({ max: 100 }).withMessage('Password must be maximum 100 chars long');

const userName = body('userName')
    .isString().withMessage('Incorrect name format')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 chars long')
    .isLength({ max: 100 }).withMessage('Name must be maximum 100 chars long');

const email = body('email')
    .optional()
    .isEmail().withMessage('Incorrect email format');

const address = body('address')
    .optional()
    .isString().withMessage('Incorrect address format')
    .isLength({ min: 3 }).withMessage('Address must be at least 3 chars long')
    .isLength({ max: 200 }).withMessage('Address must be maximum 200 chars long');

const avatarURL = body('avatar')
    .optional().isURL().withMessage('Incorrect URL');

class Validation {
    register = [phone, password, userName];
    login = [phone, password];
    name = [userName];
    password = [password];
    profile = [userName, email, address]
}

export default new Validation;
