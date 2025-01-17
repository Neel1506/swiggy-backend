module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            category: String,
            description: String,
            status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
            restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'restaurant' },
        },
        { timestamps: true }

    )

    return mongoose.model('category', schema);
}