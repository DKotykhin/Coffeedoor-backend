import express from "express";

import { storeController, uploadController, orderController, menuController, userController } from "../controllers/index.js";
import { checkAuth, addItem, checkAdminAuth, validationErrors } from "../middlewares/index.js";
import { uploadImage } from "../utils/multerUpload.js";
import validation from "../validations/validation.js";

const router = express.Router();

router.get('/store', storeController.getAll);
router.get('/store/:id', storeController.getOne);
router.post('/store', checkAuth, checkAdminAuth, storeController.create);
router.patch('/store', checkAuth, checkAdminAuth, storeController.update);
router.delete('/store', checkAuth, checkAdminAuth, storeController.delete);

router.get('/menu', menuController.getAll);
router.post('/menugroup', checkAuth, checkAdminAuth, menuController.createGroup);
router.patch('/menugroup', checkAuth, checkAdminAuth, menuController.updateGroup);
router.delete('/menugroup', checkAuth, checkAdminAuth, menuController.deleteGroup);
router.post('/menuitem', checkAuth, checkAdminAuth, menuController.createItem);
router.patch('/menuitem', checkAuth, checkAdminAuth, menuController.updateItem);
router.delete('/menuitem', checkAuth, checkAdminAuth, menuController.deleteItem);

router.post('/image/:id', addItem, uploadImage.fields([
    { name: 'image', maxCount: 10 },
]), uploadController.upload);
router.delete('/image', uploadController.deleteAll);
router.delete('/image/:fileName', uploadController.deleteOne);

router.post('/send', orderController.orderData);

router.post('/auth/register', validation.register, validationErrors, userController.register);
router.post('/auth/login', validation.login, validationErrors, userController.login);
router.patch('/auth/password', validation.password, validationErrors, userController.setPassword);

router.get('/user/me', checkAuth, userController.loginByToken);
router.get('/user/orders', checkAuth, orderController.userOrders);

export default router;