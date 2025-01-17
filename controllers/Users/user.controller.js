const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../models/index');
const { restart } = require('nodemon');
const User = db.users;
const Category = db.category
const Restaurant = db.restaurant;
const Menu = db.menu;
const Order = db.order;
exports.createUser = async (req, res) => {
  const { name, email, contact, password } = req.body;
  try {
    // Check if the user already exists
    const existingAdmin = await User.findOne({ email: email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({
      name: name,
      email: email,
      contact: contact,
      password: hashedPassword,
    });

    // Save the user
    await newUser.save();
    res.status(200).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};


exports.login = async (req, res) => {

  const { email, password } = req.body;

  try {
    // Find the business owner by email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).send({ message: "user not found." });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('isPasswordValid', isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password." });
    }

    // const token = generateToken(businessOwner); // You need to implement generateToken function
    const token = jwt.sign({ userId: user._id }, 'Nbyws45/^/.4', { expiresIn: '10000h' });


    res.send({ token, user }); // Sending token back to the client
  } catch (error) {
    console.error(error);

    res.status(500).send({ message: error.message || "Some error occurred while logging in." });
  }

}


exports.getUser = async (req, res) => {
  const total = await User.countDocuments();
  try {
    User.find().then(data => {
      res.json({
        data,
        total: total
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });

  }
}

exports.deleteUser = async (req, res) => {
  try {
    const result = await User.deleteMany({});
    res.status(200).json({ message: "All users deleted successfully", deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getRestaurant = async (req, res) => {
  const id = req.params.id;
  try {

    const category = await Category.find({ 'restaurant': id });

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(401).send("restaurant not found !");
    }

    res.status(200).send({ category: category, restaurant: restaurant });

  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }

}

exports.getMenu = async (req, res) => {
  const id = req.params.id;
  try {

    const menu = await Menu.find({ 'category': id });

    if (!menu) {
      return res.status(401).send("menu not found !");
    }

    res.status(200).send({ menu: menu });

  } catch (error) {

    console.error(error.message);
    res.status(500).send({ message: error.message });

  }
}


exports.getCartItems = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItems = await Menu.findById(id);

    res.status(200).send({ menuItems });

  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }





}
