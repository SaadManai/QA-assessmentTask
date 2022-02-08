$(function() {
    function onComplete(data) {
        var diffImage = new Image();
        diffImage.src = data.getImageDataUrl();

        $("#image-diff").html(diffImage);

        $(diffImage).click(function() {
            var w = window.open("about:blank", "_blank");
            var html = w.document.documentElement;
            var body = w.document.body;

            html.style.margin = 0;
            html.style.padding = 0;
            body.style.margin = 0;
            body.style.padding = 0;

            var img = w.document.createElement("img");
            img.src = diffImage.src;
            img.alt = "image diff";
            img.style.maxWidth = "100%";
            img.addEventListener("click", function() {
                this.style.maxWidth =
                    this.style.maxWidth === "100%" ? "" : "100%";
            });
            body.appendChild(img);
        });

        if (data.misMatchPercentage == 0) { 	
			// condition showing that the images were the same						
            $("#thesame").show();
            $("#diff-results").hide();
        } 
        else { 		
			// condition showing the images were different												
            $("#mismatch").text(data.misMatchPercentage);
            if (!data.isSameDimensions) {
                $("#differentdimensions").show();
            } else {
                $("#differentdimensions").hide();
            }
            $("#diff-results").show();
            $("#thesame").hide();
        }
    }   
    
    /*
    	This function implements the logic of selecting a test from the 'select' HTML element
     */
     
    $("#selectTest").change(function() {									
    	console.log('select option changed')							 
    	 if ($(this).val() == 'null'){											
			$("#dropzone1").html('<img src=""/>');						
		}																			
		else if ($(this).val() == 'test1'){										
			$("#dropzone1").html('<img src="demoassets/People.jpg"/>');		
		}										
  		else if ($(this).val() == 'test2'){
			$("#dropzone1").html('<img src="demoassets/ghost1.png"/>');	
		}		
		else if ($(this).val() == 'test3'){
			$("#dropzone1").html('<img src="demoassets/7a.png"/>');	
		}	
		else if ($(this).val() == 'test4'){
			$("#dropzone1").html('<img src="demoassets/7a.png"/>');	
		}	
		
		// resetting the value of 'dropzone2' each time a new option is selected	
		$("#dropzone2").html('<img src=""/>');	
		$("#image-diff").html('<img src=""/>');
						
		// hiding the difference percentage of a previous test that was run				
		$("#thesame").hide();
    	$("#diff-results").hide();
	});
	
	/*
		This function defines the logic of the 'Run test' button
	 */
	
    $("#runTest").click(function () {	
		// if-statement for if the user selects the initial option										
		if($("#selectTest").val() == 'null'){								
    		$("#dropzone2").html('<img src=""/>');
    		alert('Please select a test');
    	}
    	else if($("#selectTest").val() == 'test1'){
    		$("#dropzone2").html('<img src="demoassets/People2.jpg"/>');
    	}
    	else if($("#selectTest").val() == 'test2'){
    		$("#dropzone2").html('<img src="demoassets/ghost2.png"/>');
    	}
    	else if($("#selectTest").val() == 'test3'){
    		$("#dropzone2").html('<img src="demoassets/7b.png"/>');
    	}
    	else if($("#selectTest").val() == 'test4'){
    		$("#dropzone2").html('<img src="demoassets/7a.png"/>');
    	}

		// function call for comparing the ground-truth and test result image
        resembleControl = resemble($('#dropzone1 img').attr('src'))				
          		.compareTo($('#dropzone2 img').attr('src'))
                .onComplete(onComplete);
		}); 
});
