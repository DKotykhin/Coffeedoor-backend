import mongoose from "mongoose";

const { Schema, model } = mongoose;

const menuSchema = new Schema({
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
    items: [{
        name: {
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
        price: {
            type: String,
            required: true,
        },
        hidden: {
            type: Boolean,
            default: false,
        },
    }],
    hidden: {
        type: Boolean,
        default: false,
    },
    position: Number
},
    {
        timestamps: true,
        versionKey: false,
        collection: 'Menu',
    }
);

export default model('Menu', menuSchema);