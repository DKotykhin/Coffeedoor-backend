import MenuModel from '../models/MenuModel.js';
import ApiError from '../error/apiError.js';

class MenuService {
    async getAll() {
        const menuItems = await MenuModel.find().sort({ position: 1 });
        if (!menuItems) throw ApiError.notFound("Can't find any item");

        return menuItems;
    }

    async createGroup(data) {
        const doc = new MenuModel(data);
        const item = await doc.save();

        return item;
    }

    async updateGroup(body) {
        const { data, groupId } = body;
        const updatedItem = await MenuModel.findOneAndUpdate(
            { _id: groupId },
            { $set: data },
            { returnDocument: 'after' },
        );
        if (!updatedItem) {
            throw ApiError.forbidden("Modified forbidden")
        }

        return updatedItem;
    }

    async deleteGroup(_id) {
        const itemStatus = await MenuModel.deleteOne({ _id });
        if (!itemStatus.deletedCount) {
            throw ApiError.forbidden("Deleted forbidden")
        }

        return itemStatus;
    }

    async createItem(body) {
        const { data, groupId } = body;
        const uploadedItem = await MenuModel.findOneAndUpdate(
            { _id: groupId },
            { $push: { items: data } },
            { returnDocument: 'after' },
        );

        if (!uploadedItem) {
            throw ApiError.notFound("Can't find item")
        }

        return uploadedItem;
    }

    async updateItem(body) {
        const { data, itemId } = body;
        // const updatedItem = await MenuModel.find({"items._id": {$in: [itemId]}})
        const updatedItem = await MenuModel.findOneAndUpdate(
            { "items._id": itemId },
            { $set: { "items.$[]": data } },
            { returnDocument: 'after' },
        );
        if (!updatedItem) {
            throw ApiError.forbidden("Modified forbidden")
        }

        return updatedItem;
    }

    async deleteItem(body) {
        const { itemId } = body;
        const updatedItem = await MenuModel.findOneAndUpdate(
            { "items._id": itemId },
            { $pull: { items: { _id: itemId } } },
            { returnDocument: 'after' },
        );
        if (!updatedItem) {
            throw ApiError.forbidden("Modified forbidden")
        }

        return updatedItem;
    }
}

export default new MenuService;