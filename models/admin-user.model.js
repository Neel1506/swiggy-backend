module.exports = mongoose =>{
  const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: { type: String },
  contact: {
    type: Number,
    required: true,
  },
  
  status: { type: String, enum: ['Active', 'Inactive', 'Suspended'], default: 'Active' },
  profile: { type: String },
  role: { type: String, enum: ['SuperAdmin', 'RestaurantAdmin','DeliveryServiceAdmin'], required: true },
  password: {
    type: String,
    required: true,
  },
},
  { timestamps: true }
  );

  return  mongoose.model('Admin_user', schema)
}
