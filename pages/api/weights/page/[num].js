import dbConnect from "../../../util/mongodb";
import Weight from "../../../models/Weight";


dbConnect();

export default async (req, res) => {
	const { 
		query: { page },
		method 
	} = req;

	switch (method) {
		case "GET":
            res.status(200).json({success: true, num: page})			
			break;
		case "PUT":
			try {
				const weight = await Weight.findByIdAndUpdate(id, req.body, {
					new: true,
					runValidators: true
				});

				if (!weight) {
					es.status(400).json({success: false})
				}

				res.status(200).json({success: true, data: weight})
			} catch(e) {
				res.status(400).json({success: false})
			}
			
			break;
		case "DELETE":
			try {
				const deletedWeight = await Weight.deleteOne({_id: id});

				if (!deletedWeight) {
					es.status(400).json({success: false})
				}

				res.status(200).json({success: true, data: {deletedWeight}})
			} catch(e) {
				res.status(400).json({success: false})
			}
			
			break;
		default:
			res.status(400).json({success: false})
			break;
	}
};

