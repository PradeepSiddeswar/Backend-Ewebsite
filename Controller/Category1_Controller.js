const Category1 = require('../Model/Category1_Model')
const mongoose = require('mongoose');


exports.create = async (req, res) => {
    try {
        const { name, offers, selecteCategories, selectProduct } = req.body;
        
        const image = (req.body.image && req.body.image.trim() !== '') ? req.body.image : 'default.jpg';

       const defaultName = 'Default shop Name';
    //    const defaultImage = 'default.jpg';

        const selectedProducts = Array.isArray(selectProduct) ? selectProduct : [selectProduct];

        // const category = new Category1({ name, offers, selecteCategories, image , image, selectProduct: selectedProducts})
      // Filter out any empty selectedCategories and selectedProducts
    //   const filteredSelectedCategories = selectedCategories.filter(category => !!category);
      const filteredSelectedProducts = selectedProducts.filter(product => !!product);

      const category = new Category1({
          name: name || defaultName,
          image : image,
          offers,
          selecteCategories: selecteCategories,
          selectProduct: filteredSelectedProducts,
      });


        await category.save();

        // Include the image path in the response
        const responseData = {
            _id: category._id,
            name: category.name,
            selecteCategories: category.selecteCategories,
            selectProduct: category.selectProduct,
            image: category.image, // Include the image path
            offers: category.offers,
        };

        res.status(201).json(responseData);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Error creating category' });
    }
};

 

exports.getallCategories = async (req, res) => {
    try {
        // Get the value of the 'selectProduct' query parameter from the request
        const selectProduct = req.query.selectProduct;

        // Define your filter criteria based on the 'selectProduct' value
        let filter = {};

        if (selectProduct && selectProduct.length > 0) {
            // If 'selectProduct' is not empty, filter based on it
            filter = {
                selectProduct: { $in: selectProduct } // Use $in to filter categories that match any value in the 'selectProduct' array
            };
        }

        const categories = await Category1.find(filter);

        res.status(200).json(categories);
    } catch (error) {
        console.error('Error retrieving categories by selectProduct:', error);
        res.status(500).json({ error: 'Error retrieving categories by selectProduct' });
    }
};


exports.delete = (req, res) => {
    const id = req.params.id
    Category1.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(400).send(`category not found with ${id}`)
            } else {
                res.send("category deleted successfully")
            }
        })
        .catch(error => {
            res.status(500).send(error)
        })
}


exports.getItemById = async (req, res) => {
    try {
      const itemId = req.params.id;
  
      // Validate if itemId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(itemId)) {
        console.error('Invalid Item ID');
        return res.status(400).json({ message: "Invalid Item ID" });
      }
  
      const item = await Category1.findById(itemId);
  
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
  
      res.json(item);
    } catch (error) {
      console.error("Error fetching item:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  