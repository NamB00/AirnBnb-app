const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  imageSrc: String,
  category: String,
  roomCount: Number,
  bathroomCount: Number,
  guestCount: Number,
  locationValue: String,
  price: Number,
  location: Object,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: { createdAt: 'createdAt' }
});

const PlaceModel = mongoose.model('Place', placeSchema);

module.exports = PlaceModel;





// owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// title: String,
// description: String,
// address: String,
// photos: [String],
// perks: [String],
// extraInfo: String,
// checkIn: Number,
// checkOut: Number,
// maxGuests: Number,