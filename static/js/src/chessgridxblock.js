/* Javascript for ChessgridXBlock. */
function ChessgridXBlock(runtime, element) {

        var r=0,temp1,temp2,temp3;
        var dict,dict1={};
        var ques,ans;
        var c=0;
        var handlerUrl1= runtime.handlerUrl(element,'get_dict');
        var handlerUrl2= runtime.handlerUrl(element,'ques_fetch');
        var handlerUrl3= runtime.handlerUrl(element,'chk_ans');
	

       
        function updateGrid(result)
	{
		if(result["hello"]=="world")
		{
			console.log(result);
		}
		else
		{
			dict=result;
			createGrid(8,8);
		}
	
        }

	function updateQues(result)
	{
		ques=result['ques'];
                
                
                $(element).find("#quesStu").text(ques);
                if(result["flag"]=="done"){
                                
				chk_ans(result);
                             //   $(element).find("#submit_btn").get(0).setAttribute("style", "display: none;");
		//	$("#submit_btn").hide();
                            //    $(element).find('#submit_btn').hide();  
                                $(element).find("#submit_btn").get(0).setAttribute("style", "display: none;");

			}
	}
	
	function chk_ans(result)
	{
          	        
                if(result["score"]=="false")
                {
                      $(element).find("#chk_ans").html("You have already attempted!!"); 
                }	
		else
                if(result["score"]==result["points"]){                    //          correct in case of hint
                        $(element).find("#chk_ans").html("\u2714");
                       
		}	
		else
		{
			$(element).find("#chk_ans").html("\u2715");
		}	
              // $(element).find('#submit_btn').hide();
                $(element).find("#submit_btn").get(0).setAttribute("style", "display: none;");
	  //    $("#submit_btn").hide();
	}
	
	
    $("#submit_btn",element).click(function(eventObject){
	
	        getData();	   	
		console.log(dict1);// dict1={"a":"b"};
		$.ajax({
			type:"POST",
			url:handlerUrl3,
			data:JSON.stringify(dict1),
			success:chk_ans,
		});
	});

	var a=0,key,j;
	var lastid;

	function getData()
	{
        	var i,j;
        	var n=0;
        	var cell ;

        	for(n=0;n<64;n++)
        	{
        	       cell =$(element).find("#g"+n);
                       cell=cell.get(0);

                       console.log(cell);
        	        for (i = 0; i < cell.attributes.length; i++)
        	        {
                	        dict1["g" + n +"_"+cell.attributes[i].name] = cell.attributes[i].value;
       			 }
                dict1["g"+n+"_id"]="g"+n;
                dict1["g" + n +"_"+"value"] = cell.value;
                dict1["g"+n+"_"+"readonly"]=true;
        	}	
                

	}	

	
	function setData()
	{
		
		for(j=0;j<64;j++)
		{
			key = "#g"+j;
			var key1 = "g"+j+"_"+"type";
			var key2 = "g"+j+"_"+"style";
			var key3 = "g"+j+"_"+"readonly";
			var key4 = "g"+j+"_"+"src";
			var key5 = "g"+j+"_"+"value";
                     
			var ele=$(element).find(key);
			
			if(dict[key1])
				ele.attr("type",dict[key1]);
			
			if(dict[key2])
				ele.attr("style",dict[key2]);
			
			if(dict[key3])
				ele.attr("readonly",dict[key3]);
			
			if(dict[key4])
				ele.attr("src",dict[key4]);
			if(dict[key5])
			{	ele.attr("value",dict[key5]);
			}
                      

		}
		
                
	}
	
	function createGrid(r,c)
	{
	
		
		var x = document.createElement("TABLE");
		x.setAttribute("border", "15px");
		x.className = 'grid';
		
	    $(element).find('#qwerty').append(x);
	    
		var i,j;
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
                                inp.onfocus=function(){

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
		                                       } }
                               


				
        	    z.appendChild(inp);	
				var span1=document.createElement("SPAN");
				span1.setAttribute("id","s"+a);
				
				z.appendChild(span1);
								
				a++;
    			y.appendChild(z);
			}
//		                 $(element).find("#submit_btn").get(0).setAttribute("style", "display: ");

		}
		
		setData();
			
	}
	
    
   function gd(){
       $.ajax({
                type:"POST",
                url:handlerUrl1,
                data:JSON.stringify({"grid":"QG"}),
                success:updateGrid
        });

   }
	
   function qd(){

     $.ajax({
                type:"POST",
                url:handlerUrl2,
                data:JSON.stringify({"hello":"world"}),
                success:updateQues
        });




}
	
	
    $(function ($) {

        gd();
        qd();
//        $(element).find("#submit_btn").get(0).setAttribute("style", "display: none;"); 	
	
    });

}

