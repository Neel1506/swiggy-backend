module.exports = mongoose =>{
  const schema = mongoose.Schema(
  {
    restaurant_name: {
      type: String,
      required: true,
    },
    cuisine_type: {
      type: String,
    },
    address: { type: String },
    open_time: { type: String },
    close_time: { type: String },
    restaurant_offer:String,
    status: { type: String, enum: ['Active', 'Inactive', 'Suspended'], default: 'Active' },
    profile: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin_user' },
  },
  { timestamps: true }
  );

  return  mongoose.model('restaurant', schema)
}