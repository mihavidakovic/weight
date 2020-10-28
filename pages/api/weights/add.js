import dbConnect from "../../../util/mongodb";
import Weight from "../../../models/Weight";


dbConnect();

export default async (req, res) => {
	const { method } = req;

	switch (method) {
		case "GET":
			try {
				let data = [];
				var now = new Date();
				var from = new Date(2019,1,0);
				var to = new Date(2020,12,0);

				for (var d = from; d <= to; d.setDate(d.getDate() + 1)) {
				    const weights = await Weight.create({
				    	myWeight: 0,
				    	projectedWeight: 0,
				    	created_at: new Date(d)
				    });
				}

				    

				res.status(200).json({success: true, data: data})
			} catch(e) {
				res.status(400).json({success: false, error: e})
			}
			
			break;
		default:
			res.status(400).json({success: false})
			break;
	}
};

