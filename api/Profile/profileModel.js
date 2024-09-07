const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  first_name: { type: String,  },
  last_name: { type: String,  },
  age: { type: Number,  },
  dob: { type: Date,  },
  gender: { type: String,  },
  email: { type: String,  unique: true },
  phone_number: { type: String,  },
  adhar_number: { type: String,  },
  adhar_number_image: { type: String },
  pan_card: { type: String,  },
  pan_card_image: { type: String },
  highest_education: { type: String,  },
  highest_education_certificate_image: { type: String }
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
