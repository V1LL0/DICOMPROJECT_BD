//prove varie
///--------------- 3D -------------------////
var i = 1;
var parametro_per_piu_immagini = 0
// var stringa_definitiva = "";

function clicked3D() {
	// var input = document.getElementById('input');
	// var images = [];

	// console.log("ma ci entro nel 3D???")

	// for(var i=0; i<images.length; i++){

 		//CLEANING OF CANVAS //pulizia di tutto
 		var cvsOI = document.getElementById("canvasOriginalImage");
	 	var cvsGray = document.getElementById("canvas_gray");
	 	var cvsSegm = document.getElementById("canvas_segm");
	 	var cvsBlk = document.getElementById("canvas_blockDecomp");
	 	var ctxOI = cvsOI.getContext("2d");
	 	var ctxGray = cvsGray.getContext("2d");
	 	var ctxSegm = cvsSegm.getContext("2d");
	 	var ctxBlk = cvsBlk.getContext("2d");

	 	ctxOI.clearRect(0, 0, cvsOI.width, cvsOI.height);
	 	ctxGray.clearRect(0, 0, cvsGray.width, cvsGray.height);
	 	ctxSegm.clearRect(0, 0, cvsSegm.width, cvsSegm.height);
	 	ctxBlk.clearRect(0, 0, cvsBlk.width, cvsBlk.height);
	 	 ///// una volta pulite le canvas, ci rimetto le immagini che mi servono

	 	// console.log("images.length: "+ (images.length-i))
		
		// console.log("immagine nel clicked3D "+i+"-esima "+ images[i])
		////------------------------------------------

		// drawImage_gray(images[i]);
 		// drawImage_segm(images[i]);

 		// tutte_le_immagini(i);

 		//----------------------------------------------------------
 		//RICREO LA CALLBACK 
 		ctxOI.drawImage(firstImg, 0, 0);
		
		firstImg = images[i];

		console.log("--------------"+firstImg.src+" "+i+"-----------------");
		prepare_canvas(firstImg);
		changedSegm();

		/////---------------FINITO IL PRIMO PASSAGGIO passiamo al mosaic
		//metto false così non mi lavora con il tasto next
 		mosaicImage(blockSize,false);
 	
		parametro_per_piu_immagini = i;

		i++;
	
	console.log("parametro_per_piu_immagini: "+parametro_per_piu_immagini)
}

/////////////---- mosaic -----------///////////////
	var blockSize = 1;
		
	//blockSize = dimensione del blocco
	//y_n_coordinates = booleano che indica se si vogliono
	//le coordinate in una stringa/funzione che poi
	//verra' eseguita in plasm
	function mosaicImage(blockSize, y_n_coordinates) {
		console.log("ciao.. sono qui in mosaicImage!")
		
		console.log("ciao, sono y_n_coordinates : "+ y_n_coordinates)
		console.log("ciao, sono blockSize : " + blockSize)

		if(y_n_coordinates === null || y_n_coordinates === undefined)
			y_n_coordinates = false;
		// if(k === null || k === undefined)
		// 	k = 0;

		var canvasOrigin = document.getElementById("canvas_segm");

		// var w = img.clientWidth;
		// var h = img.clientHeight;
		// canvasOrigin.width = w;
		// canvasOrigin.height = h;
		
		var w = canvasOrigin.width;
		var h = canvasOrigin.height;

		var ctxOrigin = canvasOrigin.getContext("2d");

		//data: image data that contains original image	
		var data = ctxOrigin.getImageData(0,0,w,h).data;
		// console.log("data di ctxOrigini canvas_segm mosaicImage: "+ data)

		var canvasDestination = document.getElementById('canvas_blockDecomp');
		var ctxDestination = canvasDestination.getContext("2d");

		//imgData: a new image data that will contains the image pixelled
		var imgData = ctxDestination.createImageData(w,h);	

		var txArea = document.getElementById("tx_coordinates");


		if(y_n_coordinates)
			txArea.value += "\n\n\n\n";

		//Array of rectangles
		//A rectangle is an array as [x,y,baseLength,Height]
		//height is always = blockSizeY
		//instead baseLength is a multiple of blockSizeX
		var rectanglesArray = new Array();
		
		var white=true;
		for (var y=0; y<h; y+=blockSize) {
			for (var x=0; x<w; x+=blockSize) {
				
				var count=0;
				var blockSizeX = blockSize;
				var blockSizeY = blockSize;
				// console.log("inizio")
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

	// var stringa_di_merda = "";
	
	var k = parametro_per_piu_immagini

	console.log("ciao, sono k : "+k)

	console.log("y_n_coordinates: "+ y_n_coordinates)

		if(y_n_coordinates){
			var dist = k*10;
			var alt = (k*10)+5

			console.log("valore di rettaglesArray: "+ rectanglesArray.length)

			for(var i=0; i<rectanglesArray.length; i++){	
				txArea.value += "DRAW(DOMAIN([[" + rectanglesArray[i][0] + "," + (rectanglesArray[i][0]+rectanglesArray[i][2]) + "], [" + rectanglesArray[i][1] + ", " + (rectanglesArray[i][1]+rectanglesArray[i][3]) + "],[" + dist + "," + alt + "]])([1,1,1]));\n";
			}
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
		blockSize = document.getElementById('blkS').value;
	    mosaicImage(parseInt(blockSize),true);
	};
	




