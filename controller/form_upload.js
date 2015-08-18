exports.form = function(req,res){
    var app = req.app;
	var base_data = {
        'base_url':app.get('base_url'),
        'public':app.get('public')
    }
    res.render('form_upload/form',{
		'title':'Form Upload Data',
        base_data:base_data
	});
}

exports.upload = function(req,res){
	var fs = req.fs;
    var app = req.app;
	var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename, encoding, mimitype) {
    	var part_file = filename.split(".");
    	var ext = part_file[part_file.length-1];
    	
    	filename = filename.replace(/\W+/g, '-').toLowerCase() + Date.now()+'.'+ext;
        console.log("Uploading: " + filename); 
        fstream = fs.createWriteStream(__dirname + '/../public/uploads/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
           // res.redirect('back');
           res.end();
        });
    });

}