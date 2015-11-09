function load_prob_coll(indexname,taglist,data,cmd){	
	//console.log(indexname+':'+taglist+':'+cmd);

	///on page LOAD
	if(cmd == "cmd_load"){
		$('.CONTENT').html('<div id="masonry-grid">GRID</div>');
		
		var all_obj = [];
		//push to single array (all_obj)
		var all_types = Object.keys(data);
		for(var i in all_types){
			var all_objintypes = data[all_types[i]];
			for(k in all_objintypes){
				all_obj.push(all_objintypes[k]);
			}
		}

		//push ids to array (all_ids)
		function shuffle(o){
		    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		    return o;
		}
		//shuffle ids
		shuffle(all_obj);
		//var all_obj = [];

/*	

		//Order by classes (all with all taglist move to top)
		//split objects with all taglist classes and without all taglist classes. Re-combine.
		function orderbyclass(arr_obj,arr_tag){
			//var daysArray = arr_tag;
			//var courseHwork = arr_obj;
			//var new_arr_obj = [];
			//var new_arr_tag = [];

			var arr_obj_allmatch = [];
			var arr_obj_somematch = [];

			var arr_tag_len = arr_tag.length;
			//console.log(arr_tag_len);
			for(var i = 0; i < arr_obj.length; i++){
				var count = 0;
				if(arr_obj[i].tags && arr_obj[i].tags.length > 0){
					var new_arr_obj = arr_obj[i].tags;
					for (var j = 0; j < new_arr_obj.length; j++) {
					    for (var k = 0; k < arr_tag.length; k++) {
					        if (new_arr_obj[j] == arr_tag[k].replace('tag_','').replace(/-/g," ")) {
					        	//list of ids with all tags
					        	count++;
					        	if(count == arr_tag_len){
					        		//all match 
					        		//console.log("ALL MATCH: "+arr_obj[i].id);
					        		arr_obj_allmatch.push(arr_obj[i].id);
					       		}else{
					       			//some match (minus all match)
					       			//console.log("SOME MATCH: "+arr_obj[i].id);
					       			arr_obj_somematch.push(arr_obj[i].id);
					       		}
					        }
					    }
					}
				}
			}



			for (var i = 0; i < arr_obj_somematch.length; i++) {
			    for (var j = 0; j < arr_obj_allmatch.length; j++) {
			        if (arr_obj_somematch.indexOf(arr_obj_allmatch[j]) > 1) {
			        	console.log("matchall: "+arr_obj_somematch[i]);
			        }
			       // if (arr_obj_somematch[i] == arr_obj_allmatch[j]) {
			        //	console.log("matchall: "+arr_obj_somematch[i]);
			       // }
			    }
			}

			//console.log(arr_obj_allmatch);
			//console.log(arr_obj_somematch);
			

		}
		orderbyclass(all_obj,taglist);


http://stackoverflow.com/questions/9204283/how-to-check-whether-multiple-values-exist-within-an-javascript-array

function containsAll(needles, haystack){ 
  for(var i = 0 , len = needles.length; i < len; i++){
     if($.inArray(needles[i], haystack) == -1) return false;
  }
  return true;
}

containsAll([34, 78, 89], [78, 67, 34, 99, 56, 89]); // true
*/


		//start masonry without filters
		prob_coll('all_nofilter');
	}

	function prob_coll(filter){
		$('#masonry-grid').html('<div class="gutter-sizer"></div>');

		
		for(var i in all_obj){///start all_obj array


			function load_obj(){///start load_obj
				//$('#masonry-grid').append('<div class="object_hldr '+all_obj[i].id+'"></div>');
				$('#masonry-grid').append('<div class="grid-item id_'+all_obj[i].id+' type_'+all_obj[i].type+'"><div class="grid_item_inner"></div></div>');
				for(m in all_obj[i].tags){
					var tag_removespace = all_obj[i].tags[m].replace(/ /g,"-");
					$('.id_'+all_obj[i].id).addClass("tag_"+tag_removespace);
				}
				$('.id_'+all_obj[i].id).addClass("type_"+all_obj[i].type);
				var thumb = "test";
				

				//HAS NO IMAGES
				if(all_obj[i].type === 'question'){
					thumb = "<div class='object_desc obj_title_question'>"+all_obj[i].title+"</div>";
				}
				else if(all_obj[i].type === 'precedent'){
					thumb = "<div class='object_desc obj_title_precedent'>"+all_obj[i].title+"</div>";
				}
				else if(all_obj[i].type === 'prototype'){
					thumb = "<div class='object_desc obj_title_prototype'>"+all_obj[i].title+"</div>";
				}
				else if(all_obj[i].type === 'tool'){
					thumb = "<div class='object_desc obj_title_tool'>"+all_obj[i].title+"</div>";
					//thumb += "</br>< TOOL LOGO >";
				}
				else if(all_obj[i].type === 'insight'){
					thumb = "<div class='object_desc obj_title_insight'>"+all_obj[i].title+"</div>";
				}
				else if(all_obj[i].type === 'reading'){
					thumb = "<div class='object_desc obj_title_reading'>"+all_obj[i].title+"</div>";
				}



				//HAS IMAGES
				else if(all_obj[i].type === 'person'){
					//thumb = "<span class='object_desc'>Hello "+all_obj[i].first_name+"!</span>";



						var imgsrc = "<img class='object_media' src='img/nametags/"+all_obj[i].first_name+"_"+all_obj[i].last_name+".jpeg'/>"	
						var img = new Image();
					    img.src = "img/nametags/"+all_obj[i].first_name+"_"+all_obj[i].last_name+".jpeg";
					    if(img.height > 0){
					    	thumb = "<img class='object_media' src='img/nametags/"+all_obj[i].first_name+"_"+all_obj[i].last_name+".jpeg'/>";
					    }else{
					    	if(all_obj[i].media.length){
								thumb = "<img class='object_media' src='"+all_obj[i].media[0]+"'/>";
							}else{
								thumb = "<img class='object_media' src='"+all_obj[i].media+"'/>";
							}
					    }
					   // console.log(img.height);



				}
				else if(all_obj[i].type === 'collection'){
					if(all_obj[i].media.length){
						thumb = "<img class='object_media' src='"+all_obj[i].media[0]+"'>";	
					}else{
						thumb = "<div class='object_desc obj_title_collection'>"+all_obj[i].title+"</div>";
					}
				}
				else if (all_obj[i].type === 'activity'){
					if(all_obj[i].media.length){
						thumb = "<img class='object_media' src='"+all_obj[i].media[0]+"'>";	
					}else{
						thumb = "<div class='object_desc obj_title_activity'>"+all_obj[i].title+"</div>";
					}
				}


				var id;//"<a class='obj_id' href='#id_"+all_obj[i].id+"'>id: "+all_obj[i].id+"</a>";
				var title = "<a class='obj_id' href='#id_"+all_obj[i].id+"'>"+all_obj[i].title+"</a></br>";
				var type = "type: <a class='obj_type' id='#type_"+all_obj[i].type+"'>"+all_obj[i].type+"</a>";
				var tags = "tags: none";
				var related_questions = "related questions: none";
				var related_prototypes = "related prototypes: none";

				//console.log(all_obj[i].related_prototypes);
				if(all_obj[i].tags.length){
					var arr_tags = [];
					for(m in all_obj[i].tags){
						var tag_removespace = all_obj[i].tags[m].replace(/ /g,"-");
						arr_tags.push("<a class='obj_tag t_tag_"+tag_removespace+"' id='#tag_"+tag_removespace+"'>"+all_obj[i].tags[m]+"</a>");
					}
					tags = "tags: "+arr_tags.join(", ");
				}
				if(all_obj[i].related_questions.length){
					var arr_ques = [];
					for(m in all_obj[i].related_questions){
						arr_ques.push("<a class='obj_tag t_ref_"+all_obj[i].related_questions[m]+"' id='#id_"+all_obj[i].related_questions[m]+"'>"+all_obj[i].related_questions[m]+"</a>");
					}
					related_questions = "related questions: "+arr_ques.join(", ");
				}
				if(all_obj[i].related_prototypes){
					var arr_pro = [];
					for(m in all_obj[i].related_prototypes){
						arr_pro.push("<a class='obj_tag t_ref_"+all_obj[i].related_prototypes[m]+"' id='#id_"+all_obj[i].related_prototypes[m]+"'>"+all_obj[i].related_prototypes[m]+"</a>");
					}
					related_prototypes = "related prototypes: "+arr_pro.join(", ");
				}
				//$('#masonry-grid').append('<div class="object_hldr '+all_obj[i].id+'">'+thumb+id+type+tags+'</div>');
				$('.id_'+all_obj[i].id+' .grid_item_inner').append("<div class='card_img'>"+thumb+"</div><div class='card_desc'>"+title+type+"</br>"+tags+"</br>"+related_questions+"</br>"+related_prototypes+"</div>");
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
	///PROB_COLLECTION START////////////////////////////////////////////////////////////////////////////////////
	// This bit sets up jQuery Masonry
	var $container = $('#masonry-grid');
	$container.masonry({
		columnWidth: 1,
		itemSelector: '.grid-item'
		
		//percentPosition: true
	});

	the_filter();
	function the_filter(){
		$('.grid-item .grid_item_inner').css({'background':'white','border':'0px solid red'});
		if(taglist){

			var classnames_all = "."+taglist.join(",.");
			var classnames_narrow = "."+taglist.join(".");
			console.log(classnames_all);
 			$(".grid-item").hide();
			//$(classnames_narrow).show();
			


			//$(classnames_all).show();
			

			var the_type = [];
			var the_tags = [];
			//if url includes a type, exclude all other types
			if(classnames_all.toLowerCase().indexOf("type_") >= 0){
				//console.log("HAS TYPE "+classnames_all);
				for(var i in taglist){
					if(taglist[i].toLowerCase().indexOf("type_") >= 0){
						//console.log("THE TYPE "+taglist[i]);
						the_type[0] = taglist[i];
					}else{
						//console.log("THE TYPE TEST"+the_type);
						the_tags.push("."+taglist[i]);
					}
				}
				$("."+the_type).show();
				if(the_tags.length){
					$("."+the_type).not(the_tags.join(",")).hide();
					//console.log("the_tags "+the_tags.join(","));
				}
			}else{
				$(classnames_all).show();
			}
			$(classnames_narrow+" .grid_item_inner").css({'border':'3px solid red'});
			$container.masonry('layout');



		}else {
			//console.log('test');
			$(".grid-item").show();
			$container.masonry('layout');
		}
		//PROB_COLL highlight tags
		$('.obj_tag').css({'background':'transparent'});
		for(var i in taglist){
			$('.obj_tag.t_'+taglist[i]).css({'background':'red','padding': '0 5px','color':'white!important'});
			//console.log('.t_'+add_val_array[i]);
		}
	}




}
