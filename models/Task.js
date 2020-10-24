const mongoose = require("mongoose");

var TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date
    }
});

module.exports = mongoose.model('Task', TaskSchema);