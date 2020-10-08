const mongoose = require("mongoose");

const WeightSchema = new mongoose.Schema({
	weight: {
		type: String,
		required: [true, "Teža je obvezna!"]
	},
	created_at: {
		type: String,
		required: [true, "Datum je obvezen!"]
	}
})

module.exports = mongoose.models.Weight || mongoose.model("Weight", WeightSchema);