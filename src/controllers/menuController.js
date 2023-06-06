import menuService from "../services/menuService.js";

class MenuController {
    async getAll(req, res, next) {
        try {
            const result = await menuService.getAll();

            res.json(result);

        } catch (error) {
            next(error)
        }
    }

    async createGroup(req, res, next) {
        try {
            const item = await menuService.createGroup(req.body);

            res.json({
                item,
                message: 'Menu group successfully created'
            });

        } catch (error) {
            next(error)
        }
    }

    async updateGroup(req, res, next) {
        try {
            const item = await menuService.updateGroup(req.body);

            res.json({
                item,
                message: 'Menu group successfully updated'
            });

        } catch (error) {
            next(error)
        }
    }

    async deleteGroup(req, res, next) {
        try {
            const status = await menuService.deleteGroup(req.query._id);

            res.json({
                status,
                message: 'Menu group successfully deleted'
            });

        } catch (error) {
            next(error)
        }
    }

    async createItem(req, res, next) {
        try {
            const item = await menuService.createItem(req.body);

            res.json({
                item,
                message: 'Menu item successfully created'
            });

        } catch (error) {
            next(error)
        }
    }

    async updateItem(req, res, next) {
        try {
            const item = await menuService.updateItem(req.body);

            res.json({
                item,
                message: 'Menu item successfully updated'
            });

        } catch (error) {
            next(error)
        }
    }

    async deleteItem(req, res, next) {
        try {
            const status = await menuService.deleteItem(req.body);

            res.json({
                status,
                message: 'Menu item successfully deleted'
            });

        } catch (error) {
            next(error)
        }
    }
}

export default new MenuController;