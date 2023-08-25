const ProdectListDB = require("../Model/ProdectList_model")

exports.create= async (req, res) => {
    try {
        const {products} = req.body;
        const addedItems = [];

        for (const product of products) {
            const { name, price } = product;

            const existingItem = await ProdectListDB.findOne({ name });

            if(existingItem) {
                existingItem.quantity += 1;
                await existingItem.save();
                addedItems.push(existingItem);
            }  else {
                 const newItem = new ProdectListDB({ name, price});
                 await newItem.save();
                 addedItems.push(newItem);
            }
        }

        const items = await ProdectListDB.find();
        const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

        res.json({ message: 'Items added to cart', items: addedItems, totalPrice});
    }catch (error) {
        res.status(500).json({ error: 'Error adding items to cart'});
    }
};