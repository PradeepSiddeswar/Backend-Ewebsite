const Category1 = require('../Model/Category1_Model')


exports.create = async (req, res) => {
    try {
        const { name, offers, selecteCategories, selectProduct, locationInfo } = req.body;

        const image = req.body.image || generateImagePath(name || 'Default shop Name');

        const selectedProducts = Array.isArray(selectProduct) ? selectProduct : [selectProduct];

        const category = new Category1({
            name: name || 'Default shop Name',
            image: image,
            locationInfo: locationInfo,
            offers: offers.map(offer => ({
                enterPrice: offer.enterPrice,
                enterOffer: offer.enterOffer || '0',
                tagline: offer.tagline,
                image: offer.image,
            })),
            selecteCategories: selecteCategories,
            selectProduct: selectedProducts,
        });

        await category.save();

        const responseData = {
            name: category.name,
            image: category.image,
            locationInfo: category.locationInfo,
            offers: category.offers,
            selecteCategories: category.selecteCategories,
            selectProduct: category.selectProduct,
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

        // Query the database to retrieve categories
        const categories = await Category1.find(filter);

        // Define default values
        const defaultName = 'Default Category Name';
        const defaultImage = 'default.jpg';


        // Map the retrieved data and apply default values where needed
        const responseData = categories.map(category => ({
            _id: category._id,
            name: category.name || defaultName,
            image: category.image || generateImagePath(category.name || defaultName), // Generate image path based on category name
            locationInfo: category.locationInfo,
            offers: category.offers,
            image: category.image,
            selecteCategories: category.selecteCategories,
            selectProduct: category.selectProduct,
        }));

        res.status(200).json(responseData);
    } catch (error) {
        console.error('Error retrieving categories by selectProduct:', error);
        res.status(500).json({ error: 'Error retrieving categories by selectProduct' });
    }
};



// exports.create = async (req, res) => {
//     try {
//         const { name, offers, selecteCategories, selectProduct, locationInfo } = req.body;

//         // Debugging: Log the received data
//         console.log('Received Data:');
//         console.log('Name:', name);
//         console.log('Selecte Categories:', selecteCategories);
//         console.log('Select Product:', selectProduct);

//         // Validate required fields
//         if (!name || !selecteCategories || !selectProduct) {
//             return res.status(400).json({ error: 'Name, selecteCategories, and selectProduct are required fields' });
//         }

//         // Handle file uploads only if files are present
//         let image1 = "";
//         let profileImage2 = undefined;
//         let profileImage3 = undefined;

//         if (req.files) {
//             image1 = req.files['profileImage1'][0]
//                 ? req.protocol + "://" + req.get("host") + "/images/" + req.files['profileImage1'][0].filename
//                 : "";

//             profileImage2 = req.files['profileImage2'][0]
//                 ? req.protocol + "://" + req.get("host") + "/images/" + req.files['profileImage2'][0].filename
//                 : undefined;

//             profileImage3 = req.files['profileImage3'][0]
//                 ? req.protocol + "://" + req.get("host") + "/images/" + req.files['profileImage3'][0].filename
//                 : undefined;
//         }

//         const savedOffers = await Promise.all(offers.map(offer => new Offer(offer).save()));

//         // Create a new category
//         const category = new Category1({
//             name,
//             image1,
//             locationInfo,
//             selecteCategories,
//             selectProduct,
//             offers: savedOffers.map(offer => offer._id), // Use the offer IDs
//         });

//         await category.save(); // Save the category

//         // Construct the response data
//         const responseData = {
//             _id: category._id,
//             name: category.name,
//             locationInfo: category.locationInfo,
//             image1: category.image1,
//             selecteCategories: category.selecteCategories,
//             selectProduct: category.selectProduct,
//             offers: offers.map(offer => ({
//                 enterPrice: offer.enterPrice,
//                 enterOffer: offer.enterOffer,
//                 tagline: offer.tagline,
//                 profileImage2, // Add profileImage2 directly
//                 profileImage3, // Add profileImage3 directly
//             })),
//         };

//         res.status(201).json(responseData); // Respond with success status
//     } catch (error) {
//         console.error('Error creating category:', error);
//         res.status(500).json({ error: 'Error creating category', message: error.message }); // Respond with error status and message
//     }
// };


// exports.getallCategories = async (req, res) => {
//     try {
//         const categories = await Category1.find().populate({
//             path: 'offers',
//             select: 'enterPrice enterOffer tagline profileImage2 profileImage3',
//         });

//         // Transform the data into the desired format
//         const responseData = categories.map(category => ({
//             _id: category._id,
//             name: category.name,
//             locationInfo: category.locationInfo,
//             image1: category.image1,
//             selecteCategories: category.selecteCategories,
//             selectProduct: category.selectProduct,
//             offers: category.offers.map(offer => ({
//                 _id: offer._id,
//                 enterPrice: offer.enterPrice,
//                 enterOffer: offer.enterOffer,
//                 tagline: offer.tagline,
//                 profileImage2: offer.profileImage2 || '',
//                 profileImage3: offer.profileImage3 || '',
//             })),
//         }));

//         // Debugging: Add console.log statements
//         console.log('Response Data:', responseData);

//         res.status(200).json(responseData);
//     } catch (error) {
//         console.error('Error retrieving categories:', error);
//         res.status(500).json({ error: 'Error retrieving categories' });
//     }
// };




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


