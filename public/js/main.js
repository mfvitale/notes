$(window).load(function(){
	console.log("Init functions");
	$(".note .glyphicon-remove").click(function(){
		var toRemove = jQuery(this).closest(".note");
		toRemove.hide('slow', function(){ 
			toRemove.remove(); 
		});
		
		console.log("Removed");
	});
	console.log("Init finished");
});


