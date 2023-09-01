const Category1 = require('../Model/Category1_Model')


exports.create = async (req, res) => {
    try {
        const { name, offers, description, tagline } = req.body;
        const category = new Category1({name, offers, description, tagline});
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Error creating category'})
    }
}

exports.getallCategories = async (req, res) => {
    try { 
        const categories = await Category1.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving categories'})
    }
};
