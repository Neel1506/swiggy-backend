module.exports = app => {
    const router = require('express').Router();
    const orders = require('../../controllers/restaurant/order.controller');

    router.post('/:id',orders.create)
    router.get('/:id',orders.get)
    router.get('/:id/details',orders.details)

    app.use('/api/order',router);
}

