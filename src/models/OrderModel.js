import mongoose from "mongoose";

const { Schema, model } = mongoose;

const orderSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    deliveryWay: String,
    address: String,
    comment: String,
    orderSum: Number,
    orderQuantity: Number,
    averageSum: Number,
    basketData: [
        {
            itemTitle: String,
            itemName: String,
            weight: Number,
            quantity: Number,
            price: Number,
            itemId: {
                type: Schema.Types.ObjectId,
                ref: 'Store',
            },
        }
    ]
},
    {
        timestamps: true,
        versionKey: false,
        collection: 'Order',
    }
);

export default model('Order', orderSchema);