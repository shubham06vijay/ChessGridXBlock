/* Javascript for YourXBlock. */
function ChessgridXBlock(runtime, element) {

    var r=8;var c=8; var a=0; var lastid;var dict={};  var save_grid={};  var temp1,temp2,temp3,f1=0,f2=0,f3=0,f4=0,toggle=-1;
	var handlerUrl = runtime.handlerUrl(element, 'save_grid');

	var ques,ans;
        var saveUrl = runtime.handlerUrl(element, 'save_chess');
        var getGrid = runtime.handlerUrl(element, 'get_dict');      


	
         // CREATES COMPLETE CHESS BOARD
        
         function chess_board(){  

                  for(var i=8;i<16;i++){

                           $(element).find("#g"+i).attr("value","\u265F");
                           var j=i+40;
                           $(element).find("#g"+j).attr("value","\u2659");
 
                      }

                for(var i=16;i<47;i++){

                           $(element).find("#g"+i).attr("value","");

                      }



                $(element).find("#g"+0).attr("value","\u265C");
		$(element).find("#g"+1).attr("value","\u265E");
		$(element).find("#g"+2).attr("value","\u265D");
		$(element).find("#g"+3).attr("value","\u265B");
		$(element).find("#g"+4).attr("value","\u265A");
		$(element).find("#g"+5).attr("value","\u265D");
		$(element).find("#g"+6).attr("value","\u265E");
		$(element).find("#g"+7).attr("value","\u265C");
		$(element).find("#g"+56).attr("value","\u2656");
		$(element).find("#g"+57).attr("value","\u2658");
		$(element).find("#g"+58).attr("value","\u2657");
		$(element).find("#g"+59).attr("value","\u2655");
		$(element).find("#g"+60).attr("value","\u2654");
		$(element).find("#g"+61).attr("value","\u2657");
		$(element).find("#g"+62).attr("value","\u2658");
		$(element).find("#g"+63).attr("value","\u2656");
}

   //CALLS ON CLICK OF QUESTION GRID

    $('#QG', element).click(function(eventObject) {
            $("#SAG").hide();
            $("#SQG").show();
            $("ul.action-modes").html(' <li class="view-button sga_editor_tab"></li>');

            f3=1;toggle=0;
            $(element).find("#hello").get(0).innerHTML=""; 
            $.ajax({
            type: 'POST',
            url: getGrid,
            data: JSON.stringify({'grid':'QG'}),
            success: function(result) {
                    save_grid={};
                    save_grid=result;
                    console.log(save_grid);
                    createGrid(8,8);
                    setData(save_grid);
                    setImage();
                    myRemoveButton();
                    myResetButton();


//DEFAULT CHESS BOARD BUTTON

                    var defboard = document.createElement("BUTTON");
                    defboard.setAttribute("id","CHESS_BOARD");
                    var textboard = document.createTextNode("CHESS BOARD");
                    defboard.appendChild(textboard);
                    defboard.addEventListener("click",chess_board);
                    $(element).find("#hello").get(0).appendChild(defboard);


                  }
   	 });
    });


// CALLS ON CALL OF ANSWER GRID

    $('#AG', element).click(function(eventObject) {
          

             $("#SQG").hide();
            $("#SAG").show();
            $("ul.action-modes").html(' <li class="view-button sga_editor_tab"></li>');

            f4=1;toggle=1;
            $.ajax({
            type: 'POST',
            url: getGrid,
            data: JSON.stringify({'grid':'AG'}),
            success: function(result) {
                    
                    if(result["hello"]=="world"){
                                
                                if(f3==0) { alert("first create the question")}       
                                $("#selimg").hide();
	                        $("#img_button").hide();
        	                $("#removeg").hide();
                	        $("#resetg").hide();
				$("#CHESS_BOARD").hide();

                      }
                    else
                    {   if(f2==0||f1==0){

                        $(element).find("#hello").get(0).innerHTML="";     
                    	save_grid=result;
                    	createGrid(8,8);
                    	setData(save_grid);
 			$("#selimg").hide();
      		        $("#img_button").hide();
			$("#removeg").hide();
			$("#resetg").hide();
                        $("#CHESS_BOARD").hide();
                        
                    }
			else{

					$("#selimg").hide();
		                        $("#img_button").hide();
        		                $("#removeg").hide();
                		        $("#resetg").hide();
                                        $("#CHESS_BOARD").hide();

				}
			

		}
                }
    	    });
   
    });
// CALLS ON CLICK OF SUBMIT QUESTION GRID

    $('#SQG', element).click(function(eventObject) {
            
          
           
            if(f3==0){      
                        alert("create the question before submit");
            }
            else if(toggle==1){

			alert("oops!! you are in solution grid");
	    }
            else{
	
          	  f1=1;f2=1;
          	  dict=getData();
          	  data={};
          	  data["QG"]=dict;

          	  $.ajax({
          	  type: 'POST',
          	  url: handlerUrl,
          	  data: JSON.stringify(data),
           	  success: function(result) {
               	 				 //alert("Question Saved");
				              $("ul.action-modes").html(' <li class="view-button sga_editor_tab">successfully submitted</li>');
                                            }
        	 });
           }
    });

// CALLS ON CLICK OF SUBMIT ANSWER GRID

   $('#SAG', element).click(function(eventObject) {


	    if(f3==0||f4==0){

			alert("create question/solution before submit");
	    }

            else if (toggle==0){
                        alert("oops!! you are in question grid");
	    }
	    else
            {
           	 dict=getData();
           	 data={};
           	 data["AG"]=dict;
           	 f1=0;f2=0;
           	 $.ajax({
           	 type: 'POST',
                 url: handlerUrl,
           	 data: JSON.stringify(data),
           	 success: function(result) {
               	                              //  alert("Solution Saved");
                                               $("ul.action-modes").html(' <li class="view-button sga_editor_tab">successfully submitted</li>');

            	                           }
        	 });
	}
    });


// CALLS ON PAGE LOAD
	
    $(function ($) {
              $("#SQG").hide();
              $("#SAG").hide();
              xblockElement(element);
        }); 


//  CHECKS VALIDATIONS

    var validators = {
        'number': function(x) {
            return Number(x);
        },
        'string': function(x) {
            return !x ? null : x;
        }
    };


// CAllS ON SAVE BUTTON

    function save() {

        var view = this;
        view.runtime.notify('save', {state: 'start'});

        var data = {};
        $(element).find('input').each(function(index, input) {
            data[input.name] = input.value;
        });


        $.ajax({
            type: 'POST',
            url: saveUrl,
            data: JSON.stringify(data),
            success: function() {
                view.runtime.notify('save', {state: 'end'});
            }
        });
    }

    return {
        save: save
    };


}

