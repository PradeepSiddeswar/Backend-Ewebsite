const CartTotal = require("../Model/CartTotal_Model")


exports.create = async (req, res) => {
    const products = req.body;

    let totalPrice = 0;
    let totalItems = 0;

    products.forEach((product) => {
        const { price, 'total items': totalItemsPerProduct, offer } = product;

        const discountedPrice = price * (1 - offer);
        const productTotalPrice = discountedPrice * totalItemsPerProduct;

        totalPrice += productTotalPrice;
        totalItems += totalItemsPerProduct;
    });

    const response = products.map((product) => {
        const { id, name, price, 'total items': totalItemsPerProduct, offer , image} = product;
        const discountedPrice = price * (1 - offer);
        const productTotalPrice = discountedPrice * totalItemsPerProduct;

        return {
            id,
            image, 
            name,
            price,
            'total items': totalItemsPerProduct,
            offer,
            'total price': productTotalPrice.toFixed(2), // Ensure 2 decimal places
        };
    });

    response.push({
        'total price': totalPrice.toFixed(2), // Ensure 2 decimal places
        'Total items': totalItems,
    });

    res.json(response);
};