import storeService from "../services/storeService.js";

class StoreController {
    async getAll(req, res, next) {
        try {
            const storeData = await storeService.getAll();

            res.json(storeData);

        } catch (error) {
            next(error)
        }
    }

    async getOne(req, res, next) {
        try {
            const storeItem = await storeService.getOne(req.params.id);

            res.json(storeItem);

        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const createdItem = await storeService.create(req.body);

            res.status(201).send({
                createdItem,
                message: 'Store item successfully created'
            });
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const updatedItem = await storeService.update(req.body);

            res.json({
                updatedItem,
                message: 'Store item successfully updated'
            });
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const itemStatus = await storeService.delete(req.query._id)

            res.json({
                itemStatus,
                message: 'Store item successfully deleted'
            });
        } catch (error) {
            next(error)
        }
    }
}

export default new StoreController;