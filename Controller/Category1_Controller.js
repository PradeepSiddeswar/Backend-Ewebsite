const Category1 = require('../Model/Category1_Model')


exports.create = async (req, res) => {
    try {
        const { name, offers, selecteCategories, selectProduct } = req.body;
        const image = req.file ? req.protocol + '://' + req.get('host') + '/images/' + req.file.filename : '';


        const selectedProducts = Array.isArray(selectProduct) ? selectProduct : [selectProduct];

        // const category = new Category1({ name, offers, selecteCategories, image , image, selectProduct: selectedProducts})
      // Filter out any empty selectedCategories and selectedProducts
    //   const filteredSelectedCategories = selectedCategories.filter(category => !!category);
      const filteredSelectedProducts = selectedProducts.filter(product => !!product);

      const category = new Category1({
          name,
          offers,
          selecteCategories: selecteCategories,
          image,
          selectProduct: filteredSelectedProducts
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
            Image: category.Image,
            __v: category.__v
        };

        res.status(201).json(responseData);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Error creating category' });
    }
};


// exports.create = async(req, res) => {
//     console.log(req.body);
//     console.log(req.protocol + "://" + req.get("host"), "url")
//     if(!req.body) {
//         res.status(400).send("Content Connt Be Empty")
//         return
//     }
//     const category = new Category1({
//         name: req.body.name,
//         selecteCategories: req.body.selecteCategories,
//         image: req.file&&req.file.filename ? req.protocol + "://" +req.get("host")+"/images/" + req.file.filename : "", 
//         offers: req.body.offers,

//     })
//     category.save(category)
//                    .then(data => {
//                     res.status(200).send(data)
//                    })
//                    .catch(error => {
//                     res.status(500).send({
//                         message: error
//                     })
//                    })
// }



// exports.getallCategories = async (req, res) => {
//     try { 
//         const categories = await Category1.find();
//         res.status(200).json(categories);
//     } catch (error) {
//         console.error('Error retrieving categories:', error);
//         res.status(500).json({ error: 'Error retrieving categories'})
//     }
// };

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
  