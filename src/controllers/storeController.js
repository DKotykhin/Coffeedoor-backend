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
            const newItem = await storeService.create(req.body);

            res.status(201).send({
                ...newItem._doc,
                message: 'Item successfully created'
            });
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const updatedItem = await storeService.update(req.body.data, req.body.id);

            res.json({
                ...updatedItem._doc,
                message: 'Item successfully updated'
            });
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const itemStatus = await storeService.delete(req.body._id)

            res.json({
                itemStatus,
                message: 'Item successfully deleted'
            });
        } catch (error) {
            next(error)
        }
    }
}

export default new StoreController;