import { findItemById } from '../utils/findItemById.js';

const addItem = async (req, res, next) => {
    const item = await findItemById(req.params.id);

    // console.log(req.params.id);
    // console.log(item);
    req.item = item;
    next();
}

export default addItem;