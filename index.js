const express = require('express')
const app = express();

app.use(express.json());

const port = 8086;

let businesses = [];
let NextBusiness = -1;
let reviewedBusinesses = [];
let NextReview = -1;
let reviews = [];
let photos = [];
let NextPhoto = -1;

app.listen(port, () => {
    console.log(`== Server is listening on port ${port}`);
});

app.post("/businesses", (req, res) => {
	console.log(businesses);
	if ("name" in req.body & "address" in req.body & "city" in req.body & "state" in req.body & "ZIP" in req.body & "phone" in req.body & "category" in req.body & "subcategories" in req.body){
		NextBusiness += 1;
		businesses[NextBusiness] = req.body["name"];

		res.status(201).send(
		{
			"id": NextBusiness,
			"links": {
				"self": "/businesses/" + (NextBusiness)
			}
		}
		);
	}else{
		res.status(400).send({"error": `malformed request body`});
	}
})

app.put("/businesses/:businessID", (req, res) => {
	let businessID = parseInt(req.params.businessID);
	if (businesses[businessID] != null) {
		if ("name" in req.body & "address" in req.body & "city" in req.body & "state" in req.body & "ZIP" in req.body & "phone" in req.body & "category" in req.body & "subcategories" in req.body){
			businesses[businessID] = req.body["name"];

			res.status(201).send(
			{
				"id": businessID,
				"links": {
					"self": "/businesses/" + (businessID)
				}
			}
			);
		}else{
			res.status(400).send({"error": `malformed request body`});
		}
	}else{
		res.status(404).send({"error": `Business ${businessID} not found`});
	}
})

app.get("/businesses", (req, res) => {
	let page = parseInt(req.query.page);
	res.status(200).send(
		{
			"pagenumber": page,
			"totalpages": 90,
			"pageSize": 5,
			"totalcount": 400,
			"businesses":
			[{
				"id": 0,
				"name": "Awesome Burger",
				"address": "123 SW Driver Drive",
				"city": "Bend",
				"state": "Oregon",
				"ZIP": 12345,
				"phone": "123-456-7890",
				"category": "Restaurant",
				"subcategories": ["Fast Food", "Burgers"]
			}, 
			{
				"id": 1,
				"name": "Wayne's Wheels",
				"address": "700 Starlight Street",
				"city": "Boston",
				"state": "Massachusetts",
				"ZIP": 67890,
				"phone": "098-765-4321",
				"category": "Car Dealership",
				"subcategories": ["Electric Vehicles"]
			}],
			"links": {
				"nextPage": "/businesses?page=2",
        		"lastPage": "/businesses?page=90"
			}
		}
	);
})

app.get("/businesses/:businessID", (req, res) => {
	let businessID = parseInt(req.params.businessID);
	if (businesses[businessID] != null) {
		res.status(200).send({
			"name": "Awesome Burger",
			"address": "123 SW Driver Drive",
			"city": "Bend",
			"state": "Oregon",
			"ZIP": 12345,
			"phone": "123-456-7890",
			"category": "Restaurant",
			"subcategories": ["Fast Food", "Burgers"]
		});
	}else{
		res.status(404).send({"error": `Business ${businessID} not found`});
	}
})

app.delete("/businesses/:businessID", (req, res) => {
	let businessID = parseInt(req.params.businessID);
	if (businesses[businessID] != null) {
    	businesses[businessID] = null;
    	res.status(200).send({"result": `Business ${businessID} deleted`});
    }else{
    	res.status(404).send({"error": `Business ${businessID} not found`});
    }
})

app.post("/reviews", (req, res) => {
	if ("rating" in req.body & typeof req.body["rating"] == "number" & req.body["rating"] >= 0 & req.body["rating"] <= 5 & "cost" in req.body & typeof req.body["cost"] == "number" & req.body["cost"] >= 1 & req.body["cost"] <= 4 & "businessID" in req.body){
		let BusinessID = req.body["businessID"]
		if (businesses[BusinessID] != null){
			if (reviewedBusinesses[BusinessID] == null){
				NextReview += 1;
				reviews[NextReview] = "placeholder";
				reviewedBusinesses[BusinessID] = businesses[BusinessID];

				res.status(201).send(
				{
					"id": NextReview,
					"links": {
						"self": "/reviews/" + (NextReview),
						"business": "/businesses/" + (BusinessID)
					}
				}
				);
			}else{
				res.status(400).send({"error": `business ${BusinessID} already has a review`});
			}
		}else{
			res.status(404).send({"error": `Business ${BusinessID} not found`});
		}
	}else{
		res.status(400).send({"error": `malformed request body`});
	}
})

app.get("/reviews", (req, res) => {
	let page = parseInt(req.query.page);
	res.status(200).send(
		{
			"pagenumber": page,
			"totalpages": 50,
			"pageSize": 3,
			"totalcount": 120,
			"reviews":
			[{
				"id": 0,
				"rating": 2,
				"cost": 1,
				"message": "employees called me mean words",
				"BusinessID": 4,
			}, 
			{
				"id": 1,
				"rating": 5,
				"cost": 3,
				"BusinessID": 2,
			}],
			"links": {
				"nextPage": "/reviews?page=2",
        		"lastPage": "/reviews?page=50"
			}
		}
	);
})

app.put("/reviews/:reviewID", (req, res) => {
	let reviewID = parseInt(req.params.reviewID);
	if (reviews[reviewID] != null) {
		// pretend that the previous business ID from this review is retrieved around here and used for the new review data
		if ("rating" in req.body & typeof req.body["rating"] == "number" & req.body["rating"] >= 0 & req.body["rating"] <= 5 & "cost" in req.body & typeof req.body["cost"] == "number" & req.body["cost"] >= 1 & req.body["cost"] <= 4){
			res.status(201).send(
			{
				"id": reviewID,
				"links": {
					"self": "/reviews/" + (reviewID),
					"business": "/businesses/" + (1)
				}
			}
			);
		}else{
			res.status(400).send({"error": `malformed request body`});
		}
	}else{
		res.status(404).send({"error": `Review ${reviewID} not found`});
	}
})


app.delete("/reviews/:reviewID", (req, res) => {
	let reviewID = parseInt(req.params.reviewID);
	if (reviews[reviewID] != null) {
    	reviews[reviewID] = null;
    	res.status(200).send({"result": `Review ${reviewID} deleted`});
    }else{
    	res.status(404).send({"error": `Review ${reviewID} not found`});
    }
})

app.post("/photos", (req, res) => {
	let BusinessID = req.body["businessID"]
	if (businesses[BusinessID] != null){
		NextPhoto += 1;
		photos[NextPhoto] = "placeholder";

		res.status(201).send(
		{
			"id": NextPhoto,
			"links": {
				"self": "/photos/" + (NextPhoto),
				"business": "/businesses/" + (BusinessID)
			}
		}
		);
	}else{
		res.status(404).send({"error": `Business ${BusinessID} not found`});
	}
})

app.get("/photos", (req, res) => {
	let page = parseInt(req.query.page);
	res.status(200).send(
		{
			"pagenumber": page,
			"totalpages": 60,
			"pageSize": 4,
			"totalcount": 210,
			"photos":
			[{
				"id": 0,
				"caption": "photo of the interior of the building",
				"BusinessID": 3,
			}, 
			{
				"id": 1,
				"BusinessID": 1,
			}],
			"links": {
				"nextPage": "/photos?page=2",
        		"lastPage": "/photos?page=60"
			}
		}
	);
})


app.put("/photos/:photoID", (req, res) => {
	let photoID = parseInt(req.params.photoID);
	if (photos[photoID] != null) {
		// pretend that the previous business ID from this photo is retrieved around here and used for the new review data
		res.status(201).send(
		{
			"id": photoID,
			"links": {
				"self": "/photos/" + (photoID),
				"business": "/businesses/" + (1)
			}
		}
		);
	}else{
		res.status(404).send({"error": `Photo ${photoID} not found`});
	}
})

app.delete("/photos/:photoID", (req, res) => {
	let photoID = parseInt(req.params.photoID);
	if (photos[photoID] != null) {
    	photos[photoID] = null;
    	res.status(200).send({"result": `photo ${photoID} deleted`});
    }else{
    	res.status(404).send({"error": `photo ${photoID} not found`});
    }
})