const multer = require('multer');
const db = require('../../models/index');
const Menu = db.menu;


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/menu');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    },
});

const upload = multer({ storage: storage });

exports.imageUpload = (req, res) => {
    upload.single('food_picture')(req, res, (err) => {
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
    try {
        const { food, category, description, status, food_picture, isVeg, price, restaurantId } = req.body;
        const newMenu = new Menu(
            {
                food,
                category,
                description,
                status,
                food_picture,
                restaurant: restaurantId,
                isVeg,
                price,
            }
        );

        await newMenu.save();

        res.status(201).send({ 'message': "New Menu item is added successfully" });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error   ', "error": error.message });
    }

}


exports.edit = async (req, res) => {
    try {
        const { id } = req.params; // Extract the restaurant ID from the URL
        const updates = req.body; // Data sent from the frontend



        // Find the restaurant by ID and update it
        const updatedMenu = await Menu.findOneAndUpdate(
            { _id: id },        // Query to find the document
            { $set: updates },  // Fields to update
            { new: true }       // Return the updated document
        );

        if (!updatedMenu) {
            return res.status(404).json({ message: "Menu not found" });
        }

        res.status(200).json({
            message: "Menu updated successfully",
            data: updatedMenu,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating Menu",
            error: error.message,
        });
    }
};

// get all menu off single restaurant 
exports.restaurantMenu = async (req, res) => {
    const id = req.params.id
    const { page = 1, limit = 5, search = '' } = req.query;
    try {

        let filter = { restaurant: id }; // Always filter by restaurant ID

        if (search) {
            const isNumeric = !isNaN(Number(search));
            // Add search condition (case-insensitive text search on the 'name' field, or adapt to your schema)
            filter.$or = [
                { food: { $regex: search, $options: 'i' } },
                ...(isNumeric ? [{ price: Number(search) }] : []),
            ];
        }


        const menu = await Menu.find(filter).populate({ path: 'category', select: 'category' }).limit(limit).skip(limit * page);
        const total = await Menu.countDocuments();
        if (!menu) {
            return res.status(404).send({ "message": "Menu is not available" });
        }

        res.status(200).send({ menu, total });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error   ', "error": error.message });
    }
}

// get single menu 
exports.get = async (req, res) => {
    const id = req.params.id
    try {
        const menu = await Menu.findById(id);

        if (!menu) {
            return res.status(404).send({ "message": "Menu is not available" });
        }

        res.status(200).send(menu);


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error   ', "error": error.message });
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id
    try {

        Menu.findByIdAndDelete(id, { useFindAndModify: false })
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

