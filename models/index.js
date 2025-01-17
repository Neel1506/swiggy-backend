const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.restaurant = require('./restaurant.model')(mongoose);
db.cuisine = require('./cuisine.model')(mongoose);
db.category = require('./category.model')(mongoose);
db.menu = require('./menu.model')(mongoose);
db.adminUsers = require('./admin-user.model')(mongoose);
db.users = require('./user.model')(mongoose);
db.order = require('./order.model')(mongoose);
module.exports = db;
