const mongoose = require('mongoose');

const photsSchema = new mongoose.Schema({
    __v: { type: Number, select: false },
    photo_url: { type: String, required: false, select: true },
    category: { type: String, select: true },
    title: { type: String, required: true, select: true },
    description: { type: String, select: true },
    country: { type: String, select: true },
    province: { type: String, select: true },
    city: { type: String, select: true },
    loc_longitude: { type: String, select: true },
    loc_latitude: { type: String, select: true },
    camera_model: { type: String, select: true },
    aperture: { type: String, select: true },
    focal_distance: { type: String, select: true },
    iso: { type: Number, select: true },
    _user: {
        type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        select: false,
    },
    liking_user: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        select: false,
    },
    collecting_user: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        select: false,
    },
}, { timestamps: true })

module.exports = mongoose.model('photos', photsSchema);