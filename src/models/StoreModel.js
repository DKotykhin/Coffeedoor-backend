import mongoose from "mongoose";

const { Schema, model } = mongoose;

const storeSchema = new Schema({
    group: String,
    title: {
        ua: {
            type: String,
            required: true,
        },
        ru: {
            type: String,
            required: true,
        },
        en: {
            type: String,
            required: true,
        },
    },
    itemName: {
        ua: {
            type: String,
            required: true,
        },
        ru: {
            type: String,
            required: true,
        },
        en: {
            type: String,
            required: true,
        },
    },
    description: {
        ua: String,
        ru: String,
        en: String,
    },
    detailText: {
        ua: String,
        ru: String,
        en: String,
    },
    images: [String],
    tm: String,
    country: String,
    sort: String,
    price: {
        type: Number,
        required: true,
    },
    weight: Number,
    order: {
        type: Boolean,
        default: false
    },
    hide: {
        type: Boolean,
        default: false,
    },
    position: Number
},
    {
        timestamps: true,
        versionKey: false,
        collection: 'Store',
    }
);

export default model('Store', storeSchema);