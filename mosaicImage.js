	function mosaicImage(blockSize) {

		var canvasOrigin = document.getElementById("canvas_1");

		// var w = img.clientWidth;
		// var h = img.clientHeight;
		// canvasOrigin.width = w;
		// canvasOrigin.height = h;
		
		var w = canvasOrigin.width;
		var h = canvasOrigin.height;


		var ctxOrigin = canvasOrigin.getContext("2d");

		//data: image data that contains original image	
		var data = ctxOrigin.getImageData(0,0,w,h).data;

		var canvasDestination = document.getElementById('idCanvas');
		var ctxDestination = canvasDestination.getContext("2d");

		
		//imgData: a new image data that will contains the image pixelled
		var imgData = ctxDestination.createImageData(w,h);	

		
		//Take text area
		var txArea = document.getElementById("tx_coordinates");
		txArea.value = " T = function (dims) {\n\treturn function (values) {\n\t\treturn function (object) {\n\t\t\treturn object.translate(dims, values);\n\t\t};\n\t};\n}\n\n";

		//Array of rectangles
		//A rectangle is an array as [x,y,baseLength,Height]
		//height is always = blockSizeY
		//instead baseLength is a multiple of blockSizeX
		var rectanglesArray = new Array();
		//
		var white=true;
		for (var y=0; y<h; y+=blockSize) {
			for (var x=0; x<w; x+=blockSize) {
				
				var count=0;
				var blockSizeX = blockSize;
				var blockSizeY = blockSize;
				
				//If x, point where we're, + blocksize,
				//passes the image width,
				//we readapts blocksize
				//for y it's the same
				if (x + blockSizeX > w)
					blockSizeX = w - x;
				if (y + blockSizeY > h)
					blockSizeY = h - y;

				for(var y1=y; y1<y+blockSizeY; y1++){
					for (var x1=x; x1<x+blockSizeX; x1++){
						if(y1<h && x1<w)
							if(data[(y1*4*w)+(x1*4)]===255 &&
								data[(y1*4*w)+(x1*4)+1]===255 &&
								data[(y1*4*w)+(x1*4)+2]===255)
								count++;
					}
				}

				if(count > (blockSizeX*blockSizeY/2)){
					if(white===false){
						rect.push(rectangleLength, blockSizeY);
						rectanglesArray.push(rect);
					}
					white = true;
					for(var y1=y; y1<y+blockSizeY; y1++){
						for (var x1=x; x1<x+blockSizeX; x1++){
							if(y1<h && x1<w){
								imgData.data[(y1*4*w)+(x1*4)]=255
								imgData.data[(y1*4*w)+(x1*4)+1]=255
								imgData.data[(y1*4*w)+(x1*4)+2]=255
								imgData.data[(y1*4*w)+(x1*4)+3]=255
							}
						}
					}
				}
				else{
					if(white===true){
						var rect = new Array();
						rect.push(x,y);
						var rectangleLength = 0;
					}
					rectangleLength+=blockSizeX;
					white=false;
					for(var y1=y; y1<y+blockSizeY; y1++){
						for (var x1=x; x1<x+rectangleLength*blockSizeX; x1++){
							if(y1<h && x1<w){
								imgData.data[(y1*4*w)+(x1*4)]=0
								imgData.data[(y1*4*w)+(x1*4)+1]=0
								imgData.data[(y1*4*w)+(x1*4)+2]=0
								imgData.data[(y1*4*w)+(x1*4)+3]=255
							}
						}
					}
				}




			}
		}


		for(var i=0; i<rectanglesArray.length; i++){
			txArea.value += "DRAW(DOMAIN([[" + rectanglesArray[i][0] + "," + (rectanglesArray[i][0]+rectanglesArray[i][2]) + "], [" + rectanglesArray[i][1] + ", " + (rectanglesArray[i][1]+rectanglesArray[i][3]) + "],[0,2]])([1,1,1]));\n";
		}

			ctxDestination.putImageData(imgData,0,0);
			
			return true;
	}
	
	
	var img = new Image();
	img.crossOrigin = '';
	
	img.onload = function() {
		var $ = function(id) { return document.getElementById(id); };
		$('blkS').oninput = function() { $('BlockSize').innerHTML = this.value; };
		$('blkS').oninput();
		mosaicImage(1);
	};

	//onChange function
	function changedBlk(){
	      var blockSize = document.getElementById('blkS').value;
	      mosaicImage(parseInt(blockSize));
	};
	


