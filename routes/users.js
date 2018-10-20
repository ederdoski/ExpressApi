var express = require('express');
var router  = express.Router();
const db    = require('../models/index');

//--- Add Users

router.post('/', function(req, res, next) {	

	var isValidData = true;

	if(req.body.name.trim() == "" || req.body.lastName.trim() == "" || req.body.email.trim() == ""){
		isValidData = false;
	}

	if(isValidData){
		try {
			
			db.Users.findAll({
			  where: {
			    email: req.body.email
			  }
			}).then(function (users) {

				if(users.length > 0){
					res.status(403).json({"response":"fail", "error": "Email already registered"});
				}else{
					db.Users.build({
						name : 		req.body.name,
						lastName :  req.body.lastName,
						email : 	req.body.email
					}).save();

					res.status(201).json({"response":"success"});
				}
	    	});
			
	    } catch (error) {
	        res.status(500).json({"response":"fail", "error": error});
	    }
	}else{
	    res.status(403).json({"response":"fail", "error": "One or more fields are empty"});
	}
});

//--- Get Users

router.get('/', async(req, res, next) => {	

    try {
      await db.Users.findAll().then(users => {
         res.status(200).json({"response":"success", "data": users});
      })
    } catch (error) {
        res.status(500).json({"response":"fail", "error": error});
    }

});

module.exports = router;
