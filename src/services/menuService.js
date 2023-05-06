import MenuModel from '../models/MenuModel.js';
import ApiError from '../error/apiError.js';

class MenuService {
    async getAll() {
        const menuItems = await MenuModel.find({ hidden: false }).sort({ position: 1 });
        if (!menuItems) throw ApiError.notFound("Can't find any item");

        return menuItems;
    }
}

export default new MenuService;