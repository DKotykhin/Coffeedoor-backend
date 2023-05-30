import express from "express";

import { storeController, uploadController, orderController, menuController, userController } from "../controllers/index.js";
import { uploadImage } from "../utils/multerUpload.js";
import { checkAuth, addItem } from "../middlewares/index.js";


const router = express.Router();

router.get('/store', storeController.getAll);
router.get('/store/:id', storeController.getOne);
router.post('/store', storeController.create);
router.patch('/store', storeController.update);
router.delete('/store', storeController.delete);

router.get('/menu', menuController.menuData);

router.post('/image/:id', addItem, uploadImage.fields([
    { name: 'image', maxCount: 10 },
]), uploadController.upload);
router.delete('/image', uploadController.deleteAll);
router.delete('/image/:fileName', uploadController.deleteOne);

router.post('/send', orderController.orderData);

router.post('/auth/register', userController.register);
router.post('/auth/login', userController.login);
router.patch('/auth/password', userController.setPassword);

router.get('/user/me', checkAuth, userController.loginByToken);
router.get('/user/orders', checkAuth, orderController.userOrders);

export default router;