import express from "express";

import storeController from "../controllers/storeController.js";
import uploadController from "../controllers/uploadController.js";
import orderController from "../controllers/orderController.js";
import { uploadImage } from "../utils/multerUpload.js";
import menuController from "../controllers/menuController.js";

const router = express.Router();

router.get('/store', storeController.getAll);
router.get('/store/:id', storeController.getOne);
router.post('/store', storeController.create);
router.patch('/store', storeController.update);
router.delete('/store', storeController.delete);

router.get('/menu', menuController.menuData);

router.post('/storeUpload', uploadImage.fields([
    { name: 'image', maxCount: 10 },
]), uploadController.upload);
router.delete('/storeUpload', uploadController.deleteAll);
router.delete('/storeUpload/:fileName', uploadController.deleteOne);

router.post('/send', orderController.orderData);
router.get('/admin/:id', orderController.userOrders);

export default router;