module.exports = app => {
    const router = require('express').Router();
    const cuisine = require('../../controllers/restaurant/cuisine.controller');
    router.post('/',cuisine.create);
    router.get('/:id',cuisine.get);


    app.use("/api/cuisine", router)


}