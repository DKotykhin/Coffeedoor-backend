import StoreModel from '../models/StoreModel.js';
import ApiError from '../error/apiError.js';

export const findItemById = async (itemId) => {
    const item = await StoreModel.findById(itemId);
    if (!item) {
        throw ApiError.notFound("Can't find item")
    }
    return item;
}