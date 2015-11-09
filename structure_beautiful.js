function load_beautiful_coll(indexname,taglist,data,cmd,get_colors){	
	console.log(indexname+':'+taglist);
	$('.CONTENT').html('<div class="adjust_outer"><div id="visualization-box"></div><div class="visualization-key"></div></div>');
	var divwidth = $('#visualization-box').width();
	var windowheight = window.innerHeight;
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

	//create canvas
	var canvas = document.createElement('canvas');
	canvas.id = "canvaslayer";
	canvas.width = divwidth;
	canvas.height = divwidth;
	canvas.style.zIndex = 8;
	canvas.style.position = "absolute";
	canvas.style.border = "0px solid red";
	document.getElementById('visualization-box').appendChild(canvas);

	//create svg
	var svgNS = "http://www.w3.org/2000/svg"; 
	var svg_viz_micro = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg_viz_micro.setAttribute('style', 'border: 0px solid black');
	svg_viz_micro.setAttribute('width', '100%');
	svg_viz_micro.setAttribute('height', '2000px');
	svg_viz_micro.setAttribute('id', 'svg_micro');
	svg_viz_micro.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
	document.getElementById('visualization-box').appendChild(svg_viz_micro);

redraw(divwidth);

var resizeId;
$(window).resize(function() {
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 500);
});


function doneResizing(){
	divwidth = $('#visualization-box').width();
	redraw(divwidth);
}


function redraw(divwidth){	
//console.log(divwidth);	
	//get circle radius
	var entire_r = divwidth/2.5;
	var all_rel_ques=[];




	for(var i in all_obj){
		//num times referenced
		//for each unique ID, count
		var rel_ques = all_obj[i].related_questions;
		var rel_pro = all_obj[i].related_prototypes;
		var rel_peo = all_obj[i].people;
		var rel_tool = all_obj[i].related_tools;
		var rel_coll = all_obj[i].related_collections;

		for(var j in rel_ques){
		all_rel_ques.push(rel_ques[j]);
		}
		for(var j in rel_pro){
		all_rel_ques.push(rel_pro[j]);
		}		
		for(var j in rel_peo){
		all_rel_ques.push(rel_peo[j]);
		}	
		for(var j in rel_tool){
		all_rel_ques.push(rel_tool[j]);
		}
		for(var j in rel_coll){
		all_rel_ques.push(rel_coll[j]);
		}	
	}



	//count unique
	var counts = {};
	var uniquenum = [];
	var all_tags = [];
	for (var i = 0; i < all_rel_ques.length; i++) {
	    counts[all_rel_ques[i]] = 1 + (counts[all_rel_ques[i]] || 0);
	}
	
	for(var i in all_obj){
		//GET ALL UNIQUE TAGS
		var rel_tags = all_obj[i].tags;
		for(var k in rel_tags){
			all_tags.push(rel_tags[k]);
		}
		
		//match ids in both arrays and add
		all_obj[i]["counter"] = 1;
		for(var k in counts){
			if(all_obj[i].id == k){
				all_obj[i]["counter"] = counts[k];
			}
		}
	}

	//remove duplicates in tag array
	/*
	var unique_tags = [];
	$.each(all_tags, function(i, el){
	    if($.inArray(el, unique_tags) === -1) {
	    	unique_tags.push({
	    		tag:all_tags[i],
	    		ids: []
	    	});
	    }
	});
	*/

	var unique_tags = [];
	var unique_tags_test = [];
	$.each(all_tags, function(i, el){
	    if($.inArray(el, unique_tags) === -1) {
			unique_tags[all_tags[i]] = [];
	    }
	});

	//order by counter
	function customSort(a,b) {
		if ( a[sort] < b[sort] )
				return -1;
		if ( a[sort] > b[sort] )
				return 1;
		return 0;
	}
	var sort = "type";
	all_obj.sort(customSort);

	//circle radius
	//var mult = 3;
	//var entire_r = windowheight/mult;
	//$('#visualization-box').height(entire_r*mult);

	var highest_data = Math.max.apply(Math,all_obj.map(function(o){return o.counter;}));
	var lowest_data = Math.min.apply(Math,all_obj.map(function(o){return o.counter;}));

	//remap
	var low2 = entire_r*1.08;
	var low1 = lowest_data; //lowest data value
	var high2 = entire_r*1.6;
	var high1 = highest_data; //highest data value	
	//REMAPPING
	function remap(value){
		var value_remapped = low2 + (high2 - low2) * (value - low1) / (high1 - low1);
		return value_remapped;
	}

	var insidesvg = '';
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	var array_all = [];
	var centerx = divwidth/2;
	var centery = entire_r*1.35;
	var initialvar = entire_r;
	var n = 360/(all_obj.length);
	var radius = 2;
	var thickness = entire_r/55;
	var color = 'gray';

	for(var i in all_obj){
		var key = all_obj[i].id;
		var thetype = all_obj[i].type;		
		var thecount = 1;
		if(all_obj[i].counter){
			thecount = all_obj[i].counter;
		}
		var lengthvar = remap(thecount);
		if(thetype == 'person'){
			color= '#000000'; //black
		}
		else if(thetype == 'question'){
			color= '#333333'; //red
		}
		else if(thetype == 'activity'){
			color= '#666666'; //orange yellow
		}
		else if(thetype == 'prototype'){
			color= '#888888'; //royal blue
		}
		else if(thetype == 'insight'){
			color= '#aaaaaa'; //forest green
		}
		else if(thetype == 'collection'){
			color= '#bbbbbb';
		}
		else if(thetype == 'tool'){
			color= '#cccccc'; //bright green
		}
		else if(thetype == 'precedent'){
			color= '#dddddd'; //yellow
		}
		else if(thetype == 'reading'){
			color= '#eeeeee'; //hot pink
		}	
		//GET ALL REFS
		var rel_ques = all_obj[i].related_questions;
		var rel_pro = all_obj[i].related_prototypes;
		var rel_peo = all_obj[i].people;
		var rel_tool = all_obj[i].related_tools;
		var rel_coll = all_obj[i].related_collections;

		//for each unique tag, get all associated ids
		for(var k in all_obj[i].tags){
			//unique_tags[all_obj[i].tags[k]].push(all_obj[i].id);
			unique_tags[all_obj[i].tags[k]].push(all_obj[i].id+","+all_obj[i].type);
		}

		var the_tag;
		if(all_obj[i].tags){
			//the_tag = "tag_"+all_obj[i].tags.join(" tag_");
			tags_removespace =[];
			for(m in all_obj[i].tags){
				tags_removespace.push(all_obj[i].tags[m].replace(/ /g,"-"));
			}
			the_tag = "tag_"+tags_removespace.join(" tag_");
		}
		
		var plotxb = (initialvar*0.9)*Math.cos((i*n) * Math.PI/180)+centerx;
		var plotyb = (initialvar*0.9)*Math.sin((i*n) * Math.PI/180)+centery;

		var key_refs = [];
		function drawpaths(obj){
			if(obj && all_obj[i]){
				for(var k in obj){
					var refids = GetObjectKeyIndex(all_obj, obj[k]); //get index of ref objects
					if(all_obj[refids] && all_obj[refids].id && obj[k]){
						var lengthxb = (initialvar*0.9)*Math.cos((refids*n) * Math.PI/180)+centerx;
						var lengthyb = (initialvar*0.9)*Math.sin((refids*n) * Math.PI/180)+centery;
						key_refs.push(obj[k]);
						//console.log(k+"_"+obj[k]+": "+refids);

						//insidesvg += '<g class="vectorconnections '+the_tag+' hlid_'+key+' hlid_'+obj[k]+'"><path d="M'+plotxb+","+plotyb+" C"+plotxb+","+plotyb+" "+centerx+","+centery+" "+lengthxb+","+lengthyb+" "+lengthxb+","+lengthyb+'" fill="transparent" stroke="'+"black"+'" stroke-width="1"></path></g>';
						/*
						ctx.beginPath();
						ctx.moveTo(plotxb,plotyb);
						ctx.bezierCurveTo(plotxb,plotyb,centerx,centery,lengthxb,lengthyb);
						ctx.lineWidth = 1;
						ctx.strokeStyle = "black";
						ctx.globalAlpha = 0.1;
						ctx.stroke();*/
					}
				}
			}
		}

		drawpaths(rel_ques);
		drawpaths(rel_pro);
		drawpaths(rel_peo);
		drawpaths(rel_tool);
		drawpaths(rel_coll);

		array_all.push({
			key: all_obj[i].id,
			refs: key_refs,
			tags: the_tag,
			type: all_obj[i].type,
			count: thecount,
			color: color,
			plotx: plotx,
			ploty: ploty,
			lengthx: lengthx,
			lengthy: lengthy,
			initialvar: initialvar,
			lengthvar: lengthvar
		});
		




	}

function GetObjectKeyIndex(obj, keyToFind) {
    var i = 0, key;
    for (key in obj) {
        if (obj[key].id == keyToFind) {
            return i;
        }
        i++;
    }
    return null;
}

for(var i in array_all){
	var key = array_all[i].key;
	var refs = array_all[i].refs;
	//for every ref id
	for(var k in refs){
		//search for matching ref id in array_all key
		for(var m in array_all){
			if(refs[k] == array_all[m].key){
				var keysfind = array_all[m].refs;
				//add key to ref array
				array_all[m].refs.push(key)	
			}
		}
	}
}
 

//console.log(all_obj.length);

//console.log(array_all.length);
for(var i in array_all){

	var key = array_all[i].key;
	var label_text = key;//+": "+all_obj[i].tags.join(', ');
	var label_text_title = key+": "+all_obj[i].title;
	var refs = array_all[i].refs;
	var allrefs = "id_"+refs.join(" id_");
	var type = array_all[i].type;
	var count = array_all[i].count;
	var color = array_all[i].color;
	var plotx = array_all[i].plotx;
	var ploty = array_all[i].ploty;
	var lengthx = array_all[i].lengthx;
	var lengthy = array_all[i].lengthy;
	var initialvar = array_all[i].initialvar;
	var lengthvar = array_all[i].lengthvar;

	//bars/dots
	var n = 360/(array_all.length);
	var relative_l = (initialvar)-lengthvar;
	var make360 = (initialvar*0.95);
	var plotx = make360*Math.cos((i*n) * Math.PI/180)+centerx;
	var ploty = make360*Math.sin((i*n) * Math.PI/180)+centery;
	var lengthx = (lengthvar+(relative_l/5))*Math.cos((i*n) * Math.PI/180)+centerx;
	var lengthy = (lengthvar+(relative_l/5))*Math.sin((i*n) * Math.PI/180)+centery;
	
	var lengthx2 = ((lengthvar)+(relative_l/5)+10)*Math.cos((i)*n * Math.PI/180)+centerx;
	var lengthy2 = ((lengthvar)+(relative_l/5)+10)*Math.sin((i)*n * Math.PI/180)+centery;

	var the_tags = array_all[i].tags;
  
	var mark_color = "#888888";

    //back lines
    insidesvg += '<line x1="'+plotx+'" y1="'+ploty+'" x2="'+lengthx+'" y2="'+lengthy+'" stroke="#ffffff" stroke-width="'+thickness+'"></line>';


	//colored lines
    insidesvg += '<g id="gselect" class="'+'id_'+key+' '+'mainid_'+key+' type_'+type+' '+the_tags+' '+allrefs+'"><line x1="'+plotx+'" y1="'+ploty+'" x2="'+lengthx+'" y2="'+lengthy+'" stroke="'+color+'" stroke-width="'+thickness+'"></line></g>';

	//test
	insidesvg += '<circle cx="'+plotx+'" cy="'+ploty+'" r="'+1+'" fill="'+mark_color+'" />';



	var rotation = 'transform = "rotate('+((i*n)+0)+' '+(lengthx2)+' '+(lengthy2)+')"'





    insidesvg += '<g class="circletext"><text class="vizlabels id_'+key+' type_'+type+' '+'mainid_'+key+' '+the_tags+' '+allrefs+'" '+rotation+' x="'+lengthx2+'" y="'+lengthy2+'" fill="black" font-size="'+10+'">'+label_text+'</text></g>';
    //insidesvg += '<g class="circletext text_title"><text class="vizlabels id_'+key+' '+'mainid_'+key+' '+the_tags+' '+allrefs+'" '+rotation+' x="'+lengthx2+'" y="'+lengthy2+'" fill="black" font-size="'+10+'">'+label_text_title+'</text></g>';


	var m = (divwidth-(divwidth/6))/(all_obj.length); //width x
	var testx = (i*m)+((divwidth/6)/2)-(thickness); //shift to x center
	var lengthvarb = lengthvar/10;
	var testy1 = (-1*lengthvarb/2)+(centery*2.2)+(relative_l/4);
	var testy2 = (lengthvarb/2)+(centery*2.2)-(relative_l/4);
	var thickness2 = thickness-(thickness/3)

    //back lines
	insidesvg += '<line x1="'+testx+'" y1="'+testy1+'" x2="'+testx+'" y2="'+testy2+'" stroke="#ffffff" stroke-width="'+thickness2+'"></line>';

	insidesvg += '<g id="gselect" class="'+'id_'+key+' type_'+type+' '+the_tags+' '+the_tags+' '+'mainid_'+key+' '+allrefs+'"><line x1="'+testx+'" y1="'+testy1+'" x2="'+testx+'" y2="'+testy2+'" stroke="'+color+'" stroke-width="'+thickness2+'"></line></g>';
	insidesvg += '<circle cx="'+testx+'" cy="'+(centery*2.2)+'" r="'+1+'" fill="'+mark_color+'" />';

	insidesvg += '<text class="vizlabels id_'+key+' '+the_tags+' type_'+type+' '+'mainid_'+key+' '+allrefs+'" x="'+(testx-10)+'" y="'+(testy2+25)+'" transform = "translate('+0+','+0+') rotate('+90+' '+(testx-3)+' '+(testy2+25)+')" fill="black" font-size="'+10+'">'+label_text+'</text>';
 
}

	var count_color = -1;
	for(var i in unique_tags){
			var theid = unique_tags[i];
			
			var tag_name = i.replace(/ /g,"-");
			

 			
			//if(i == "2015"){

			if(theid.length > 1){
				count_color++;
				var tag_color;
				//var tag_name = get_colors[count_color].tag;
				for(var j in get_colors){
					if(tag_name == get_colors[j].tag){
						tag_color = get_colors[j].color
						//console.log(tag_name+" = "+tag_color);
					}
				}
				
				
				
				//$('.visualization-key').append('{"color":"'+tag_color+'","tag":"'+tag_name+'"},</br>');


				//"<a class='obj_tag t_tag_"+tag_removespace+"' id='#tag_"+tag_removespace+"'>"+all_obj[i].tags[m]+"</a>"
				$('.visualization-key').append('<div class="tagkey obj_tag tagkey_'+tag_name+' t_tag_'+tag_name+'" id="#tag_'+tag_name+'" style="color:'+tag_color+'">'+tag_name+'</div>');

				//console.log(tag_name);
			for (var j=0; j <= theid.length - 2; j++){
	            for (var k=j+1; k <= theid.length - 1; k++){
					

					//console.log(theid[j].split(',')[1]);

					var refids_tag1 = GetObjectKeyIndex(all_obj, theid[j].split(',')[0]); //get index of ref objects
	                var refids_tag2 = GetObjectKeyIndex(all_obj, theid[k].split(',')[0]); //get index of ref objects
	               
					var x1 = (initialvar*0.9)*Math.cos((refids_tag1*n) * Math.PI/180)+centerx;
					var y1 = (initialvar*0.9)*Math.sin((refids_tag1*n) * Math.PI/180)+centery;
					var x2 = (initialvar*0.9)*Math.cos((refids_tag2*n) * Math.PI/180)+centerx;
					var y2 = (initialvar*0.9)*Math.sin((refids_tag2*n) * Math.PI/180)+centery;



					var val_opacity = 1;

	                //console.log("x1:"+x1+",y1:"+y1+",x2:"+x2+",y2:"+y2);
					insidesvg += '<g class="vectorconnections tag_'+tag_name+' type_'+theid[j].split(',')[1]+' type_'+theid[k].split(',')[1]+'"><path d="M'+x1+","+y1+" C"+x1+","+y1+" "+centerx+","+centery+" "+x2+","+y2+" "+x2+","+y2+'" fill="transparent" stroke="'+tag_color+'" stroke-width="0.8" stroke-opacity="'+val_opacity+'"></path></g>';
					
	   
					ctx.beginPath();
					ctx.moveTo(x1,y1);
					ctx.bezierCurveTo(x1,y1,centerx,centery,x2,y2);
					ctx.lineWidth = 1;
					ctx.strokeStyle = tag_color;
					ctx.globalAlpha = 0.5;
					ctx.stroke();

	            }
	        }
	        }else{
	        }
			
	}
	//console.log(unique_tags);
	$('.visualization-key').append('<div class="tagkey tagkey_">'+'no connections'+'</div>');

	$('#svg_micro').html(insidesvg);

	//EVENTS
	var stroke = [];
	$('.CONTENT').on('mouseover', '#gselect', function() {
	/*	
		var d = $(this).attr('class');
		var idfirst = "."+d.split(" ")[0];
	    var id = "."+d.split(" ").join(",.");
		//var id = "."+d;
		var id2 = ".hl"+d.split(" ")[0];
		var color = $(this).find('line').attr('stroke');
		stroke[0] = color;
	
	   	//connections
		$('#canvaslayer').stop().css({'opacity':'0.1'});
		$('g').find('path').attr({'display':'none','visibility':'visible'});
	   	$(id2).find('path').attr({'display':'block'});

	   	//bars
	   	$('g').find('line').attr({'opacity':'0.01'});
	   	$(idfirst).find('line').attr({'opacity':'1'});
	   	$('g').find('circle').attr({'opacity':'0.01'});
	   	$(idfirst).find('circle').attr({'opacity':'1'});

	   	//text
	   	$('.vizlabels').stop().hide();
	   	$('text'+idfirst).stop().show();*/
	})


var key_tags = [];




	$('.CONTENT').on('mouseover', '#gselect', function() {
		var d_tags = $(this).attr('class').split(' ');
		var d_id = d_tags[0];
	$('#canvaslayer').stop().css({'opacity':'0.1'});
	$('g').find('path').attr({'display':'none','visibility':'visible'});
	$('g').find('line').attr({'opacity':'0'});
	$('.vizlabels').stop().hide();
	$(".tagkey").hide();
		for(var i in d_tags){
			var strip = d_tags[i].replace('tag_','');
			if(d_tags[i].toLowerCase().indexOf("tag_") >= 0){
				//var classes = "."+d_tags[i]+", ."+d_id;
				$("."+d_tags[i]).find('path').attr({'display':'block'});
				$("."+d_tags[i]).find('line').attr({'opacity':'1','cursor':'pointer'});
				$("."+d_tags[i]).stop().show();

	   	
				$(".tagkey_"+strip).show();

			}
		}

	})
	$('.CONTENT').on('mouseout', '#gselect', function() {
			if(taglist.length){
		console.log("there are filters");
		the_filter();
		//$('.visualization-key').html(key_tags.join('</br>'));
	}else{
		console.log("there are NO filters");
		no_filter();
		//$('.visualization-key').html(key_tags.join('none'));
	}
	})




	for(var i in taglist){
	   	var strip = taglist[i].replace('tag_','');
	   	key_tags.push(strip);
	}


	if(taglist.length){
		//console.log("there are filters");
		the_filter();
		//$('.visualization-key').html(key_tags.join('</br>'));
	}else{
		//console.log("there are NO filters");
		no_filter();
		//$('.visualization-key').html(key_tags.join('none'));
	}


function the_filter(){
	$('#canvaslayer').stop().css({'opacity':'0.1'});
	$('g').find('path').attr({'display':'none','visibility':'visible'});
	$('g').find('line').attr({'opacity':'0'});
	$('.vizlabels').stop().hide();
	$(".tagkey").hide();
	var the_type = [];
	var the_tags = [];
	for(var i in taglist){

		
		//if there is type filter, apply
		if(taglist[i].toLowerCase().indexOf("type_") >= 0){
			//$('.'+taglist[i]).find('line').attr({'stroke':'red'});
			//$('.'+taglist[i]).find('path').attr({'display':'block'});
			the_type[0] = taglist[i];
		}else{
			//$("."+taglist[i]).find('path').attr({'display':'block'});
			the_tags.push("."+taglist[i]);
		}

		
		$("."+taglist[i]).find('line').attr({'opacity':'1'});
	   	$("."+taglist[i]).stop().show();
	   	$(".tagkey_"+taglist[i]).stop().show();

	   	var strip = taglist[i].replace('tag_','');
		$(".tagkey_"+strip).show();

	}

	if(the_type.length > 0){	
		console.log("NONONNNNNNNNNN");
		for(var i in the_tags){
			$('.'+the_type[0]+the_tags[i]).find('path').attr({'display':'block'});
		}
	}else{
		//for(var i in the_tags){
		$(the_tags.join(',')).find('path').attr({'display':'block'});
		//}
	}
}
function no_filter(){
	$('#canvaslayer').stop().css({'opacity':'1'});
}






}

}

