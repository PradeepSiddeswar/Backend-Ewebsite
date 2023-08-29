
const Categories = require('../Model/Categories_model');
const Hotel = require('../Model/Hotel_model');


exports.create = async (req, res) => {
  try {
    const { categoryName, subcategoryName, hotels} = req.body;

    const category = Categories({ name: categoryName })
    await category.save();

    const subcategoryHotels = hotels.map(hotel => ({
      ...hotel,
      category: category._id,
      subcategory: subcategoryName
  
    }));
   const Hotels = await Hotel.insertMany(subcategoryHotels)

    res.status(201).json({
            category: category,
          subcategory: subcategoryName,
        hotels: Hotels
      });
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({error: 'Error category, subcategory'})
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categoriesWithHotels = await Categories.aggregate([
      {
        $lookup: {
          from: 'hotels', // The name of the hotels collection
          localField: '_id',
          foreignField: 'category',
          as: 'hotels'
        }
      },
      {
        $project: {
          'category._id': 1,
          'category.name': 1,
          'category.__v': 1,
          subcategory: 1,
          hotels: {
            _id: 1,
            category: 1,
            subcategory: 1,
            hotelName: 1,
            distance: 1,
            image: 1,
            isVeg: 1,
            isNonVeg: 1,
            __v: 1
          }
        }
      }
    ]);

    res.json(categoriesWithHotels);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
};

  
// Delete users



exports.update = async (req, res) => {
  if (!req.body) {
      res.status(400).send("User Adrres not Found");
      return;
  }
  const id = req.params.id
  try {
      const updateData = await Hotel.findByIdAndUpdate(id, req.body, { new: true});
      
      
      if(!updateData) {
          res.status(400).send(`Connot firnd user Adderss with id ${id}`);
      } else {
          res.send(updateData);
      }
  } catch (error) {
      res.status(500).send(error);
  }
};

// Delete user
exports.delete = async (req, res) => {
  const categoryId = req.params.id;

  try {
    // Find the category and its associated hotels
    const category = await Categories.findById(categoryId);
    if (!category) {
      return res.status(400).send(`Category not Found with ID: ${categoryId}`);
    }

    // Delete the associated hotels
    await Hotel.deleteMany({ category: categoryId });

    // Delete the category
    await Categories.findByIdAndDelete(categoryId);

    res.send("Category and associated hotels deleted successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};
