module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      cuisine: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
      restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'restaurant' },
    },
  { timestamps: true }
  );
  return mongoose.model('cuisine', schema);
}