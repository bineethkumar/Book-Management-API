const mongoose = require("mongoose");

//Creating an Publication schema

const PublicationSchema = mongoose.Schema({
    id: Number,
    name: String,
    books:[String],
});

const PublicationModel = mongoose.model(PublicationSchema);

module.exports = PublicationModel;