const db = require('../../models/index')
const Order = db.order;



exports.create = async (req, res) => {
    try {
        const { cart, customer, orderTotal } = req.body;

        const newOrder = new Order({
            cart,
            customer,
            orderTotal,
            restaurant: req.params.id
        });

        await newOrder.save();
        res.status(201).send({ 'message': "Your order is added successfully", newOrder });

    } catch (error) {
        res.status(500).json({
            message: "Error while processing request",
            error: error.message,
        });
    }
}

exports.get = async (req, res) => {
    try {
        const { id } = req.params;
        const orders = await Order.find({ restaurant: id });
        
        if (!orders) {
            return res.status(400).json({ message: "Orders are not found!" });
        }

        return res.status(200).json(orders);

    } catch (error) {
        res.status(500).json({
            message: "Error while processing request",
            error: error.message,
        });
    }
}

exports.details = async (req, res) => {
    try {
        const { id } = req.params;
        const orders = await Order.findById(id);

        console.log('order', orders);

        if (!orders) {
            return res.status(400).json({ message: "Orders are not found!" });
        }

        return res.status(200).json(orders);

    } catch (error) {
        res.status(500).json({
            message: "Error while processing request",
            error: error.message,
        });
    }
}