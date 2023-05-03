import menuService from "../services/menuService.js";

class MenuController {
    async menuData(req, res, next) {
        try {
            const result = await menuService.getAll();

            res.json(result);

        } catch (error) {
            next(error)
        }
    }
    async menuHello(req, res, next) {
        try {
            
            res.json("Hello world!");

        } catch (error) {
            next(error)
        }
    }
}

export default new MenuController;