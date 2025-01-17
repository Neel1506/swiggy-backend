// // models/User.js
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   contact: {
//     type: Number,
//     required: true,
//   },
// },
//   { timestamps: true }
// );

// const User = mongoose.model('user', userSchema);

// module.exports = User;
module.exports = mongoose => {
  const schema = mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      contact: {
        type: Number,
        required: true,
      },
    },
      { timestamps: true }
    );

  return mongoose.model('user',schema);
}