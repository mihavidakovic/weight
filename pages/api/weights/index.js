import dbConnect from "../../../util/mongodb";
import Weight from "../../../models/Weight";


dbConnect();

export default async (req, res) => {
	const { 
		query: { page, size },
		method 
	} = req;
	
	if(page) {
		const getPagination = (page, size) => {
			// const limit = size ? +size : 3;
			const limit = 12;
			const offset = page ? page * limit : 0;
		  
			return { limit, offset };
		  };
		const { limit, offset } = getPagination(page, size);
		
		const weights = Weight.paginate({}, { offset, limit, sort: {created_at: -1} })
		.then(result => {
			res.status(200).json({success: true, data: result})
		})
	} else {
		switch (method) {
			case "GET":
				try {
					const weights = await Weight.find({}).sort({created_at: -1});
					res.status(200).json({success: true, data: weights, page: page})
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
	
	}
};

