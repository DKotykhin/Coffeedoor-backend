import axios from 'axios';

import OrderModel from '../models/OrderModel.js';
import UserModel from '../models/UserModel.js';
import ApiError from '../error/apiError.js';
import userService from './userService.js';

class OrderService {
    async writeOrderData(data) {
        const { userName, phone, deliveryWay, address, comment } = data;

        const TOKEN = process.env.TELEGRAM_TOKEN;
        const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
        if (!TOKEN) {
            throw new ApiError.notFound("Define TOKEN environmental variable");
        }
        if (!CHAT_ID) {
            throw new ApiError.notFound("Define CHAT_ID environmental variable");
        }

        const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
        let message = `<b>--- Заявка з сайту ---</b>\n`;
        let orderQuantity = 0;
        let orderSum = 0;

        message += `<b>Відправник: </b>${userName}\n`;
        message += `<b>Телефон: </b>${phone}\n`;
        message += `<b>Спосіб доставки: </b>${deliveryWay}\n`;
        message += `<b>Адреса: </b>${address ? address : ""}\n`;
        message += `<b>Коментар: </b>${comment ? comment : ""}\n`;
        message += `<b>Замовлення: </b>\n`;

        data.basketData.forEach(item => {
            message += `${item.itemTitle} ${item.itemName}, ${item.weight ? `${item.weight}г,` : ""
                } ${item.quantity} x ${item.price} грн\n`;
            orderQuantity += item.quantity;
            orderSum += +item.price * item.quantity;
        });
        message += `<b>Загалом позицій: </b>${orderQuantity}\n`;
        message += `<b>Всього на сумму: </b>${orderSum} грн`;

        const averageSum = Math.round(orderSum / orderQuantity);

        await axios.post(URL, {
            chat_id: CHAT_ID,
            parse_mode: "html",
            text: message,
        });

        const user = await userService.rawRegister({ phone, userName, address });

        const doc = new OrderModel({ ...data, orderQuantity, orderSum, averageSum, userId: user._id });
        const newCustomOrder = await doc.save();

        return {
            newCustomOrder,
            message: "The custom order was created"
        };
    }

    async findOrdersByUser(id) {
        const orders = await OrderModel.find({ client: id }).sort({ createdAt: -1 });

        return orders;
    }
}

export default new OrderService;