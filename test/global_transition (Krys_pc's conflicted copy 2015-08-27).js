$(document).ready(function() {

	checkhask();
	console.log('global transition');
/*
	$.getScript("structure_prob.js", function(){
	   console.log("structure_prob loaded");
	});
	$.getScript("structure_visible.js", function(){
	   console.log("structure_prob loaded");
	});*/

	function checkhask(){
		//check url hash
		var hash = window.location.hash;
		var hashs = hash.split("#");//.join("");
		hashs.splice(0, 1);

		if (hashs.indexOf('invisible_visible') > -1) {
			console.log("show invisible_visible page");
			//load_visible_coll();
		}
		else if (hashs.indexOf('beautiful_data') > -1) {
			console.log("show beautiful_data page");
			//load_visible_coll();
		}
		else {
			console.log("show problem_collection page");
			//load_visible_coll();
		};
		
	}

});

