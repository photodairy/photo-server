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
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true, select: false },
    liking_users: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
        select: false,
    },
    collecting_users: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
        select: false,
    },
    signedUpload_url: { type: String },
    uploadStatus: { type: String, enum: ['wait', 'success', 'faild'] },
    signedView_url: { type: String },
    signedViewRefreshTime: { type: String },
    s3Bucket: { type: String },
    s3Key: { type: String },
}, { timestamps: true })

module.exports = mongoose.model('photos', photsSchema);