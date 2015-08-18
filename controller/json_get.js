exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM bola_content',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
			
            res.render('json/list',{
				data:rows
			});
         });
         
         //console.log(query.sql);
    });
  
};