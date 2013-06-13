   //////////////////FILES READER/////////////////////////////////  


//<input id="input" type="file" multiple>
//<canvas id="theCanvas" width="500" height="500"></canvas>

var input = document.getElementById('input');
var images = [];
var canvas = document.getElementById("canvasOriginalImage");
var context = canvas.getContext("2d");


function callback() {
  console.log('hello canvas');
  //images
  // var k=0;
  // var interval = setInterval( function () {
  //   canvas.width = images[k].width;
  //   canvas.height = images[k].height;
  //   context = canvas.getContext("2d");  
  //   context.drawImage(images[k], 0, 0);
  //   k++;

  //   if(k>=images.length)
  //     clearInterval(interval);
  
  // }, 2000);


  var firstImg = images[(images.length/2) | 0];

  context.drawImage(firstImg, 0, 0);


}


function handle_files(event) {

  console.log("i'm in!");
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
        var img = new Image;
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
