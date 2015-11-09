$(document).ready(function() {
$.getJSON( "data2.json", function( data ) {

	///GLOBAL START////////////////////////////////////////////////////////////////////////////////////
	//var all_rand_ids = [];
	
	$('.shift_question').html('How can we make the invisibile visible?');
	$('.grid-filter').append('<option value="">:query</option>');

	var svgNS = "http://www.w3.org/2000/svg"; 
	var svg_viz_micro = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg_viz_micro.setAttribute('style', 'border: 0px solid black');
	svg_viz_micro.setAttribute('width', '100%');
	svg_viz_micro.setAttribute('height', '100%');
	svg_viz_micro.setAttribute('id', 'svg_micro');
	svg_viz_micro.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
	document.getElementById('svg_connections').appendChild(svg_viz_micro);
	

/*
	function draw_lines(val_x1,val_y1,val_x2,val_y2,stroke_color,stroke_weight,opacity){
	    var draw_line = document.createElementNS(svgNS,'line');
	    draw_line.setAttribute('x1',val_x1);
	    draw_line.setAttribute('y1',val_y1);
	    draw_line.setAttribute('x2',val_x2);
	    draw_line.setAttribute('y2',val_y2);
	    //draw_line.setAttribute('id', 'id_you_like');
	    draw_line.style.id = 'id_you_like2';
	    draw_line.setAttribute('stroke',stroke_color);
	    draw_line.setAttribute('stroke-width',stroke_weight);
		draw_line.setAttribute('stroke-opacity',opacity);
		svg_viz_micro.appendChild(draw_line);
	}
	//draw datebegin & dateend
	draw_lines(0,0,100,1000,"blue",1,1);
*/

	//for each group:
	var all_types = Object.keys(data);
	for(var i in all_types){
		//make query array
		var typename = all_types[i];
		if(typename == 'people'){typename = 'person';}
		else if(typename == 'activities'){typename = 'activity';}
		else{typename = typename.substring(0, typename.length - 1)};
		$('.grid-filter').append('<option value="a_'+typename+'">:related '+all_types[i]+'</option>');

		//create a divs
		$('#json-grid').append('<div class="diva a_'+all_types[i]+'">"'+all_types[i]+'": [<div class="divb b_'+all_types[i]+'"></div>]</div>');


		var all_objintypes = data[all_types[i]];

		for(k in all_objintypes){
			var b_obj = all_objintypes[k];
			var c_name = Object.keys(b_obj);
			//create b divs
			$('.b_'+all_types[i]).append('{<div class="divc c_'+k+'"></div>},</br>');
			var array = 'test';
			//for(var m in c_name){
				var c_content = b_obj[c_name];
				var count_keys = 0;
				for(var m in c_name){
					count_keys++
					console.log(c_name[]);
				}
				//console.log(c_name.length);
				
				$('.c_'+k).append('<div class="testtest"><div class="divd c_'+c_name+'">"'+c_name+'":<span>'+b_obj+'</span></div></div>');
			
				//create d divs

				/*if(c_content instanceof Array){
					var c_content_arr = []
					for(var n in c_content){
						//if link
						if(c_content[n] && c_content[n].length && c_content[n].indexOf('http') > -1){
							c_content_arr.push('<a href="'+c_content[n]+'">'+c_content[n]+'</a>');
						}
						else if(c_name[m] == 'tags'){
							c_content_arr.push('<span class="tag_'+c_content[n]+'">'+c_content[n]+'</span>');
						}						
						else{
							c_content_arr.push(c_content[n]);
						}
					}
					array = '['+c_content_arr.join(', ')+']';
				}else{
					if(c_content && c_content.length && c_content.indexOf('http') > -1){
						array = '<a href="'+c_content+'">'+c_content+'</a>';
					}
					else if(c_name[m] == 'tags'){
						c_content_arr.push('<span class="tag_'+c_content+'">'+c_content+'</span>');
					}	
					else{
						array = c_content;
					}
					

				}*/
				//array = c_content;

			//	$('.c_'+k).append('<div class="testtest"><div class="divd c_'+c_name[m]+'">"'+c_name[m]+'":<span>'+array+'</span></div></div>');

				
		//	}
		
			
			
		}
		
		

	}
//console.log(data);
$('.tag_museums').css({'background':'red'});
	



});



});

