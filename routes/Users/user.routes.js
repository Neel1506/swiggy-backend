module.exports = app => {
    const express = require('express');
    const { authenticateToken } = require('../../Middleware/authMiddleware');
    const users = require('../../controllers/users/user.controller'); // Adjust this as needed
    var router = require("express").Router();
    
    router.post('/', users.createUser);    
    router.post('/login', users.login);    
    router.get('/',users.getUser);
    router.get('/restaurant/:id',users.getRestaurant);
    router.get('/menu/:id',users.getMenu);
    router.get('/cartItem/:id',users.getCartItems);    
    router.delete('/',users.deleteUser);
   
    
    app.use("/api/users", router)
};
