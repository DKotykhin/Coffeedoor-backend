import fs from 'fs';

import StoreModel from '../models/StoreModel.js';
import ApiError from '../error/apiError.js';
import { findItemById } from '../utils/findItemById.js';

class UploadService {
    async upload(file, _id) {

        if (!file.image.length) {
            throw ApiError.notFound("No file to upload")
        }

        const item = await findItemById(_id);

        if (item.images.length) {
            file.image.forEach(file => {
                if (item.images.some(item => item.split('/')[2] === file.filename)) {
                    throw ApiError.badRequest('This image already exist!')
                }
            })
        };

        const images = file.image.map(item => `/storeUpload/${item.filename}`);

        const uploadedItem = await StoreModel.findOneAndUpdate(
            { _id },
            { $push: { images } },
            { returnDocument: 'after' },
        );

        if (!uploadedItem) {
            throw ApiError.notFound("Can't find item")
        }

        return uploadedItem;
    }

    async deleteAll(_id) {
        const item = await findItemById(_id);

        const fileList = item.images.map(item => ("uploads/" + item.split('/')[2]));

        fileList.forEach(item => {
            fs.unlink(item, async (err) => {
                if (err) {
                    throw ApiError.internalError("Can't delete images")
                }
            });
        });

        const updatedItem = await StoreModel.findOneAndUpdate(
            { _id },
            { images: [] },
            { returnDocument: 'after' },
        );

        return updatedItem;
    }

    async deleteOne(_id, fileName) {
        const item = await findItemById(_id);
        const fileList = item.images.map(item => item.split('/')[2]);

        fileList.forEach(item => {
            if (item === fileName) {
                fs.unlink("uploads/" + item, async (err) => {
                    if (err) {
                        throw ApiError.internalError("Can't delete images")
                    }
                });
            }
        });

        const images = "/storeUpload/" + fileName;

        const updatedItem = await StoreModel.findOneAndUpdate(
            { _id },
            { $pull: { images } },
            { returnDocument: 'after' },
        );

        return updatedItem;
    }
}

export default new UploadService;