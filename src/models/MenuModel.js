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
    subtitle: {
        ua: String,
        ru: String,
        en: String,
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
            type: Number,
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
    position: {
        type: Number,
        default: 0,
    }
},
    {
        timestamps: true,
        versionKey: false,
        collection: 'Menu',
    }
);

export default model('Menu', menuSchema);