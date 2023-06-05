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
            const result = await menuService.createGroup(req.body);

            res.json(result);

        } catch (error) {
            next(error)
        }
    }

    async updateGroup(req, res, next) {
        try {
            const result = await menuService.updateGroup(req.body);

            res.json(result);

        } catch (error) {
            next(error)
        }
    }

    async deleteGroup(req, res, next) {
        try {
            const groupStatus = await menuService.deleteGroup(req.query._id);

            res.json({
                ...groupStatus,
                message: 'Menu group successfully deleted'
            });

        } catch (error) {
            next(error)
        }
    }

    async createItem(req, res, next) {
        try {
            const result = await menuService.createItem(req.body);

            res.json(result);

        } catch (error) {
            next(error)
        }
    }

    async updateItem(req, res, next) {
        try {
            const result = await menuService.updateItem(req.body);

            res.json(result);

        } catch (error) {
            next(error)
        }
    }

    async deleteItem(req, res, next) {
        try {
            const groupStatus = await menuService.deleteItem(req.body);

            res.json({
                ...groupStatus,
                message: 'Menu group successfully deleted'
            });

        } catch (error) {
            next(error)
        }
    }
}

export default new MenuController;