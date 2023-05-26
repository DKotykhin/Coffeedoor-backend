import uploadService from "../services/uploadService.js";

class UploadController {
    async upload(req, res, next) {
        try {
            const item = await uploadService.upload(req.files, req.item);
            const { images, _id, itemName } = item;
            res.json({
                _id,
                images,
                message: `Images successfully upload to ${itemName.en} item.`,
            });
        } catch (error) {
            next(error)
        }
    }

    async deleteAll(req, res, next) {
        try {
            const updatedItem = await uploadService.deleteAll(req.body.itemId);
            const { images, _id } = updatedItem;
            res.json({
                _id,
                images,
                message: "All images successfully deleted.",
            });
        } catch (error) {
            next(error)
        }
    }

    async deleteOne(req, res, next) {
        try {
            const updatedItem = await uploadService.deleteOne(req.body.itemId, req.params.fileName);
            const { images, _id } = updatedItem;
            res.json({
                _id,
                images,
                message: "Image successfully deleted.",
            });
        } catch (error) {
            next(error)
        }
    }
}

export default new UploadController;