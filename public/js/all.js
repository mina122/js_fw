function addUser(){
            
    window.location.href = '/customers/add';
}
function cancelAdd(){
    
    window.location.href = '/customers';
}

function is_confirm(val){
	conf = confirm("Are you sure want to delete this data? ");
	if(conf == true){
		location.assign("../customers/delete/"+val);
	}
}
