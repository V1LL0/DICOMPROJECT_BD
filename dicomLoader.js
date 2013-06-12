
/*
 Il metodo setBackground consente di selezionare la slice i richiesta dall'utente.
 Posiziona nella canvas l'immagine DICOM caricata.
 */
function setBackground(i) {
    if (i< 0 || i>num_frame){
        alert("Slice selezionata non valida!");
        return;
    }
    if (cur_plugin){
        cur_plugin.endSet();
    }
    clearCanvas();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    linewidth=1;
    if (backgrounds[i].getBytecode()){
        ctx.drawImage(backgrounds[i].getBytecode(), 0, 0, backgrounds[i].getWidth(), backgrounds[i].getHeight());
    }else{
        $('#alert').html('Loading dicom image....');
        backgrounds[i].setBytecode(new Image());
        backgrounds[i].getBytecode().onload = function(){
            backgrounds[i].setWidth(this.width);
            backgrounds[i].setHeight(this.height);
            $('#alert').html('');
            drawAll();
            //ctx.drawImage(backgrounds[i].getBytecode(), 0, 0, backgrounds[i].getWidth(), backgrounds[i].getHeight());
        }
        backgrounds[i].getBytecode().src = backgrounds[i].getImg();
    }
    $('#web3d-comment').val(backgrounds[i].getComment());
}


function setDicom() {
	var canvas = document.getElementById("idCanvas");
	var ctx = canvas.getContext("2D");
}
