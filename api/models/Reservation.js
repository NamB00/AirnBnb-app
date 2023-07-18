const mongoose = require('mongoose');

const ReserSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  listingId: { type: mongoose.Schema.Types.String },
  startDate: { type: mongoose.Schema.Types.Date },
  endDate: { type: mongoose.Schema.Types.Date },
  totalPrice: { type: mongoose.Schema.Types.Number },
  title: { type: mongoose.Schema.Types.String },
  location: { type: mongoose.Schema.Types.String },
}, {
  timestamps: { createdAt: 'createdAt' }
});

const ReserModal = mongoose.model('Reser', ReserSchema);

module.exports = ReserModal;

