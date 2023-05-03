import uploadService from "../services/uploadService.js";

class UploadController {
    async upload(req, res, next) {
        try {
            const item = await uploadService.upload(req.files, req.body.itemId);
            const { card_img, list_img } = item;
            res.json({
                card_img,
                list_img,
                message: "Images successfully upload.",
            });
        } catch (error) {
            next(error)
        }
    }

    async deleteAll(req, res, next) {
        try {
            const updatedItem = await uploadService.deleteAll(req.body.itemId);
            const { card_img, list_img } = updatedItem;
            res.json({
                card_img,
                list_img,
                message: "Images successfully deleted.",
            });
        } catch (error) {
            next(error)
        }
    }

    async deleteOne(req, res, next) {
        try {
            const updatedItem = await uploadService.deleteOne(req.body.itemId, req.params.fileName);
            const { card_img, list_img } = updatedItem;
            res.json({
                card_img,
                list_img,
                message: "Image successfully deleted.",
            });
        } catch (error) {
            next(error)
        }
    }
}

export default new UploadController;