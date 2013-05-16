	function mosaicImage(img, blockSize) {

		var canvas = document.getElementById("idCanvas");
		var w = img.clientWidth;
		var h = img.clientHeight;
		canvas.width = w;
		canvas.height = h;
		
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0,0);

		//data: image data that contains original image	
		var data = ctx.getImageData(0,0,w,h).data;
		
		//imgData: a new image data that will contains the image pixelled
		var imgData = ctx.createImageData(w,h);	

		//Take text area
		var txArea = document.getElementById("tx_coordinates");
		txArea.value = " T = function (dims) {\n\treturn function (values) {\n\t\treturn function (object) {\n\t\t\treturn object.translate(dims, values);\n\t\t};\n\t};\n}\n\n";
		
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

				if(count > (blockSizeX*blockSizeY/2))
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

				else{
					txArea.value += "DRAW(DOMAIN([[" + x + "," + (x+blockSizeX) + "], [" + y + ", " + (y+blockSizeY) + "],[0,2]])([1,1,1]));\n";
					for(var y1=y; y1<y+blockSizeY; y1++){
						for (var x1=x; x1<x+blockSizeX; x1++){
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

		ctx.putImageData(imgData,0,0);
		return true;
	}
	