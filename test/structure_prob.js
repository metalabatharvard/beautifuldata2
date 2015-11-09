//$(document).ready(function() {

function load_prob_coll(){	
	console.log("LOADED: structure_prob");
$.getJSON( "data2.json", function( data ) {

	///GLOBAL START////////////////////////////////////////////////////////////////////////////////////
	//var all_rand_ids = [];
	var all_obj = [];
	$('.shift_question').html('What are problem collections?');
	$('.grid-filter').append('<option value="">:query</option>');
	//push to single array (all_obj)
	var all_types = Object.keys(data);
	for(var i in all_types){
		var all_objintypes = data[all_types[i]];
		for(k in all_objintypes){
			all_obj.push(all_objintypes[k]);
		}
		//console.log(data[all_types[i]]);
		//console.log(all_types[i]);
		var typename = all_types[i];
		if(typename == 'people'){typename = 'person';}
		else if(typename == 'activities'){typename = 'activity';}
		else{typename = typename.substring(0, typename.length - 1)};


		$('.grid-filter').append('<option value="type_'+typename+'">:related '+all_types[i]+'</option>');
	}


	//push ids to array (all_ids)
	function shuffle(o){
	    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	    return o;
	}
	//shuffle ids
	shuffle(all_obj);

	prob_coll('all_nofilter');

	function prob_coll(filter){
		$('#masonry-grid').html('<div class="gutter-sizer"></div>');

		
		for(var i in all_obj){///start all_obj array


			function load_obj(){///start load_obj
				//$('#masonry-grid').append('<div class="object_hldr '+all_obj[i].id+'"></div>');
				$('#masonry-grid').append('<div class="grid-item id_'+all_obj[i].id+'"><div class="grid_item_inner"></div></div>');
				for(m in all_obj[i].tags){
					var tag_removespace = all_obj[i].tags[m].replace(/ /g,"-");
					$('.id_'+all_obj[i].id).addClass("tag_"+tag_removespace);
				}
				$('.id_'+all_obj[i].id).addClass("type_"+all_obj[i].type);
				var thumb = "FIX";
				

				//HAS NO IMAGES
				if(all_obj[i].type === 'question'){
					thumb = "<span class='object_desc obj_title_question'>"+all_obj[i].title+"</span>";
				}
				else if(all_obj[i].type === 'precedent'){
					thumb = "<span class='object_desc obj_title_precedent'>"+all_obj[i].title+"</span>";
				}
				else if(all_obj[i].type === 'prototype'){
					thumb = "<span class='object_desc obj_title_prototype'>"+all_obj[i].title+"</span>";
				}
				else if(all_obj[i].type === 'tool'){
					thumb = "<span class='object_desc obj_title_tool'>"+all_obj[i].title+"</span>";
					thumb += "</br>< TOOL LOGO >";
				}
				else if(all_obj[i].type === 'insight'){
					thumb = "<span class='object_desc obj_title_insight'>"+all_obj[i].title+"</span>";
				}
				else if(all_obj[i].type === 'reading'){
					thumb = "</br><span class='object_desc obj_title_reading'>"+all_obj[i].title+"</span>";
				}



				//HAS IMAGES
				else if(all_obj[i].type === 'person'){
					thumb = "<span class='object_desc'>Hello "+all_obj[i].first_name+"!</span>";
					if(all_obj[i].media.length){
						thumb += "</br><img class='object_media' src='"+all_obj[i].media[0]+"'>";	
					}else{
						thumb += "< Person icon >";
					}
				}
				else if(all_obj[i].type === 'collection'){
					if(all_obj[i].media.length){
						thumb = "<img class='object_media' src='"+all_obj[i].media[0]+"'>";	
					}else{
						thumb = "no-image(title): <span class='object_desc'>"+all_obj[i].title+"</span>";
					}
				}
				else if (all_obj[i].type === 'activity'){
					if(all_obj[i].media.length){
						thumb = "<img class='object_media' src='"+all_obj[i].media[0]+"'>";	

					}else{
						thumb = "no-image(title): <span class='object_desc'>"+all_obj[i].title+"</span>";
					}
				}


				var id = "<a class='obj_id' href='#id_"+all_obj[i].id+"'>id: "+all_obj[i].id+"</a>";
				var type = "</br>type: <a class='obj_type' id='#type_"+all_obj[i].type+"'>"+all_obj[i].type+"</a>";
				var tags = "</br>tags: ";
				var related_questions = "</br>related questions: ";
				var related_prototypes = "</br>related prototypes: ";

				//console.log(all_obj[i].related_prototypes);

				for(m in all_obj[i].tags){
					var tag_removespace = all_obj[i].tags[m].replace(/ /g,"-");
					tags += "</br><a class='obj_tag t_tag_"+tag_removespace+"' id='#tag_"+tag_removespace+"'>"+all_obj[i].tags[m]+"</a>";
				}
				for(m in all_obj[i].related_questions){
					related_questions += "</br><a class='obj_tag t_ref_"+all_obj[i].related_questions[m]+"' id='#id_"+all_obj[i].related_questions[m]+"'>"+all_obj[i].related_questions[m]+"</a>";
				}
				for(m in all_obj[i].related_prototypes){
					related_prototypes += "</br><a class='obj_tag t_ref_"+all_obj[i].related_prototypes[m]+"' id='#id_"+all_obj[i].related_prototypes[m]+"'>"+all_obj[i].related_prototypes[m]+"</a>";
				}
				//$('#masonry-grid').append('<div class="object_hldr '+all_obj[i].id+'">'+thumb+id+type+tags+'</div>');
				$('.id_'+all_obj[i].id+' .grid_item_inner').append(id+"</br>"+thumb+"</br>"+type+"</br>"+tags+"</br>"+related_questions+"</br>"+related_prototypes);
			}///end load_obj

			if (filter == 'all_nofilter') {
				load_obj();
			}
			else if (all_obj[i].type && all_obj[i].type.indexOf(filter) > -1) {
				load_obj();
			}
			else if (all_obj[i].tags && all_obj[i].tags.indexOf(filter) > -1) {
				load_obj();
			}

		}///end all_obj array
	}




	$('.main_logo').on('click', function() {
		window.location = "";
	});
	///GLOBAL END////////////////////////////////////////////////////////////////////////////////////


	///PROB_COLLECTION START////////////////////////////////////////////////////////////////////////////////////
	// This bit sets up jQuery Masonry
	var $container = $('#masonry-grid');
	$container.masonry({
		itemSelector: '.grid-item',
		columnWidth: '.gutter-sizer'
		//percentPosition: true
	});
	///PROB_COLLECTION END////////////////////////////////////////////////////////////////////////////////////


	$('.obj_tag').on('click', function() {
		//get hash value
		var tag_val = $(this).attr('id').replace("#","");
		//add hash value to url
		var add_val = window.location+"";
		//url to array
		var add_val_array = add_val.split("#");//.join("");
		//check if exists in array
		//filterArray2(add_val_array,tag_val.replace("#",""));

		if (add_val_array.indexOf(tag_val) > -1) {
			//console.log("exists, delete");
			add_val_array.splice(add_val_array.indexOf(tag_val), 1);
		}
		else {
			//console.log("doesn't exist, add tag");
			add_val_array.push(tag_val);
		};
		//remove url
		add_val_array.splice(0, 1);
		//new url
		var newurl = add_val_array.join("#");
		//check new url for hashtag
		if(newurl.indexOf('#') === 0) {}else{
			newurl = "#"+newurl;
		}
		//go to new ul
		window.location = newurl;
		//console.log(newurl);
	});
		

	


	$(".grid-filter").change(function () {
		//get hash value
		var type_val = jQuery(this).val();
		type_updateurl(type_val);
	});
	$('.obj_type').on('click', function() {
		//get hash value
		var type_val = $(this).attr('id').replace("#","");
		type_updateurl(type_val);
	});



	function type_updateurl(type_val){
		//add hash value to url
		var add_val = window.location+"";
		//url to array
		var add_val_array = add_val.split("#");//.join("");
		//check if exists
		//check if a type_ exists in array
		if (add_val_array.indexOf(type_val) > -1) {
			//exists, do nothing
			//console.log('exists, do nothing');
		}else{
			//doesn't exist, check for other type_
			//console.log('doesnt exist, check for other type_');
			var i = add_val_array.length;
			while (i--) {
				//if type_, remove, add new
			    if (add_val_array[i].indexOf('type_') > -1) {
			       	//console.log(i +": "+ add_val_array[i]+": remove");
			        add_val_array.splice(i, 1);
			    }
			}
			//push new type
			add_val_array.push(type_val);
		}
		//remove url
		add_val_array.splice(0, 1);
		//new url
		var newurl = add_val_array.join("#");
		//check new url for hashtag
		if(newurl.indexOf('#') === 0) {}else{
			newurl = "#"+newurl;
		}
		//go to new ul
		window.location = newurl;
		//console.log(newurl);

		//console.log(newurl);
	}




///WHEN THE URL CHANNNGESSSS


//ON URL HASH CHANGE
$(window).on('hashchange', function() {checkhask();});
window.onload = checkhask();
$('#masonry-grid').load(function() {checkhask();});

function checkhask(){
	//check url hash
	var hash = window.location.hash;
	var hashs = hash.split("#");//.join("");
	hashs.splice(0, 1);

	var group_class=[];
	for(var i in hashs){
		group_class.push("." + hashs[i]);
	}
	group_class = group_class.join("");
	//console.log(group_class);
	if(hash){
		$(".grid-item").hide();
		$(group_class).show();
		$container.masonry('layout');
	}else {
		$(".grid-item").show();
		$container.masonry('layout');
	}

	//PROB_COLL highlight tags
	$('.obj_tag').css({'background':'transparent'});
	for(var i in hashs){
		$('.t_'+hashs[i]).css({'background':'black'});
		//console.log('.t_'+add_val_array[i]);
	}
}

//URLS
//#id_n
//#tag_n
//#type_n



});
}

//});

