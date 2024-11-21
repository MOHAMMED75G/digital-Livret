const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    location: { type: String, required: true },
    profileImage: { type: String },
  });
  
  const Profile = mongoose.model('Profile', profileSchema);
  
  module.exports = Profile;
  