const multer = require('multer');
const db = require('../../models/index')
const Users = db.adminUsers;
const Restaurant = db.restaurant;
const jwt = require('jsonwebtoken');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/admin_users');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });


exports.imageUpload = (req, res) => {

  // console.log('req==', req);

  upload.single('profile')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    }

    console.log('Files:', req.file);
    console.log('Body:', req.body);
    res.status(200).json({ message: 'File uploaded successfully', file: req.file });
  });
}



exports.adminUserscreate = async (req, res) => {

  const { name, email, address, contact, status, profile, role, password } = req.body;

  // console.log(req.body);

  try {
    const user = await Users.findOne({ email: email });

    if (user) {
      return res.status(404).send({ message: "email id is already exist" });
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // console.log('isPasswordValid',isPasswordValid);

    // if (!isPasswordValid) {
    //     return res.status(401).send({ message: "Invalid password." });
    // }

    const userStatus = status === 1 ? "Active" : status === 0 ? "Inactive" : "Suspended"

    const newUser = new Users({
      name,
      email,
      address,
      contact,
      status: userStatus,
      profile,
      role: role,
      password,
    });

    // Save the user
    await newUser.save();
    res.status(200).json({ message: 'New User created successfully', user: newUser });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message || "Some error occurred while creating new user." });

  }

}


exports.adminLogin = async (req, res) => {

  const { email, password } = req.body;
  console.log(req.body);

  try {
    // Find the business owner by email
    const user = await Users.findOne({ email: email });

    if (!user) {
      return res.status(404).send({ message: "user not found." });
    }

    const restaurant = await Restaurant.findOne({ owner: user._id }).populate('owner');

    // Compare the provided password with the hashed password in the database
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // console.log('isPasswordValid',isPasswordValid);
    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password." });
    }

    // const token = generateToken(businessOwner); // You need to implement generateToken function
    const token = jwt.sign({ userId: user._id }, 'Nbyws45/^/.4', { expiresIn: '10000h' });

    // for restaurant admin
    if (restaurant) {
      res.send({ token, userDetail: restaurant }); // Sending token back to the client
    }
    // for super admin
    else {
      res.send({ token, userDetail: user }); // Sending token back to the client
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred while logging in." });
  }

}

exports.getUsers = async (req, res) => {
  const total = await Users.countDocuments();
  try {
    Users.find().then(data => {
      res.json({
        data,
        total: total
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });

  }
}

exports.delete = (req, res) => {
  const id = req.params.id
  try {

    Users.findByIdAndDelete(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete record with id=${id}. Maybe record was not found!`
          });
        } else {
          res.send({
            message: "Record was deleted successfully!"
          });
        }
      })
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: error })
  }
}