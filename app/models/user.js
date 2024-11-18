import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  name: { type: String },
  profilepic: { type: String },
  coverpic: { type: String },
  razorpayid: {type: String},
  razorpaysecret: {type: String},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model('User', userSchema);

//If already exists then mongoose.models.User else  mongoose.model('User', userSchema)