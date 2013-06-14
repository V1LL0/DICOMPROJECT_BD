   //////////////////FILES READER/////////////////////////////////  


//<input id="input" type="file" multiple>
//<canvas id="theCanvas" width="500" height="500"></canvas>

var input = document.getElementById('input');
var images = [];
var canvas = document.getElementById("canvasOriginalImage");
var context = canvas.getContext("2d");
var firstImg = new Image();


function callback() {

  firstImg = images[(images.length/2) | 0];
  context.drawImage(firstImg, 0, 0);
  drawImage_gray(firstImg);
  prepare_canvas(firstImg);
  drawImage_segm(firstImg);
}


//funzione che ci cambia imageObj
// function change_imgObj(new_Image){
//   imageObj = new_Image;
// }

function handle_files(event) {
  //console.log("i'm in!");
  var files = this.files;

  var len = files.length;
  var i;
  var file;
  var complete = false;
  var completed = 0;

  for (i = 0; i < len; i += 1) {
    file = files[i];

    if (!file.type.match('image.*')) {
      continue;
    }

    var reader = new FileReader();

    reader.onload = (function (file) {
      return function (event) {
        var data = event.target.result;
        // var img = document.createElement('img');
        // img.setAttribute('src', data);
        // img.setAttribute('data-name', file.name);
        var img = new Image();
        img.src = data;
        images.push(img);
        completed += 1;

        if (completed === len) {
          callback();
        }
      };
    })(file);

    // Read in the image file as a data URL.
    reader.readAsDataURL(file);
  }
}

input.addEventListener('change', handle_files);



  
  ///////////////////////////////////////////////////////////// 
