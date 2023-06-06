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
            const createdGroup = await menuService.createGroup(req.body);

            res.json({
                createdGroup,
                message: 'Menu group successfully created'
            });

        } catch (error) {
            next(error)
        }
    }

    async updateGroup(req, res, next) {
        try {
            const updatedGroup = await menuService.updateGroup(req.body);

            res.json({
                updatedGroup,
                message: 'Menu group successfully updated'
            });

        } catch (error) {
            next(error)
        }
    }

    async deleteGroup(req, res, next) {
        try {
            const groupStatus = await menuService.deleteGroup(req.query._id);

            res.json({
                groupStatus,
                message: 'Menu group successfully deleted'
            });

        } catch (error) {
            next(error)
        }
    }

    async createItem(req, res, next) {
        try {
            const createdItem = await menuService.createItem(req.body);

            res.json({
                createdItem,
                message: 'Menu item successfully created'
            });

        } catch (error) {
            next(error)
        }
    }

    async updateItem(req, res, next) {
        try {
            const updatedItem = await menuService.updateItem(req.body);

            res.json({
                updatedItem,
                message: 'Menu item successfully updated'
            });

        } catch (error) {
            next(error)
        }
    }

    async deleteItem(req, res, next) {
        try {
            const itemStatus = await menuService.deleteItem(req.body);

            res.json({
                itemStatus,
                message: 'Menu item successfully deleted'
            });

        } catch (error) {
            next(error)
        }
    }
}

export default new MenuController;