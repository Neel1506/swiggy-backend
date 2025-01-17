module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            food: String,
            description: String,
            restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'restaurant' },
            category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
            price: Number,
            isVeg: { type: Boolean, enum: [0, 1] },
            status: { type: Boolean, enum: [0, 1,] },
            food_picture: { type: String },
            
        },
        { timestamps: true }
    )
    return mongoose.model('menu',schema);
}