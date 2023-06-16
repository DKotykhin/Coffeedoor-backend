import fs from 'fs';
import multer from 'multer';

import ApiError from '../error/apiError.js';
const IMAGE_FOLDER = 'uploads';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const GROUP_FOLDER = IMAGE_FOLDER + '/' + req.item.group;
        if (!fs.existsSync(IMAGE_FOLDER)) {
            fs.mkdirSync(IMAGE_FOLDER);
        }
        if (!fs.existsSync(GROUP_FOLDER)) {
            fs.mkdirSync(GROUP_FOLDER);
        }
        cb(null, GROUP_FOLDER)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const allowedTypes = ['image/jpeg', 'image/webp', 'image/png'];

const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(ApiError.invalidValue('Wrong file format'), false)
    }
}

export const uploadImage = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1024000, files: 10, fields: 10 },
});
