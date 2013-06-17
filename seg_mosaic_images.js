//file che viene invocato per il funzionamento del pulsante 3D
var input = document.getElementById('input');
var images = [];
var canvas = document.getElementById("canvasOriginalImage");
var context = canvas.getContext("2d");
var firstImg = new Image();

function tutte_le_immagini(i){
// 	console.log("sono nel Tutte immagini")
// 	console.log(img)
// 	firstImg.src = img;
// 	console.log(firstImg)

		function callback() {
			console.log("sono nella callback e l'immagine "+i+" e': " + images[i])
			firstImg = images[i];
			context.drawImage(firstImg, 0, 0);
			
			drawImage_gray(firstImg);
			prepare_canvas(firstImg);
			drawImage_segm(firstImg);
		}

	// 	function handle_files(event) {
	// 	images = [];
	// 	//console.log("i'm in!");
	// 	var files = this.files;

	// 	var len = files.length;
	// 	var i;
	// 	var file;
	// 	var complete = false;
	// 	var completed = 0;

	// 	for (i = 0; i < len; i += 1) {
	// 	file = files[i];

	// 	if (!file.type.match('image.*')) {
	// 	  continue;
	// 	}

	// 	var reader = new FileReader();

	// 	reader.onload = (function (file) {
	// 	  return function (event) {
	// 	    var data = event.target.result;
	// 	    // var img = document.createElement('img');
	// 	    // img.setAttribute('src', data);
	// 	    // img.setAttribute('data-name', file.name);
	// 	    var img = new Image();
	// 	    img.src = data;
	// 	    images.push(img);
	// 	    completed += 1;

	// 	    if (completed === len) {
	// 	    	callback();
	// 	     }
	// 	  };
	// 	})(file);

	// 	// Read in the image file as a data URL.
	// 	reader.readAsDataURL(file);
	// 	console.log("return images length: "+ images.length)
	// 	}
	// }

		// input.addEventListener('change', handle_files);
}