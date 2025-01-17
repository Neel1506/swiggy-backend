module.exports = app => {
    const express = require('express');
    const users = require('../../controllers/super admin/admin_users.controller');
    var router = require("express").Router();
    
    router.post('/image-upload', users.imageUpload);    
    router.post('/',users.adminUserscreate);
    router.get('/',users.getUsers);
    router.delete('/:id',users.delete);
    router.post('/login',users.adminLogin);
    app.use("/api/admin_users", router)
};
