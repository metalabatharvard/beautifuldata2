function load_visible_coll(indexname,taglist,data,cmd,get_colors){		
	console.log(indexname+':'+taglist);
	$('.CONTENT').html('<div class="adjust_outer"><div id="json-grid"></div><div id="svg_connections"></div><div id="svg_connections2"></div></div>');


	//for each group:

	var all_types = Object.keys(data);
	$('#json-grid').html('<div class="gutter-sizer"></div>');
	for(var i in all_types){
		//make query array		
		//populate JSON html
		var all_objintypes = data[all_types[i]];
		var insert_A ='';
		for(k in all_objintypes){
			var b_obj = all_objintypes[k];
			var c_name = Object.keys(b_obj);
	
			var insert_B = '';
			var insert_B2 = '';
			var arraytest = [];
			var arraytest2 = [];
			for(var m in c_name){
				var c_content = b_obj[c_name[m]];
				//if array
				if(c_content instanceof Array){
					var tag_arr = [];
					var c_content_arr = []
					for(var n in c_content){
						//if link
						if(c_content[n] && c_content[n].length && c_content[n].indexOf('http') > -1){
							c_content_arr.push('<a class="visible_color_1 s_'+c_name[m]+'" href="'+c_content[n]+'">"'+c_content[n]+'"</a>');
						}
						else if(c_name[m] == 'tags'){
							c_content_arr.push('<span class="visible_color_1 obj_tag tag_'+c_content[n].replace(/ /g,"-")+'" id="tag_'+c_content[n].replace(/ /g,"-")+'">"'+c_content[n]+'"</span>');
							tag_arr.push('tag_'+c_content[n].replace(/ /g,"-")); 
						}						
						else{
							if(c_content[n] === parseInt(c_content[n], 10) || c_content[n] === null){
								c_content_arr.push('<span class="visible_color_2">'+c_content[n]+'</span>');
							}else{
								c_content_arr.push('<span class="visible_color_1">"'+c_content[n]+'"</span>');
							}
						}
					}
					var tag_arr_join = tag_arr.join(' ');
					if(c_content[n] && c_content[n].length && c_content[n].indexOf('http') > -1){
					arraytest.push('<div>'+c_name[m]+': [<div class="visible_shift">'+c_content_arr.join(', ')+'</div>],</div>');
					}else{
					arraytest.push('<div>'+c_name[m]+': ['+c_content_arr.join(', ')+'],</div>');	
					}
					arraytest2.push('<span class="'+tag_arr_join+'" id="'+tag_arr_join+'">'+c_name[m]+'</span>');
				//if not array
				}else{
					if(c_content && c_content.length && c_content.indexOf('http') > -1){
						arraytest.push('<div>'+c_name[m]+': <a class="visible_color_1 class="s_'+c_name[m]+'" href="'+c_content+'">"'+c_content+'"</a>,</div>');
					}
					else if(c_name[m] == 'tags'){
						arraytest.push('<div>'+c_name[m]+': <span class="visible_color_1 obj_tag tag_'+c_content.replace(/ /g,"-")+'" id="tag_'+c_content.replace(/ /g,"-")+'">"'+c_content+'"</span>,</div>');
					}	
					else{
						if(c_content === parseInt(c_content, 10) || c_content === null){
							//c_content_arr.push('<span class="visible_color_2">'+c_content[n]+'</span>');
							arraytest.push('<div>'+c_name[m]+': <span class="visible_color_2">'+c_content+'</span>,</div>');
						}else{
							//c_content_arr.push('<span class="visible_color_1">"'+c_content[n]+'"</span>');
							arraytest.push('<div>'+c_name[m]+': <span class="visible_color_1">"'+c_content+'"</span>,</div>');
						}
						
					}
					arraytest2.push('<span class="obj_tag tag_'+c_content+'" id="tag_'+c_content+'">"'+c_name[m]+'"</span>');
				}
				
			}
			insert_B = arraytest.join('');
			insert_B2 = arraytest2.join(', ');
			insert_A += '<div class="divc c_'+k+' grid-json-item type_'+all_objintypes[k].type+'"><div class="visible_cover1">{</div><div class="divc2">'+insert_B+'</div><div class="visible_cover1">},</div></div>';
			//insert_A += '<div class="divc c_'+k+'">{'+insert_B2+'},</div>';
		}
		//insert_A += '<span class="divc2">object object</span>';
		//create a divs
	/*	if(i >= 0 && i < 5){
			console.log(all_types[i]+" a");
			$('#json-grida').append('<span class="diva a_'+all_types[i]+'">"'+all_types[i]+'": [<span class="divb b_'+all_types[i]+'">'+insert_A+'],</span></span></br>');
		}
		else{
			console.log(all_types[i]+" b");
			$('#json-gridb').append('<span class="diva a_'+all_types[i]+'">"'+all_types[i]+'": [<span class="divb b_'+all_types[i]+'">'+insert_A+'],</span></span></br>');

		}*/


		$('#json-grid').append('<span class="visible_cover2 diva type_'+all_types[i]+'">"'+all_types[i]+'": [<span class="divb b_'+all_types[i]+'">'+insert_A+'],</span></span></br>');
	}



	var svg_viz_micro2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg_viz_micro2.setAttribute('style', 'border: 0px solid black');
	svg_viz_micro2.setAttribute('width', '100%');
	svg_viz_micro2.setAttribute('height', '100%');
	svg_viz_micro2.setAttribute('id', 'svg_micro');
	svg_viz_micro2.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
	document.getElementById('svg_connections2').appendChild(svg_viz_micro2);	

	var svgNS = "http://www.w3.org/2000/svg"; 
	var svg_viz_micro = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg_viz_micro.setAttribute('style', 'border: 0px solid black');
	svg_viz_micro.setAttribute('width', '100%');
	svg_viz_micro.setAttribute('height', '100%');
	svg_viz_micro.setAttribute('id', 'svg_micro');
	svg_viz_micro.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
	document.getElementById('svg_connections').appendChild(svg_viz_micro);


	function getRandomColor() {
	    var letters = '0123456789ABCDEF'.split('');
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	}

redraw();

var resizeId;
$(window).resize(function() {
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 500);
});


function doneResizing(){
	divwidth = $('#visualization-box').width();
	$("svg").empty();
	redraw();
}
/*
	var $container = $('#json-grid');
	$container.masonry({
		itemSelector: '.grid-json-item',
		columnWidth: '.gutter-sizer'
		//percentPosition: true
	});*/

function redraw(){
	var count_color = -1;
var color_storage = [];
	//GET TAGS
	for(var i in taglist){
		/*if(color_storage.length < taglist.length){
		color_storage.push(getRandomColor());
		}
		var color = get_colors[i];*/
		count_color++;
		var tag_color;
		
		for(var j in get_colors){
			if(taglist[i].replace('tag_','') == get_colors[j].tag){
				tag_color = get_colors[j].color
				//console.log(taglist[i]+" = "+tag_color);
			}
		}


		trigger_highlight(taglist[i],tag_color);
		//console.log(color);
	}
	
	if(taglist){

		var classnames_all = "."+taglist.join(",.");
		var classnames_narrow = "."+taglist.join(".");
		console.log(classnames_all);
 		//$(".grid-item").hide();

	/*	var the_type = [];
		var the_tags = [];
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
			$(".grid-json-item").hide();
			$(".grid-json-item."+the_type[0]).show();
			console.log(the_type[0]);
		}*/

 	}

//RED = al match
//BLACK = some match


	function trigger_highlight(class_name,color){
		if(class_name.toLowerCase().indexOf("type_") < 0){

        var coords = []
        $('.'+class_name).each(function(i,obj) {
            var positionleft = $(this).position().left//+($(this).width()/2);
            var positiontop = $(this).position().top//+($(this).height()/2);
            coords.push({x:positionleft,y:positiontop});
        });

        coords.sort(function(a, b) {
		    return parseFloat(a.y) - parseFloat(b.y);
		});
        
        

        
        //$('.elem_click').css({'background':'transparent'});
        $('#json-grid .'+class_name).css({'background':color});
       // $('.elem_click').parent().parent().css( "opacity", "0.3" );
        $('.'+class_name).parent().parent().css( "opacity", "1" );
		for (var j=0; j <= coords.length - 2; j++){
            for (var k=j+1; k <= coords.length - 1; k++){
                var x1=coords[j].x;
                var y1=coords[j].y;
                var x2=coords[k].x;
                var y2=coords[k].y;

                //console.log("x1:"+x1+",y1:"+y1+",x2:"+x2+",y2:"+y2);

                draw_lines(x1,y1,x2,y2,color,1,1,'0,0');
                //draw_points(x1,y1,50,"transparent","red",1,1);
                //draw_points(x2,y2,50,"transparent","red",1,1);
            }
        }
    }
    }

	draw_marklines();
	function draw_marklines(){

       /* var coords = []
        $('.'+visible_cover2).each(function(i,obj) {
            var positionleft = $(this).position().left//+($(this).width()/2);
            var positiontop = $(this).position().top//+($(this).height()/2);
            coords.push({x:positionleft,y:positiontop});
        });

        coords.sort(function(a, b) {
		    return parseFloat(a.y) - parseFloat(b.y);
		});
*/
		var mark_pos_left1 = $('.visible_cover1').position().left+5;
		var mark_pos_top1 = $('.visible_cover1').position().top;
		var mark_pos_left2 = $('.visible_cover2').position().left+5;
		var mark_pos_top2 = $('.visible_cover2').position().top;
		console.log(mark_pos_left1);
		draw_lines2(mark_pos_left1,mark_pos_top1,mark_pos_left1,200000,"#767676",1,1,'1,2');
 		draw_lines2(mark_pos_left2,mark_pos_top2,mark_pos_left2,200000,"#767676",1,1,'1,2');
	}
 

	function draw_lines(val_x1,val_y1,val_x2,val_y2,stroke_color,stroke_weight,opacity,dash){
	    var draw_line = document.createElementNS(svgNS,'line');
	    draw_line.setAttribute('x1',val_x1);
	    draw_line.setAttribute('y1',val_y1);
	    draw_line.setAttribute('x2',val_x2);
	    draw_line.setAttribute('y2',val_y2);
	    //draw_line.setAttribute('id', 'id_you_like');
	    draw_line.setAttribute('stroke',stroke_color);
	    draw_line.setAttribute('stroke-width',stroke_weight);
		draw_line.setAttribute('stroke-opacity',opacity);
		draw_line.setAttribute('stroke-dasharray',dash);
		svg_viz_micro.appendChild(draw_line);
	}
	function draw_lines2(val_x1,val_y1,val_x2,val_y2,stroke_color,stroke_weight,opacity,dash){
	    var draw_line = document.createElementNS(svgNS,'line');
	    draw_line.setAttribute('x1',val_x1);
	    draw_line.setAttribute('y1',val_y1);
	    draw_line.setAttribute('x2',val_x2);
	    draw_line.setAttribute('y2',val_y2);
	    //draw_line.setAttribute('id', 'id_you_like');
	    draw_line.setAttribute('stroke',stroke_color);
	    draw_line.setAttribute('stroke-width',stroke_weight);
		draw_line.setAttribute('stroke-opacity',opacity);
		draw_line.setAttribute('stroke-dasharray',dash);
		svg_viz_micro2.appendChild(draw_line);
	}
    function draw_points(val_x1,val_y1,radius,fill_color,stroke_color,stroke_weight,opacity){
	    var draw_point = document.createElementNS(svgNS,'circle');
	    draw_point.setAttribute('cx',val_x1);
	    draw_point.setAttribute('cy',val_y1);
	    draw_point.setAttribute('r',radius);
	    draw_point.setAttribute('fill',fill_color);
	    draw_point.setAttribute('stroke',stroke_color);
	    draw_point.setAttribute('stroke-opacity',opacity);
	    svg_viz_micro.appendChild(draw_point);
    }

}


}


