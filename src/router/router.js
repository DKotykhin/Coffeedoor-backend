import express from "express";

import { storeController, uploadController, orderController, menuController, userController } from "../controllers/_index.js";
import { checkAuth, addItem, checkAdminAuth } from "../middlewares/_index.js";
import { userValidation, validationErrors } from "../validations/_index.js";
import { uploadImage } from "../utils/multerConfig.js";

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

router.post('/auth/register', userValidation.register, validationErrors, userController.register);
router.post('/auth/login', userValidation.login, validationErrors, userController.login);
router.patch('/auth/password', userValidation.password, validationErrors, userController.setPassword);
router.post('/auth/reset', userController.resetPassword);
router.patch('/auth/reset', userController.setNewPassword);

router.get('/user/me', checkAuth, userController.loginByToken);
router.get('/user/orders', checkAuth, orderController.userOrders);
router.post('/user/password', checkAuth, userValidation.password, validationErrors, userController.confirmPassword);
router.patch('/user/password', checkAuth, userValidation.password, validationErrors, userController.updatePassword);
router.patch('/user/me', checkAuth, userValidation.profile, validationErrors, userController.updateProfile);
router.delete('/user/me', checkAuth, userController.deleteUser);

export default router;