$(document).ready(function() {
$.getJSON( "data2.json", function( data ) {
	var counter = 0;
	var current_homepage = [];
	var get_colors = [
		{"color":"#CBBBAE","tag":"2015"},
		{"color":"#EB0F46","tag":"materiality"},
		{"color":"#85F5CA","tag":"pigments"},
		{"color":"#C369CD","tag":"media"},
		{"color":"#95A619","tag":"surrogates"},
		{"color":"#1E1474","tag":"metadata"},
		{"color":"#441C4D","tag":"data"},
		{"color":"#2809C7","tag":"art-study-center"},
		{"color":"#A9DBD5","tag":"sculpture"},
		{"color":"#2D8E35","tag":"art-objects"},
		{"color":"#10BCA6","tag":"museums"},
		{"color":"#42F9CF","tag":"conservation"},
		{"color":"#15993E","tag":"ephemerality"},
		{"color":"#50ED0A","tag":"rothko"},
		{"color":"#56400C","tag":"curation"},
		{"color":"#281E03","tag":"collections"},
		{"color":"#F9AF6C","tag":"database"},
		{"color":"#93C217","tag":"broader-context"},
		{"color":"#267C9C","tag":"lightning-talk"},
		{"color":"#6C1050","tag":"art-history"},
		{"color":"#1724E6","tag":"visualization"},
		{"color":"#695CDF","tag":"Seb-Chan"},
		{"color":"#3BF850","tag":"engagement"},
		{"color":"#45FBF7","tag":"usership"},
		{"color":"#DC3B82","tag":"accessibility"},
		{"color":"#0F4CFD","tag":"Yanni-Loukissass"},
		{"color":"#62C3BD","tag":"Jon-Frey"}
	];
	//ARRAYS///////////////////////////////////////////////////////////////////////////////////////////////////////////
	var arr_homepages = [
		'index_problem_collection',
		'index_invisible_visible',
		'index_beautiful_data'
		];
	var arr_questions = [
		'What are problem collections?',
		'How do we make the invisible visible?',
		'What are beautiful data?'
		];	
	
	//EVENT TRIGGERS//////////////////////////////////////////////////////////////////////////////////////////////////
	checkhask();

	$(window).on('hashchange', function() {checkhask()});

	$('.shift_forw').on('click', function() {
		index_rotate(1)
	});
	$('.shift_back').on('click', function() {
		index_rotate(-1)
	});

	//INDEX ROTATION/////////////////////////////////////////////////////////////////////////////////////////////////
	function index_rotate(count){
		//check current current hompage
		var url_val = window.location.hash;
		var url_array;
		var nextprev_homepage;
		var current_index = 0;
		var next_index = 1;
		var current = arr_homepages[current_index];
		//if no hashtag, assume prob_coll
		if(url_val.length > 0){
		//if hashtag, get value of current and tags
			url_array = url_val.split("&");//.join("");
			for(var i in url_array){
				if(url_array[i].indexOf("#index_") > -1){
					//remove current index
					current = url_array[i];
    				url_array.splice(i, 1);
				}
			}
		}
		current_index = arr_homepages.indexOf(current.replace("#",""));
		//get next/prev hompage:
		if((current_index+count) >= arr_homepages.length){
			nextprev_homepage = arr_homepages[0];
		}
		else if((current_index+count) < 0){
			nextprev_homepage = arr_homepages[arr_homepages.length-1];
		}
		else{
			nextprev_homepage = arr_homepages[current_index+count]
		}
		//add next/prev to array
		var new_url = "#"+nextprev_homepage;
		if(url_array && url_array.length > 0){
			new_url = new_url+"&"+url_array.join("&");
		}
		//update url
		window.location = new_url;
	}



	//UPDATE CONTENT/////////////////////////////////////////////////////////////////////////////////////////////////
	function load_index(indexname,tags,cmd){
		//update question
		var arr_homindex = arr_homepages.indexOf(indexname);
		$(".shift_question").html(arr_questions[arr_homindex]);
			//fill main filter selections
			if(indexname == "index_invisible_visible"){
				load_visible_coll(indexname,tags,data,cmd,get_colors);
			}
			else if(indexname == "index_beautiful_data"){
				load_beautiful_coll(indexname,tags,data,cmd,get_colors)
			}else{
				load_prob_coll(indexname,tags,data,cmd,get_colors);
			}

	};


var type_activity = '<span class="test"><a class="obj_type t_type_activity" id="#type_activity">:ACTIVITIES</a></span> ';
var type_insights = '<span class="test"><a class="obj_type t_type_insight" id="#type_insight">:INSIGHTS</a></span> ';
var type_collections = '<span class="test"><a class="obj_type t_type_collection" id="#type_collection">:COLLECTIONS</a></span> ';
var type_people = '<span class="test"><a class="obj_type t_type_person" id="#type_person">:PEOPLE</a></span> ';
var type_tools = '<span class="test"><a class="obj_type t_type_tool" id="#type_tool">:TOOLS</a></span> ';
var type_questions = '<span class="test"><a class="obj_type t_type_question" id="#type_question">:QUESTIONS</a></span> ';
var type_prototypes = '<span class="test"><a class="obj_type t_type_prototype" id="#type_prototype">:PROTOTYPES</a></span> ';
var type_precedents = '<span class="test"><a class="obj_type t_type_precedent" id="#type_precedent">:PRECEDENTS</a></span>';


$('.QUESTION .types').html(type_activity+type_insights+type_collections+type_people+type_tools+type_questions+type_prototypes+type_precedents);




	///CHECK URL HASHTAG AND TAGS////////////////////////////////////////////////////////////////////////////////////
	function checkhask(){

		//check url hash
		var url_val = window.location.hash;
		//url to array
		var current = arr_homepages[0];
		var tags = "";

		function checkforchange(oldpage,newpage,thetags){
			//if(oldpage){
				//console.log("current: "+oldpage);
				if(oldpage == newpage){
					//if index doesn't change, UPDATE content
					console.log("INDEX UPDATE");
					load_index(newpage,thetags,"cmd_update");
				}else{
					//if index changes, LOAD new content
					console.log("INDEX LOAD");
					load_index(newpage,thetags,"cmd_load");
				}
			//}
			current_homepage[0] = current;
		}
	
		//if url hash, get homepage
		if(url_val.length > 0){
			var url_array = url_val.split("&");
			//if tags get current and tags
			if(url_array.length > 1){
				for(var i in url_array){
					if(url_array[i].indexOf("#index_") > -1){
						//remove current index
						current = url_array[i].replace('#','');
	    				url_array.splice(i, 1);
					}
					if(url_array[i].indexOf("type_") >= 0) {
						$('.obj_type').css({'color':'black'});
						$('.QUESTION .t_'+url_array[i]).css({'color':'red'});
					}
						


				}
				tags = url_array;				
			}else{
			//if no tags
				current = url_array[0].replace('#','');
			}
		}
		checkforchange(current_homepage[0],current,tags);
		//load_index(current,tags);

		

	}

	//EVENTS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	clickaway();
	function clickaway(){
	$('.QUESTION,.CONTENT').on('click', '.obj_tag,.obj_type', function() {
		//console.log('CLIIIIIIICKED');
		//get hash value
		var tag_val = $(this).attr('id').replace("#","");
		var url_val = window.location.hash;
		var arr_url_val = url_val.split("&");
		arr_url_val.splice(0,1);
		//check if tag exists in urls

		if (arr_url_val.indexOf(tag_val) > -1) {
			//console.log("exists, delete");
			arr_url_val.splice(arr_url_val.indexOf(tag_val), 1);
		}
		else {
			//if tag/type doesn't exist, check if clicked is type
			if (tag_val.indexOf("type_") > -1) {
				console.log("!!!!!tag_val is a type:"+tag_val);
				//if clicked is type, check if another type exists
				for(var i in arr_url_val){
					if (arr_url_val[i].indexOf("type_") >= 0) {
						//if another type exists, replace type
						arr_url_val.splice(i, 1);		
					}
				}
			}
			arr_url_val.push(tag_val);
		}
		var updated_tags = [];
		for(var i in arr_url_val){
			var uptag = "&"+arr_url_val[i];
			updated_tags.push(uptag);
		}
		//new url
		var newurl = "#"+current_homepage[0]+updated_tags.join("");
	
		//go to new ul
		window.location = newurl;

	});
	}
	



});
});

