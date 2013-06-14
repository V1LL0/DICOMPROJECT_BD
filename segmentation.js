var imageObj = new Image();

//funzione che ci cambia imageObj
function change_imgObj(new_Image){
	imageObj = new_Image;
}

onload = function() {
	  var images = new Array();
    	  var $ = function(id) { return document.getElementById(id); };
	  $('mini').oninput = function() { $('minimo').innerHTML = this.value; };
	  $('mini').oninput();
	  $('maxi').oninput = function() { $('massimo').innerHTML = this.value; };
	  $('maxi').oninput();

	};


//Grayscale Filter
	//For descriptions of generic functions, please see the original "Thresholding algorithm"
	function drawImage_gray(imageObj) {
        var canvas = document.getElementById('canvas_2');
        var context = canvas.getContext('2d');
        
		var x = 0;
        var y = 0;

        context.drawImage(imageObj, x, y);

        var imageData = context.getImageData(x, y, imageObj.width, imageObj.height);
        var data = imageData.data;

        for(var i = 0; i < data.length; i += 4) {
		 
		  //Brightness based elaboration, the Grayscale does not assume the values of RGB
		  var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
          // red
          r = data[i];
		  data[i] = brightness;
          // green
          g = data[i + 1];
		  data[i + 1] = brightness;
          // blue
          b = data[i + 2];
		  data[i + 2] = brightness;	  
        }
        context.putImageData(imageData, x, y);
      }
	
	
	//Image Segmentation alghorithm  
	  
	  function drawImage_segm(imageObj) {
        var canvas = document.getElementById('canvas_1');
        var context = canvas.getContext('2d');
        var x = 0;
        var y = 0;

		//Starting pixels for the processing
        context.drawImage(imageObj, x, y);

		//Creation of a long Array with every pixel.
        var imageData = context.getImageData(x, y, imageObj.width, imageObj.height);
        var data = imageData.data;
		
		// //Populate the Textarea with the coordinates
		// var target_coo = document.getElementById("dt_coo");
		// target_coo.value = "";
			
		//Thresholding values MIN-MAX
		var  mini 	= document.getElementById('mini').value;
		var  maxi 	= document.getElementById('maxi').value;
		
		//Get the checkbox for confirmation of the coordinates
		var  check_box	= document.getElementById('plasm');
		
		//Utility variable for counting the X-axis value
		var j = 0;
		
		//every 4 because data length 3 are every RGB
        for(var i = 0; i < data.length; i += 4) {
			
	      //Function for resetting the value of the X-axis every time it touches the max width of the image
	      if(j==imageObj.width){j=0};
	
		// red
		r = data[i]
		// green
		g = data[i + 1]
		// blue
		b = data[i + 2]
	
		var v = 0;
		if((r + g + b) < mini || (r + g + b) > maxi){
		      //Make white the out of range
		      v = 255;
		} 
		// else	{
			      // if(check_box.checked == true){					
				     //  y_1 = Math.floor(Math.floor(i/imageObj.width)/4);
				      
				     //  target_coo.value += "DRAW(T([1,2])([" + j + "," + y_1 + "])(CUBOID([1,1,1])))\n";
			      // }
		// }
		//Re-creation of the long Array of pixels.
		data[i] = v; data[i+1] = v; data[i+2] = v;		  
		
		//Incrementing the value of the axis
		j++;
        }
		
        // overwrite original image
        context.putImageData(imageData, x, y);
		
		//Generate the dataURL for the image transfer
		var dataURL = canvas.toDataURL("image/png");
		
		// //Populate the Textarea with the dataURL
		// var target_url = document.getElementById("dt_url");
		// target_url.value = dataURL;
      }
	  
	  //Samples of Segmentation functions
	  function drawImage_samp(imageObj, mini_1, maxi_1,canvas_num) {
	  
        var canvas = document.getElementById(canvas_num);
        var context = canvas.getContext('2d');
        var x = 0;
        var y = 0;
		//Starting pixels for the processing
        context.drawImage(imageObj, x, y);

		//Creation of a long Array with every pixel.
        var imageData = context.getImageData(x, y, imageObj.width, imageObj.height);
        var data = imageData.data;
		
		//Utility variable for counting the X-axis value
		var j = 0;
		
		//every 4 because data length 3 are every RGB
        for(var i = 0; i < data.length; i += 4) {
			
			//Function for resetting the value of the X-axis every time it touches the max width of the image
			if(j==imageObj.width){j=0};
		  
			 // red
			 r = data[i]
			 // green
			 g = data[i + 1]
			 // blue
			 b = data[i + 2]
		  
			 var v = 0;
			 if((r + g + b) < mini_1 || (r + g + b) > maxi_1){
				
				//Make white the out of range
				v = 255;
			 } 
			 
			 //Re-creation of the long Array of pixels.
			 data[i] = v; data[i+1] = v; data[i+2] = v;		  
			  
			 //Incrementing the value of the axis
			 j++;
        }
		
        // overwrite original image
        context.putImageData(imageData, x, y);
      }
      
      

      
	  
	  //onChange function
	  function changedSegm(){
	  	change_imgObj(firstImg);
		drawImage_gray(imageObj);
		drawImage_segm(imageObj);
	  };
	  
	 //   function clicked(){
		// drawImage_samp(imageObj, 10, 100, "canvas_3");
		// drawImage_samp(imageObj, 100, 200, "canvas_4");
		// drawImage_samp(imageObj, 200, 250, "canvas_5");
		// drawImage_samp(imageObj, 250, 300, "canvas_6");
		// drawImage_samp(imageObj, 300, 400, "canvas_7");
		// drawImage_samp(imageObj, 400, 500, "canvas_8");
		// drawImage_samp(imageObj, 400, 600, "canvas_9");
		// drawImage_samp(imageObj, 500, 700, "canvas_10");
	 //  };
	   
      // imageObj.src="images/brain/IM-0001-0014.png";



///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////


// var image_url = "images/brain/IM-0001-0014.png";
// //$('.bg').css('background-image');
// //image_url = image_url.slice(4, -1); // now you can have all kinds of characters in your image urls
// var image = new Image();

// image.src = image_url;
function prepare_canvas(image){
    var w = image.width;
    var h = image.height;

    var stringa = '<canvas id="canvas_1" height="'+h+'" width="'+w+'" class="bezier"></canvas>';
    var div = document.getElementById("divCanvas_1");
    //divCanvas -> prendo imageUrl, faccio una stringa che mi prepara una canvas con le stesse dimensioni dell'immagine
    div.innerHTML = stringa;
}




