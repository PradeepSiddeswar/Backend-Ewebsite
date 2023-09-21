const express = require('express');
const Item = require('../Model/Items_Model'); // Import the Item model

// POST route to add a new item purchase
exports.create = async (req, res) => {
  try {
    const { itemName, quantity, price } = req.body;

    // Create a new item instance
    const newItem = new Item({ itemName, quantity, price });

    // Save the item to the database
    await newItem.save();

    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// GET route to retrieve the total number of items purchased
exports.get = async (req, res) => {
    try {
      const totalItemsPurchased = await Item.aggregate([
        {
          $group: {
            _id: null,
            totalItemsPurchased: { $sum: '$quantity' },
            items: {
              $push: {
                _id: '$_id',
                itemName: '$itemName',
                quantity: '$quantity',
              },
            },
          },
        },
      ]);
  
      if (totalItemsPurchased.length === 0) {
        return res.status(404).json({ error: 'No items purchased yet' });
      }
  
      res.status(200).json(totalItemsPurchased[0]);
    } catch (error) {
      console.error('Error getting total items purchased:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
// GET route to retrieve the total number of items returned
exports.getItemReturned = async (req, res) => {
    try {
      const totalItemsReturned = await Item.aggregate([
        {
          $group: {
            _id: null,
            totalItemsReturned: { $sum: '$returnedQuantity' }, // Change this field to match your model
            items: {
              $push: {
                _id: '$_id',
                itemName: '$itemName',
                returnedQuantity: '$returnedQuantity', // Change this field to match your model
              },
            },
          },
        },
      ]);
  
      if (totalItemsReturned.length === 0) {
        return res.status(404).json({ error: 'No items returned yet' });
      }
  
      res.status(200).json(totalItemsReturned[0]);
    } catch (error) {
      console.error('Error getting total items returned:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };



    // update id 
exports.update = async (req, res) => {
    if (!req.body) {
        res.status(400).send("User Address not found")
    }
    const id = req.params.id
    Item.findByIdAndUpdate(id, req.body, { new: true })
        .then(data => {
            if (!data) {
                res.status(400).send(`Can not found user Address with ${id}`)
            } else {
                res.send(data)
            }
        })
        .catch(error => {
            res.status(500).send(error)
        })
  }
  
  // delete method
  exports.delete = (req, res) => {
    const id = req.params.id
    Item.findByIdAndDelete(id)
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
  