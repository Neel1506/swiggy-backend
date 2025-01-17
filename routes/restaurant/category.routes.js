module.exports = app => {

    const router = require('express').Router();
    const category = require('../../controllers/restaurant/category.controller');

    router.post('/',category.create);
    router.get('/by-restaurant/:id',category.restaurantCategory);
    router.get('/:id',category.get);
    router.put('/:id',category.edit);
    router.delete('/:id',category.delete);

    app.use('/api/category',router);
}