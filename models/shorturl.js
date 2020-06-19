const mongoose = require("mongoose")

const shortid = require("shortid")

const schema = new mongoose.Schema({

    fullurl: {
        type: String,
        required: true
    },
    shorturl: {
        type: String,
        required: true,
        default: shortid.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model("urlshortener", schema)