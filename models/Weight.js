const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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
WeightSchema.plugin(mongoosePaginate);

module.exports = mongoose.models.Weight || mongoose.model("Weight", WeightSchema);