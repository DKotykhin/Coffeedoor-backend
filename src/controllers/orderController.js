import orderService from "../services/orderService.js";

class OrderController {    

    async orderData(req, res, next) {
        try {
            const result = await orderService.writeOrderData(req.body);

            res.json(result);

        } catch (error) {
            next(error)
        }
    }

    async userOrders(req, res, next) {
        try {
            const result = await orderService.findOrdersByUser(req.params.id);

            res.json(result);

        } catch (error) {
            next(error)
        }
    }
}

export default new OrderController;