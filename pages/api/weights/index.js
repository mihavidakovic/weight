import dbConnect from "../../../util/mongodb";
import Weight from "../../../models/Weight";


dbConnect();

export default async (req, res) => {
	const { method } = req;

	switch (method) {
		case "GET":
			try {
				const weights = await Weight.find({}).sort({created_at: -1});
				res.status(200).json({success: true, data: weights})
			} catch(e) {
				res.status(400).json({success: false, error: e})
			}
			
			break;
		case "POST":
			try {
				const weights = await Weight.create(req.body);
				res.status(201).json({success: true, data: weights})
			} catch(e) {
				res.status(400).json({success: false, error: e})
			}
			
			break;
		default:
			res.status(400).json({success: false})
			break;
	}
};

