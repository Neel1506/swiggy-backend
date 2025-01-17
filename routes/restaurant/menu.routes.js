module.exports = app => {
    const menu = require('../../controllers/restaurant/menu.controller');
    var router = require("express").Router();

    router.post('/image-upload', menu.imageUpload);
    router.post('/', menu.create);
    // get all menu off single restaurant 
    router.get('/by-restaurant/:id', menu.restaurantMenu);
    // get single menu by menu id 
    router.get('/:id', menu.get);
    router.put('/:id', menu.edit);

    router.delete('/:id', menu.delete);


    app.use("/api/menu", router)
};