import { promises } from 'fs';
import { basename } from 'path';

import StoreModel from '../models/StoreModel.js';
import ApiError from '../error/apiError.js';
import { findItemById } from '../utils/findItemById.js';

const IMAGE_API_PATH = '/image/';
const IMAGE_FOLDER = 'uploads/';

class UploadService {
    async upload(file, item) {
       
        if (!file?.image?.length) {
            throw ApiError.notFound("No file to upload")
        };

        if (item.images.length) {
            file.image.forEach(file => {
                if (item.images.some(item => basename(item) === file.filename)) {
                    throw ApiError.badRequest('This image already exist!')
                }
            })
        };

        const images = file.image.map(image => IMAGE_API_PATH + item.group + '/' + image.filename);

        const uploadedItem = await StoreModel.findOneAndUpdate(
            { _id: item._id },
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
        const fileList = item.images.map(image => (IMAGE_FOLDER + item.group + '/' + basename(image)));

        fileList.forEach(async item => {
            await promises.unlink(item, async (err) => {
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
        const fileList = item.images.map(item => basename(item));

        fileList.forEach(async image => {
            if (image === fileName) {
                await promises.unlink(IMAGE_FOLDER + item.group + '/' + image, async (err) => {
                    if (err) {
                        throw ApiError.internalError("Can't delete images")
                    }
                });
            }
        });

        const images = IMAGE_API_PATH + item.group + '/' + fileName;

        const updatedItem = await StoreModel.findOneAndUpdate(
            { _id },
            { $pull: { images } },
            { returnDocument: 'after' },
        );

        return updatedItem;
    }
}

export default new UploadService;