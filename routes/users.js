var express = require('express');
var router  = express.Router();
const db    = require('../models/index');

function isUserExists (email, callback){
	try{
		db.Users.findAll({
			  where: {
			    email: email
			  }
			}).then(function (users) {

				if(users.length > 0){
					callback(true);
				}else{
					callback(false);
				}
			});
	} catch (error) {
	    res.status(500).json({"response":"fail", "error": error});
	}
}

//--- Get Users

router.get('/', async(req, res, next) => {	

    try {
    	await db.Users.findAll({
		  where: {
		    status: "active"
		  }
		}).then(users => {
         res.status(200).json({"response":"success", "data": users});
     	})
    } catch (error) {
        res.status(500).json({"response":"fail", "error": error});
    }

});

//--- Add Users

router.post('/', function(req, res, next) {	

	var isValidData = true;

	if(req.body.name.trim() == "" || req.body.lastName.trim() == "" || req.body.email.trim() == ""){
		isValidData = false;
	}

	if(isValidData){
		try {

			isUserExists(req.body.email, function(response)
			{
				if(response)
				{
					res.status(403).json({"response":"fail", "error": "Email already registered"});
				}
				else
				{
					db.Users.build({
						name : 		req.body.name,
						lastName :  req.body.lastName,
						email : 	req.body.email
					}).save();

					res.status(201).json({"response":"success"});
				}
			})
	    } catch (error) {
	        res.status(500).json({"response":"fail", "error": error});
	    }
	}else{
	    res.status(403).json({"response":"fail", "error": "One or more fields are empty"});
	}
});

//--- Update User

router.put('/', function(req, res, next) {	

	isUserExists(req.body.email, function(response)
	{
		if(response)
		{
			db.Users.update({
				name: req.body.name,
				lastName: req.body.lastName,
				email: req.body.email
			},{
				where: {
		            id: req.body.id
		        }
			})

			res.status(201).json({"response":"success"});
		}
		else
		{
			res.status(403).json({"response":"fail", "error": "Unregistered user"});
		}
	})
});

//--- Delete User

router.delete('/', function(req, res, next) {	

	isUserExists(req.body.email, function(response)
	{
		if(response)
		{
			db.Users.update({
				status: 'inactive'
			},{
				where: {
		            id: req.body.id
		        }
			})

			res.status(201).json({"response":"success"});
		}
		else
		{
			res.status(403).json({"response":"fail", "error": "Unregistered user"});
		}
	})
});

module.exports = router;
