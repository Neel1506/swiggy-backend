module.exports = app => {
    const restaurant = require('../../controllers/restaurant/restaurant.controller');
    var router = require("express").Router();
    
    router.post('/image-upload', restaurant.imageUpload);  
    router.post('/',restaurant.create);
    router.put('/:id',restaurant.edit);
    router.get('/get-owners',restaurant.getOwners);
    router.get('/get-restaurants',restaurant.getRestaurants);
    router.get('/get-restaurant/:id',restaurant.getRestaurant);

    router.delete('/:id',restaurant.delete);

    app.use("/api/restaurant", router)
};