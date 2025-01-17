const db = require('../../models/index');
const Category = db.category;


exports.create = async (req, res) => {

    try {
        console.log(req.body);

        const { category, description, status, restaurantId } = req.body;
        const Status = status == 1 ? "Active" : "Inactive";
        const newCategory = new Category(
            {
                category,
                description,
                status: Status,
                restaurant: restaurantId
            }
        );

        await newCategory.save();

        res.status(201).send({ 'message': "New Category is added successfully" });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error   ', "error": error.message });
    }
}

// get category by restaurant id

exports.restaurantCategory = async (req, res) => {
    const id = req.params.id
    try {
        const category = await Category.find({ restaurant: id });

        if (!category) {
            res.status(404).send({ "message": "Category is not available" });
        }

        res.status(200).send({ "category": category });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error   ', "error": error.message });
    }
}

// get category by category id

exports.get = async (req, res) => {
    const id = req.params.id
    try {
        const category = await Category.findById(id);

        if (!category) {
          return  res.status(404).send({ "message": "category is not available" });
        }

        res.status(200).send(category);


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error   ', "error": error.message });
    }
}

exports.edit = async (req, res) => {
    try {
        const { id } = req.params; // Extract the restaurant ID from the URL
        const updates = req.body; // Data sent from the frontend



        // Find the restaurant by ID and update it
        const updatedCategory = await Category.findOneAndUpdate(
            { _id: id },        // Query to find the document
            { $set: updates },  // Fields to update
            { new: true }       // Return the updated document
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Menu not found" });
        }

        res.status(200).json({
            message: "Category updated successfully",
            data: updatedCategory,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating Category",
            error: error.message,
        });
    }
};


exports.delete = async (req, res) => {
    const id = req.params.id
    try {

        Category.findByIdAndDelete(id, { useFindAndModify: false })
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