const multer = require('multer');
const db = require('../../models/index');
const Restaurant = db.restaurant;
const Owners = db.adminUsers;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/restaurant');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    },
});

const upload = multer({ storage: storage });

exports.imageUpload = (req, res) => {
    upload.single('profile')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: err.message });
        } else if (err) {
            return res.status(500).json({ error: err.message });
        }
        console.log('Files:', req.file);
        console.log('Body:', req.body);
        res.status(200).json({ message: 'File uploaded successfully', file: req.file });
    })
}


exports.create = async (req, res) => {
    const { restaurant_name, cuisine_type, address, open_time, close_time, status, profile, owner, restaurant_offer } = req.body;
    // console.log(req.body);
    try {
        restaurantStatus = status === 1 ? "Active" : status === 0 ? "Inactive" : "Suspended";
        const newRestaurant = new Restaurant({
            restaurant_name,
            cuisine_type,
            address,
            restaurant_offer,
            open_time,
            close_time,
            status: restaurantStatus,
            profile,
            owner
        });

        await newRestaurant.save();
        res.status(200).json({ message: "Restaurant added successfully", restaurant: newRestaurant });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message || "Some error occurred while logging in." });
    }
}

exports.edit = async (req, res) => {
    try {
        const { id } = req.params; // Extract the restaurant ID from the URL
        const updates = req.body; // Data sent from the frontend

        // Find the restaurant by ID and update it
        const updatedRestaurant = await Restaurant.findOneAndUpdate(
            { _id: id },        // Query to find the document
            { $set: updates },  // Fields to update
            { new: true }       // Return the updated document
        );

        if (!updatedRestaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        res.status(200).json({
            message: "Restaurant updated successfully",
            data: updatedRestaurant,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error while updating restaurant",
            error: error.message,
        });
    }
};
exports.getOwners = (req, res) => {
    Owners.where('role', "RestaurantAdmin").find().then(data => {
        res.json(data);
    })
}

exports.getRestaurants = (req, res) => {
    Restaurant.find()
        .populate('owner') // This should match the field name in the schema
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
};


exports.getRestaurant = (req, res) => {
    const id = req.params.id
    Restaurant.findById(id)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}


exports.delete = (req, res) => {
    const id = req.params.id
    try {

        Restaurant.findByIdAndDelete(id, { useFindAndModify: false })
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