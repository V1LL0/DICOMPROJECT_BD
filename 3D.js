// var i = 1;
var parametro_per_piu_immagini = 0;
//per il testo creo una variabile globale
var stringa_definitiva = "";


function clicked3D() {
	
	// var txArea = document.getElementById("tx_coordinates");
	
	for(var k=0; k<images.length;k++){			
		if(k<images.length){

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
	 	parametro_per_piu_immagini = k;
 		//----------------------------------------------------------
		//RICREO LA CALLBACK 
 		ctxOI.drawImage(firstImg, 0, 0);

		firstImg = images[k];
		//per vedere l'immagine che prende
		// console.log("--------------"+firstImg.src+" "+i+"-----------------");
	
		changedSegm();
	}
	
	// i++;
	//se supera la lunghezza dell'array allora posso chiudere tutto e non va più avanti nel caso si clicca ancora sul NEXT
	// if(k>images.length)
	// 	return;

	stringa_definitiva += stringa_presa+"\n\n\n";
	// txArea.value = stringa_definitiva;
	
	}
	//avvio di plasm.js
	var funzione3D = Function(stringa_definitiva);
	funzione3D();

}

