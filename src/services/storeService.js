import StoreModel from '../models/StoreModel.js';
import ApiError from '../error/apiError.js';

class StoreService {
    async getAll() {
        const storeItems = await StoreModel.find({ hidden: false }).sort({ position: 1 });
        if (!storeItems) throw ApiError.notFound("Can't find any item");

        return storeItems;
    }

    async getOne(_id) {
        const storeItem = await StoreModel.findOne({ _id });
        if (!storeItem) throw ApiError.notFound("Can't find item");

        return storeItem;
    }

    async create(data) {
        const doc = new StoreModel(data);
        const item = await doc.save();

        return item;
    }

    async update(body) {
        const { data, id } = body;
        const updatedItem = await StoreModel.findOneAndUpdate(
            { _id: id },
            { $set: data },
            { returnDocument: 'after' },
        );
        if (!updatedItem) {
            throw ApiError.forbidden("Modified forbidden")
        }

        return updatedItem;
    }

    async delete(_id) {
        const itemStatus = await StoreModel.deleteOne({ _id });
        if (!itemStatus.deletedCount) {
            throw ApiError.forbidden("Deleted forbidden")
        }

        return itemStatus;
    }
}

export default new StoreService;