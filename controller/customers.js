
/*
 * GET users listing.
 */

exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM customer',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
			
			var grid = [{"menu":"Name"},{"menu":"Alamat"},{"menu":"Telpon"},{"menu":"MAILMAIL"}];
			
            res.render('customers',{
				page_title:"Customers - Node.js",
				data:rows,
				grid_table:grid
			});
                
           
         });
         
         //console.log(query.sql);
    });
  
};

exports.add = function(req, res){
   res.render('add_customer',{csrfToken: req.csrfToken(), page_title:"Add Customers - Node.js"});
};

exports.edit = function(req, res){
    
    var id = req.params.id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM customer WHERE id = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_customer',{csrfToken: req.csrfToken(), page_title:"Edit Customers - Node.js",data:rows});
                
           
         });
         
         //console.log(query.sql);
    }); 
};

/*Save the customer*/
exports.save = function(req,res){
    var xssFilters = req.xssFilters;
    var validator = req.validator;
    var input = JSON.parse(JSON.stringify(req.body));

    var vmail = ""; (validator.isEmail(input.email) == 1) ? vmail = input.email : vmail = "";
    var vphone = ""; (validator.isAlphanumeric(input.phone) == 1) ? vphone = input.phone : vphone = "";
   
    
    req.getConnection(function (err, connection) {
        var data = {
            name    : xssFilters.inHTMLData(input.name),
            address : xssFilters.inHTMLData(input.address),
            email   : vmail,
            phone   : vphone
        };
        
        var query = connection.query("INSERT INTO customer set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/customers');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};

exports.save_edit = function(req,res){
    var xssFilters = req.xssFilters;
    var validator = req.validator;
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    var vmail = ""; (validator.isEmail(input.email) == 1) ? vmail = input.email : vmail = "";
    var vphone = ""; (validator.isAlphanumeric(input.phone) == 1) ? vphone = input.phone : vphone = "";
    
    req.getConnection(function (err, connection) {
        
        var data = {
            name    : xssFilters.inHTMLData(input.name),
            address : xssFilters.inHTMLData(input.address),
            email   : vmail,
            phone   : vphone
        };
        
        connection.query("UPDATE customer set ? WHERE id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/customers');
          
        });
    
    });
};


exports.delete_customer = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM customer  WHERE id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/customers');
             
        });
        
     });
};