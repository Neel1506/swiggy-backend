module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            restaurant: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'restaurant',
                required: true, // Ensure a restaurant is associated with the order
            },
            cart: {
                type: Array,
                required: true, // Corrected from "require" to "required"
            },
            customer: {
                type: Object,
                required: true, // Corrected from "require" to "required"
            },
            orderTotal: {
                type: Number,
                required: true, // Ensure the total amount of the order is always specified
            },
            orderDate: {
                type: Date,
                default: Date.now, // Automatically set the order date to the current date/time
            },
            paymentStatus: {
                type: String,
                enum: ['pending', 'paid', 'refunded'],
                default: 'pending', // Default payment status
            },
            deliveryStatus: {
                type: String,
                enum: ['delivered', 'out_for_delivery', 'pending'], // Added "pending" to handle orders not yet out for delivery
                default: 'pending', // Default delivery status
            },
        },
        { 
            timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
        }
    );

    return mongoose.model('order', schema);
};
