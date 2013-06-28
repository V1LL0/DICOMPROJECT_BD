   //////////////////FILES READER/////////////////////////////////  

    var input = document.getElementById('input');
    var cleanAll = document.getElementById('cleanAll');
    var images = [];
    var canvas = document.getElementById("canvasOriginalImage");
    var context = canvas.getContext("2d");
    var firstImg = new Image();

    function callback() {
      firstImg = images[0];

      context.drawImage(firstImg, 0, 0);

      drawImage_gray(firstImg);
      prepare_canvas(firstImg);
      drawImage_segm(firstImg);
    }

    function handle_files(event) {
      images = [];
     
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

    function functionCleanAll(){
      this.images = [];
      files = [];
      this.files = [];
      len = files.length;
      i = 0;
      file = null;
      complete = false;
      completed = 0;
      console.log("muhahhahahahahah pulisco tutto io!!!");
      //CLEANING OF CANVAS
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
      ///////


    }







    input.addEventListener('change', handle_files);
    cleanAll.addEventListener('click', functionCleanAll);



      
      ///////////////////////////////////////////////////////////// 
