const Category1 = require('../Model/Category1_Model')
const mongoose = require('mongoose');
const Offer = require('../Model/Offer_Model')
// const { Category1 } = require('../Model/Category1_Model');

exports.create = async (req, res) => {
    try {
        const { name, offers, selecteCategories, selectProduct,  locationInfo } = req.body;

        const image = (req.body.image && req.body.image.trim() !== '') ? req.body.image
         : generateImagePath(name ||defaultName);

        const defaultName = 'Default shop Name';

        const selectedProducts = Array.isArray(selectProduct) ? selectProduct : [selectProduct];

        // Filter out any empty selectedProducts
        const filteredSelectedProducts = selectedProducts.filter(product => !!product);

        const category = new Category1({
            name: name || defaultName,
            image: image,
            locationInfo,
            offers,
            selecteCategories: selecteCategories,
            selectProduct: filteredSelectedProducts,
        });

        await category.save();



        // Include the image path in the response
         responseData = {
            _id: category._id,
            name: category.name,
            selecteCategories: category.selecteCategories,
            selectProduct: category.selectProduct,
            image: category.image, // Include the image path
            offers: category.offers,
            locationInfo: category.locationInfo, // Place locationInfo here
        };

        res.status(201).json(responseData);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Error creating category' });
    }
};


exports.getAllCategories = async (req, res) => {
    try {
        // Retrieve all categories
        const categories = await Category1.find();

        // Transform the data into the desired format
        const responseData = categories.map(category => ({
            _id: category._id,
            name: category.name,
            selecteCategories: category.selecteCategories,
            selectProduct: category.selectProduct,
            image: category.image, // Include the image path
            offers: category.offers,
            locationInfo: category.locationInfo, // Place locationInfo here
        }));

        res.status(200).json(responseData);
    } catch (error) {
        console.error('Error retrieving categories:', error);
        res.status(500).json({ error: 'Error retrieving categories' });
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






// exports.getallCategories = async (req, res) => {
//     try {
//         const categories = await Category1.find().populate('offers'); // Populate offers

//         // Log the populated categories for debugging
//         console.log('Populated categories:', categories);

//         res.status(200).json(categories);
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


