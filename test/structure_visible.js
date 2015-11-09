//$(document).ready(function() {

function load_visible_coll(){		
	console.log("LOADED: structure_visible");
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
	




	//for each group:
	var all_types = Object.keys(data);
	for(var i in all_types){
		//make query array
		var typename = all_types[i];
		if(typename == 'people'){typename = 'person';}
		else if(typename == 'activities'){typename = 'activity';}
		else{typename = typename.substring(0, typename.length - 1)};
		$('.grid-filter').append('<option value="a_'+typename+'">:related '+all_types[i]+'</option>');

		
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
							c_content_arr.push('<a  class="s_'+c_name[m]+'" href="'+c_content[n]+'">'+c_content[n]+'</a>');
						}
						else if(c_name[m] == 'tags'){
							c_content_arr.push('<span class="elem_click tag_'+c_content[n].replace(/ /g,"-")+'" id="tag_'+c_content[n].replace(/ /g,"-")+'">'+c_content[n]+'</span>');
							tag_arr.push('tag_'+c_content[n].replace(/ /g,"-")); 
						}						
						else{
							c_content_arr.push(c_content[n]);
						}
					}
					var tag_arr_join = tag_arr.join(' ');
					arraytest.push('<div>'+c_name[m]+': ['+c_content_arr.join(', ')+'],</div>');
					arraytest2.push('<span class="'+tag_arr_join+'" id="'+tag_arr_join+'">'+c_name[m]+'</span>');
				//if not array
				}else{
					if(c_content && c_content.length && c_content.indexOf('http') > -1){
						arraytest.push('<div>'+c_name[m]+': <a  class="s_'+c_name[m]+'" href="'+c_content+'">'+c_content+'</a>,</div>');
					}
					else if(c_name[m] == 'tags'){
						arraytest.push('<div>'+c_name[m]+': <span class="elem_click tag_'+c_content.replace(/ /g,"-")+'" id="tag_'+c_content.replace(/ /g,"-")+'">'+c_content+'</span>,</div>');
					}	
					else{
						arraytest.push('<div>'+c_name[m]+': '+c_content+',</div>');
					}
					arraytest2.push('<span class="elem_click tag_'+c_content+'" id="tag_'+c_content+'">'+c_name[m]+'</span>');
				}
				
			}
			insert_B = arraytest.join('');
			insert_B2 = arraytest2.join(', ');
			insert_A += '<div class="divc c_'+k+'">{'+insert_B+'},</div>';
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

		$('#json-grid').append('<span class="diva a_'+all_types[i]+'">"'+all_types[i]+'": [<span class="divb b_'+all_types[i]+'">'+insert_A+'],</span></span></br>');

		

		
	}

	
//$('.elem_click').css({'background':'red','font-weight':'bold'});

	$('.elem_click').on('click', function() {
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

	var color_storage = [];

	function trigger_highlight(class_name,color){

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
        $('.'+class_name).css({'background':color});
       // $('.elem_click').parent().parent().css( "opacity", "0.3" );
        $('.'+class_name).parent().parent().css( "opacity", "1" );
		for (var j=0; j <= coords.length - 2; j++){
            for (var k=j+1; k <= coords.length - 1; k++){
                var x1=coords[j].x;
                var y1=coords[j].y;
                var x2=coords[k].x;
                var y2=coords[k].y;

               // console.log("x1:"+x1+",y1:"+y1+",x2:"+x2+",y2:"+y2);

                draw_lines(x1,y1,x2,y2,color,1,0.5);
                //draw_points(x1,y1,50,"transparent","red",1,1);
                //draw_points(x2,y2,50,"transparent","red",1,1);
            }
        }
    }


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

	//draw datebegin & dateend


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
	
	$('.elem_click').css({'background':'transparent'});
	$('.elem_click').parent().parent().css( "opacity", "0.5" );
	svg_viz_micro.innerHTML = "";
	for(var i in hashs){
		if(color_storage.length < hashs.length){
		color_storage.push(getRandomColor());
		}
		var color = color_storage[i];
		group_class.push("." + hashs[i]);
		trigger_highlight(hashs[i],color);
	}
	group_class = group_class.join("");
	
	
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



});
}


//});

