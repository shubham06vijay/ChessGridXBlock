/* library for Grid Creation */
		/*description number of rows*/
		var r=8
		
		/*description number of columns*/
		var c=8;
		
		/*Loop Variable*/
		var a=0;

		/*id of the grid block selected by user*/
		var lastid;
		
		/*JavaScript Dictionary to store all attributes of grid saved.*/
		var dict={};  
		
		/*JavaScript Dictionary to store all attributes of grid which has to be displayed.*/
		var save_grid={};  
		
		
		
		var temp1,temp2,temp3;
		/*description height of grid block*/
	    var h;
		var ques,ans,element;

/* {element} ele - xblock element.*/  
		function xblockElement(ele)
		{
			element=ele;
		}
	
/*
  Used to display a saved grid
  function setData
  save_grid - Dictionary to display a grid.
 */  
		function setData(save_grid)
		{		
		
						var j;
					    for(j=0;j<64;j++)
						{
								
								key = "#g"+j;
								var key1 = "g"+j+"_"+"type";
								var key2 = "g"+j+"_"+"style";
								var key3 = "g"+j+"_"+"readonly";
								var key4 = "g"+j+"_"+"src";
								var key5 = "g"+j+"_"+"value";
                                var key6 = "s"+j;
								var key7 = "g"+j+"_"+"src";
								
								var ele=$(element).find(key);

								if(save_grid[key1])
										ele.attr("type",save_grid[key1]);

								if(save_grid[key2])
										ele.attr("style",save_grid[key2]);


								if(save_grid[key4])
								{	
										ele.attr("src",save_grid[key4]);
								}	
								if(save_grid[key5])
								{       ele.attr("value",save_grid[key5]);
								}
								
                                if(save_grid[key6])
								{       $(element).find("#s"+j).get(0).innerHTML=save_grid[key6];
							            console.log(save_grid[key6]);
								}
								

								
						}  

		}

 /*
	Represents function to store grid data in a JavaScript Object.
	function getData
	returns {Object} dict
 */  
		function getData()
		{
			var i,j; var dict={};
			var n=0;
			var cell ;

			for(n=0;n<64;n++)
			{
				cell=$(element).find("#g"+n).get(0); 
				for (i = 0; i < cell.attributes.length; i++) 
				{
					dict["g" + n +"_"+cell.attributes[i].name] = cell.attributes[i].value;
				}
					dict["g"+n+"_id"]="g"+n;
					dict["g" + n +"_"+"value"] = cell.value;
					dict["g"+n+"_"+"readonly"] = true; 
					dict["s"+n]=$(element).find("#s"+n).get(0).innerHTML;
					console.log($(element).find("#s"+n).get(0).innerHTML);
			}
			return dict;
					
		}	

/**
  Represents a function to create a grid with specified rows and columns.
  function createGrid
  {Number} r - Number of Rows
  {Number} c - Number of Columns
 */  
		function createGrid(r,c)
		{
		
			console.log(r);console.log(c);	
			var x = document.createElement("TABLE");
			x.setAttribute("id", "myTable");		
			x.className = 'grid';

			var d=document.getElementById("home");
			var e=document.getElementById("emp");
			
			$(element).find("#hello").get(0).appendChild(x); 
		
			var i,j;
			a=0;
			for(i=0;i<r;i++)
			{	
				var y = document.createElement("TR");
				x.appendChild(y);
				for(j=0;j<c;j++)
				{	
					var z = document.createElement("TD");
					var inp = document.createElement("INPUT");
					inp.type = "text";
					inp.setAttribute("id","g"+a);
					
						
					inp.setAttribute("class","white");
					
					inp.onfocus=function()		
										{

												this.blur();

                                        }
						
					inp.onclick = function()
										   {
													temp3=temp2;
													temp2=temp1;
													lastid = this.getAttribute('id');
													temp1=lastid;  console.log(lastid);
											}
                    inp.ondblclick = function()
                                            {
                                                    if(temp3!=lastid){
                                                    var elem1=$(element).find("#"+temp3);
                                                    var elem2=$(element).find("#"+lastid);
                                                    if(elem1.attr("value")!=""){

																		elem2.attr("value",elem1.attr("value"));
																		elem1.attr("value","");
																				}
																	}
											} 
					
					z.appendChild(inp);	
					var span1=document.createElement("SPAN");
					span1.setAttribute("id","s"+a);
					z.appendChild(span1);
					a++;
					y.appendChild(z);
				}
				 
			}
			
			
		}

	
	
/*
  Represents a button to set Image.
  function setImage
 */	
		function setImage()
		{
			var selimg = document.createElement("SELECT");
			selimg.setAttribute("id","selimg");
			var scimg1 = document.createElement("OPTION");
			var tcimg1 = document.createTextNode("King White");
			scimg1.setAttribute("value","\u2654");
			var scimg2 = document.createElement("OPTION");
			var tcimg2 = document.createTextNode("Queen White");
			scimg2.setAttribute("value","\u2655");
			var scimg3 = document.createElement("OPTION");
			var tcimg3 = document.createTextNode("Bishop White");
			scimg3.setAttribute("value","\u2657");
			var scimg4 = document.createElement("OPTION");
			var tcimg4 = document.createTextNode("Knight White");
			scimg4.setAttribute("value","\u2658");
			var scimg5 = document.createElement("OPTION");
			var tcimg5 = document.createTextNode("Rook White");
			scimg5.setAttribute("value","\u2656");
			var scimg6 = document.createElement("OPTION");
			var tcimg6 = document.createTextNode("Pawn White");
			scimg6.setAttribute("value","\u2659");
			
			var scimg7 = document.createElement("OPTION");
			var tcimg7 = document.createTextNode("King Black");
			scimg7.setAttribute("value","\u265A");
			var scimg8 = document.createElement("OPTION");
			var tcimg8 = document.createTextNode("Queen Black");
			scimg8.setAttribute("value","\u265B");
			var scimg9 = document.createElement("OPTION");
			var tcimg9 = document.createTextNode("Bishop Black");
			scimg9.setAttribute("value","\u265D");
			var scimg10 = document.createElement("OPTION");
			var tcimg10 = document.createTextNode("Knight Black");
			scimg10.setAttribute("value","\u265E");
			var scimg11 = document.createElement("OPTION");
			var tcimg11 = document.createTextNode("Rook Black");
			scimg11.setAttribute("value","\u265C");
			var scimg12 = document.createElement("OPTION");
			var tcimg12 = document.createTextNode("Pawn Black");
			scimg12.setAttribute("value","\u265F");
			var scimg13 = document.createElement("OPTION");
			var tcimg13 = document.createTextNode("NONE");
			scimg13.setAttribute("value","");
				
			
			scimg1.appendChild(tcimg1);
			scimg2.appendChild(tcimg2);
			scimg3.appendChild(tcimg3);
			scimg4.appendChild(tcimg4);
			scimg5.appendChild(tcimg5);
			scimg6.appendChild(tcimg6);
			scimg7.appendChild(tcimg7);
			scimg8.appendChild(tcimg8);
			scimg9.appendChild(tcimg9);
			scimg10.appendChild(tcimg10);
			scimg11.appendChild(tcimg11);
			scimg12.appendChild(tcimg12);
			scimg13.appendChild(tcimg13);
			
			selimg.appendChild(scimg1);
			selimg.appendChild(scimg2);
			selimg.appendChild(scimg3);
			selimg.appendChild(scimg4);
			selimg.appendChild(scimg5);
			selimg.appendChild(scimg6);
			selimg.appendChild(scimg7);
			selimg.appendChild(scimg8);
			selimg.appendChild(scimg9);
			selimg.appendChild(scimg10);
			selimg.appendChild(scimg11);
			selimg.appendChild(scimg12);
			selimg.appendChild(scimg13);
			
			
					$(element).find("#hello").get(0).appendChild(selimg);
	
			var imgbutton = document.createElement("BUTTON");
					imgbutton.setAttribute("id","img_button");		
			var timg = document.createTextNode("Select Image");

			imgbutton.onclick =function ()
					   	   {
								var i1=$(element).find("#"+lastid).get(0);
								i1.value = "";
								var i=$(element).find("#selimg").get(0); 
								var text = i.options[i.selectedIndex].value;
								i1.value=text;
						
			
			   			   }
			imgbutton.appendChild(timg);	
			$(element).find("#hello").get(0).appendChild(imgbutton);	


			var line = document.createElement("BR");
			document.body.appendChild(line);
			//LINE BREAK
			var line = document.createElement("BR");
			document.body.appendChild(line);
				
			$(element).find("#hello").get(0).appendChild(line);
		

		}

/*
  Represents a button to make grid blocks read-only.
  function myDisableButton
 */
	
		function myDisableButton(){

			var d1 = document.createElement("BUTTON");
			var t1 = document.createTextNode("Disable");
			d1.setAttribute("id","blockb");
			d1.onclick =function ()
						{
							$(element).find("#"+lastid).get(0).value="";
                            $(element).find("#"+lastid).get(0).setAttribute("readonly",true);
                            $(element).find("#"+lastid).get(0).setAttribute("style", "background-color: grey;"); 
						}
			d1.appendChild(t1);			
			
	       $(element).find("#hello").get(0).appendChild(d1); 

		}
		

/*
  Represents a button to make read-only grid blocks editable.
  function myEnableButton
 */

		function myEnableButton(){

			var d2 = document.createElement("BUTTON");
			var t2 = document.createTextNode("Enable");
			d2.setAttribute("id","blocke");
			d2.onclick =function ()
				    {
						$(element).find("#"+lastid).get(0).removeAttribute("readonly");
                        $(element).find("#"+lastid).get(0).removeAttribute("style", "background-color: grey;"); 
					}
			d2.appendChild(t2);			
		      
            $(element).find("#hello").get(0).appendChild(d2); 
	
			var line = document.createElement("BR");
			document.body.appendChild(line);
			document.body.appendChild(line);
			document.body.appendChild(line);	
			
			var line = document.createElement("BR");
			
            document.getElementById("hello").appendChild(line);
		}
		
/**
 * Represents a button to set background-color.
 * @function myColor
 */	
		
		function myColor()
		{

			var sel = document.createElement("SELECT");
			sel.setAttribute("id","sel");
			var sc1 = document.createElement("OPTION");
			var tc1 = document.createTextNode("Red");
			sc1.setAttribute("value","red");
			var sc2 = document.createElement("OPTION");
			var tc2 = document.createTextNode("Blue");
			sc2.setAttribute("value","blue");
			var sc3 = document.createElement("OPTION");
			var tc3 = document.createTextNode("Green");
			sc3.setAttribute("id","green");
			var sc4 = document.createElement("OPTION");
			var tc4 = document.createTextNode("Cyan");
			sc4.setAttribute("id","cyan");
			var sc5 = document.createElement("OPTION");
			var tc5 = document.createTextNode("Black");
			sc5.setAttribute("id","black");
			var sc6 = document.createElement("OPTION");
			var tc6 = document.createTextNode("White");
			sc6.setAttribute("id","White");
			var sc7 = document.createElement("OPTION");
			var tc7 = document.createTextNode("Grey");
			sc7.setAttribute("id","Grey");
				
			
			sc1.appendChild(tc1);
			sc2.appendChild(tc2);
			sc3.appendChild(tc3);
			sc4.appendChild(tc4);
			sc5.appendChild(tc5);
			sc6.appendChild(tc6);
			sc7.appendChild(tc7);
			
			sel.appendChild(sc1);
			sel.appendChild(sc2);
			sel.appendChild(sc3);
			sel.appendChild(sc4);
			sel.appendChild(sc5);
			sel.appendChild(sc6);
			sel.appendChild(sc7);

            $(element).find("#hello").get(0).appendChild(sel);
		
	
			var d3 = document.createElement("BUTTON");
			var t3 = document.createTextNode("Color");
		
			d3.onclick =function ()
						{
							
							var c1=$(element).find("#sel").get(0);
							console.log(c1);
							var text = c1.options[c1.selectedIndex].value;
							$(element).find("#"+lastid).get(0).setAttribute("style", "background-color:"+text+";"); 			
						}
			d3.appendChild(t3);			
            $(element).find("#hello").get(0).appendChild(d3);

		
			var line = document.createElement("BR");
			
					$(element).find("#hello").get(0).appendChild(line);
			
			var line = document.createElement("BR");
			document.body.appendChild(line);
		
		}
		
/*
  Represents a button to remove contents of grid.
  @function myRemoveButton
 */	
		
		function myRemoveButton(){
		
			var rmv = document.createElement("BUTTON");
			var rmvt = document.createTextNode("Remove");
			rmv.setAttribute("id","removeg");
			rmv.addEventListener("click",remove);
			rmv.appendChild(rmvt);
			
			$(element).find("#hello").get(0).appendChild(rmv);
	
		}

		
/*
  Represents a button to reset grid to default state.
  @function myResetButton
 */		
		function myResetButton(){
			
		
			var resetb = document.createElement("BUTTON");
			var resetText = document.createTextNode("RESET");
			resetb.setAttribute("id","resetg");
			
			resetb.appendChild(resetText);
			
			$(element).find("#hello").get(0).appendChild(resetb);
			$("#resetg").click(function(eventObject){
				
				reset();
				
			});
		
		}
		
/*
  Represents a button to set Superscript in a grid block.
  function mySuperScript
 */		
		function mySuperScript(){
		
			
			var line = document.createElement("BR");
			document.body.appendChild(line);
			
			var num = document.createElement("INPUT");
			num.type = "text";
			num.setAttribute("id","sup");
			
			$(element).find("#hello").get(0).appendChild(num);			
			var superb = document.createElement("BUTTON");
	
			var superText = document.createTextNode("SuperScript");
			
			
			superb.addEventListener("click", superscript);
			superb.appendChild(superText);
		
			$(element).find("#hello").get(0).appendChild(superb);	
		}
	
/*
  Represents a function to set superscript.
  function superscript
 */	
	
		function superscript()
		{
			var str = lastid.replace("g","s");
			var spanedit =$(element).find("#"+str).get(0);   
			spanedit.innerHTML = $(element).find("#sup").get(0).value;
			console.log(str);			
		}
		
			
/*
  Represents a function to reset grid.
  function reset
 */
				
		function reset()
		{
			
			for(var i=0;i<a;i++)
			{
				var a1=$(element).find("#g"+i).get(0);
				
				var a2=$(element).find("#s"+i).get(0);
				
				a2.innerHTML = "";
				a1.removeAttribute("style");
				a1.removeAttribute("value");
				a1.removeAttribute("readonly");
				a1.value = "";
			}
				
		}
		
			
/*
  Represents a function to remove content from a grid block.
  @function remove
 */
		function remove()
		{
			
			var a1=$(element).find("#"+lastid).get(0);
			var a2=$(element).find("#"+lastid.replace("g","s")).get(0);
			a2.innerHTML = "";
			a1.removeAttribute("style");
			a1.removeAttribute("src");
			a1.removeAttribute("type");
			a1.removeAttribute("readonly");
			a1.setAttribute("type","text");	
			a1.setAttribute("value","");
			a1.value="";
		
		}
		var id,source,color;
		
			
/*
  Represents a function to set color of a grid block.
  function colorGridBlock
  {Number} id - id of the grid block in which background color has to be set.
  {string} source - name of the color to be set.
 */
		function colorGridBlock(id,color)
		{
			$(element).find("#g"+id).get(0).setAttribute("style", "background-color:"+color+";");
			
		}
        
/*
  Represents a function to set image of a grid block.
  function setImageBlock
  param {Number} id - id of the grid block in which image has to be set.
  param {string} source - url of the image to be set.
 */
	
		function setImageBlock(id,source)
		{
			$(element).find("#g"+id).get(0).setAttribute("type","image");	
			$(element).find("#g"+id).get(0).setAttribute("src",source); 
			
		}
		
/*
  Represents a function to remove image of a grid block.
  function removeImageBlock
  param {Number} id - id of the grid block in which image has to be removed.
 */
	
        function removeImageBlock(id)
		{
			$(element).find("#g"+id).get(0).setAttribute("type","text");	
			$(element).find("#g"+id).get(0).removeAttribute("src"); 
			
		}
        
/*
  Represents a function to change grid dimensions.
  function changeDimension
  param {Number} h - Height/Width of Grid Block
 */
		function changeDimension(h)
		
			{
				var i;		
				for(i=0;i<a;i++)
				{
					var a1 = $(element).find("#g"+id).get(0);
					a1.style.height = h;
					a1.style.width = h;
					a1.style["font-size"] = h;
		
				}
			}
			
	