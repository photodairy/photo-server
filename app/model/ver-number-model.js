const mongoose = require('mongoose');

const verNumSchema = new mongoose.Schema({
    __v: { type: Number, select: false },
    phoneNumber: { type: Number, required: true },
    verNumber: { type: Number, required: true },
})

module.exports = mongoose.model('vernum', verNumSchema);