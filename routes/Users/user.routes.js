module.exports = app => {
    const express = require('express');
    const users = require('../../controllers/Users/user.controller'); // Adjust this as needed
    var router = require("express").Router();
    
    router.post('/', users.createUser);    
    router.post('/login', users.login);    
    router.get('/',users.getUser);
    router.delete('/',users.deleteUser);
    
    app.use("/api/users", router)
};
