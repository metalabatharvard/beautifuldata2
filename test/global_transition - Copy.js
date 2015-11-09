$(document).ready(function() {

	//checkhask();

	var counter = 0;
	var homepages = ['index_problem_collection','index_invisible_visible','index_beautiful_data'];
	$('.shift_forw').on('click', function() {
		counter++;
		if(counter > homepages.length-1){
			counter = 0;
		}
		var current = homepages[0];
		index_rotate(current, counter)
	});


	function index_rotate(current, count){
		var homepage = homepages[counter];
		//add hash value to url
		var add_val = window.location+"";
		//url to array
		var add_val_array = add_val.split("#");//.join("");
		if(add_val_array.length > 1){
		var add_val_array2 = add_val_array[1].split("&");//.join("");
		console.log(add_val_array2);
		}
		//remove url
		add_val_array.splice(0, 1);
		//check if a type_ exists in array
		if (add_val_array.indexOf(homepage) > -1) {
			//exists, do nothing
			console.log('exists, do nothing');
		}else{
			//doesn't exist, check for other type_
			//console.log('doesnt exist, check for other type_');
			var i = add_val_array.length;
			while (i--) {
				//if type_, remove, add new
			    if (add_val_array[i].indexOf('index_') > -1) {
			       	//console.log(i +": "+ add_val_array[i]+": remove");
			        add_val_array.splice(i, 1);
			    }
			}
			//push new type
			add_val_array.push(homepage);
		}
		//new url
		var newurl = add_val_array.join("#");
		//check new url for intitial hashtag
		if(newurl.indexOf('#') === 0) {}else{
			newurl = "#"+newurl;
		}
		//go to new ul
		window.location = newurl;
		console.log(homepage);
	}

	function checkhask(){
		//check url hash
		var hash = window.location.hash;
		var hashs = hash.split("#");//.join("");
		hashs.splice(0, 1);

		if (hashs.indexOf('invisible_visible') > -1) {
			$('#masonry-grid').html('');
			load_visible_coll();
		}
		else if (hashs.indexOf('beautiful_data') > -1) {
			$('#json-grid').html('');
			$('#svg_connections').html('');
			//console.log("show beautiful_data page");
			//load_visible_coll();
		}
		else {
			load_prob_coll();
		};
		
	}

});

