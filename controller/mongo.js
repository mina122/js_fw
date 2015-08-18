exports.list = function(req, res){
  /*get data from mongodb*/
  var db = req.db;
  var collection = db.get('tbl_article');
  
  var filter = {
	//name:'jannes'
  }
  
  var options = {
	//"limit": 20,
    //"skip": 10,
    //"sort": "title"
  }
  
  collection.find(filter,options,function(e,docs){
	var grid = [{'menu':'ID'},{'menu':'Name'},{'menu':'Email'}];
	res.render('mongo/mongo',{
		'title':'Mongo DB Get Data',
		'data':docs,
		'grid':grid
	});
  });
  
};

exports.list_json = function(req, res){
	var db = req.db;
  var collection = db.get('bola_content');
  
  var filter = {
	//name:'jannes'
  }
  
  var options = {
	"limit": 10000,
    //"skip": 10,
    //"sort": "title"
  }
  
  
  collection.find(filter,options,function(e,docs){
	res.render('mongo/list_json',{
		'data':docs
	});
  });
};

/*Insert Mongo*/
exports.add = function(req,res){
	res.render('mongo/add',{
		'title':'Form Add Data Mongo'
	});
}

exports.post = function(req,res){
	var db = req.db;
    var collection = db.get('tbl_article');
	
	/*get max ID*/
	var options = {'sort':[['id','desc']]};
	collection.findOne({},options,function(err,doc){
		var input = JSON.parse(JSON.stringify(req.body));
		var maxid = doc.id;
		
		var data = {
			id : (maxid+1),
			name : input.name,
			email : input.email,
			phone : input.phone
		}
		
		var insert = collection.insert(data,function(err,rows){
			if(err) console.log('Errornya adalah ',err);
			
			res.redirect('/mongo');
		});
	});
}
/*Insert Mongo*/

/*update*/
exports.edit = function(req,res){
	var id = req.params.id;
	var db = req.db;
    var collection = db.get('tbl_article');
	
	var filter = {
		_id : id
	};
	var options = {'sort':[['id','desc']]};
	collection.findOne(filter,options,function(err,rows){
		if(err) console.log(err);
		
		res.render('mongo/edit',{
			'title':'Form Edit Mongo',
			'_id':id,
			'id':rows.id,
			'name':rows.name,
			'email':rows.email,
			'phone':rows.phone,
		});
	});
}

exports.update = function(req,res){
	var db = req.db;
    var collection = db.get('tbl_article');
	
	var input = JSON.parse(JSON.stringify(req.body));
	
	var filter = {
		_id : input._id
	};
	
	var update = {
		$set:{
			name : input.name,
			email : input.email,
			phone : input.phone
		}
	};
	
	collection.update(filter,update,function(err,upd){
		if(err){
			 console.log(err.message);
		}else{
			console.log(upd);
		}
		
		res.redirect('/mongo');
	});
}

/*update*/

/*delete*/
exports.remove = function(req,res){
	var id = req.params.id;
	var db = req.db;
    var collection = db.get('tbl_article');
	
	collection.remove({_id:id},function(err,del){
		if(err) console.log(err.message);
		
		res.redirect('/mongo');
	});
	
}


