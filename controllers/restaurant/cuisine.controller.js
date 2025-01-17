const db = require('../../models/index');
const Cuisine = db.cuisine;



exports.create = async (req, res) => {

    try {
        const { cuisine, description, status,restaurantId } = req.body;
        const Status = status == 1 ? "Active" : "Inactive";
        const newCuisine = new Cuisine(
            {
                cuisine,
                description,
                status: Status,
                restaurant:restaurantId
            }
        );

        savedCuisine = await newCuisine.save();

        res.status(201).send({ 'message': "new cuisine is added successfully" });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error   ', "error": error.message });
    }

}

exports.get = async (req, res) => {
    const id = req.params.id
    try {
        const cuisine = await Cuisine.find({restaurant:id});

        if(!cuisine){
            res.status(404).send({"message":"Cuisine is not available"});
        }

        res.status(200).send({"cuisine":cuisine });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error   ', "error": error.message });
    }
}