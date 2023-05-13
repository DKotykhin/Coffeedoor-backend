import multer from 'multer';
import fs from 'fs';

import ApiError from '../error/apiError.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync('src/uploads')) {
            fs.mkdirSync('src/uploads');
        }
        cb(null, 'src/uploads')
    },
    filename: function (req, file, cb) {        
        cb(null, file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/webp' ||
        file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(ApiError.internalError('Wrong file format'), false)
    }
}

export const uploadImage = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1024000, files: 10, fields: 10 },
});
