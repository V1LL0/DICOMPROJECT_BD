function clicked3D() {

	for(var i=0; i<images.length; i++){
		drawImage_gray(images[i]);
 		drawImage_segm(images[i]);
 		mosaicImage(blockSize, true);
	}

	var funzione3D = Function(stringaFunzione);
	funzione3D();

}
