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
            const result = await menuService.deleteGroup(req.query._id);

            res.json(result);

        } catch (error) {
            next(error)
        }
    }
}

export default new MenuController;