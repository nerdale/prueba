$( document ).ready(function() {
	$("i").click(function () {
		$("input[type='file']").trigger('click');
	});

	$('input[type="file"]').on('change', function() {
		var val = $(this).val();
		$(this).siblings('span').text(val);
	})

	function handleFileSelect(evt) {

    var files = evt.target.files; // FileList object

    //Obtenemos la imagen del campo "file".
    for (var i = 0, f; f = files[i]; i++) {

     //Obtenemos la imagen del campo "file"
     if (!f.type.match('image.*')) {
     	continue;
     }

     var reader = new FileReader();

   //capture 
   reader.onload = function(e) {
   	displayImgData(e.target.result)
   	addImage(e.target.result);
   };

   reader.readAsDataURL(f);
}
}

function loadFromLocalStorage(){
	var images = JSON.parse(localStorage.getItem("images"))

	if(images && images.length > 0){
		imagesObject = images;

		displayNumberOfImgs();
		images.forEach(displayImgData);
	}
}

function addImage(imgData){
	imagesObject.push(imgData);
	displayNumberOfImgs();
	localStorage.setItem("images", JSON.stringify(imagesObject));
}

function displayImgData(imgData){
	var lista=  document.getElementById('list')
	var div=document.createElement('div');
	div.setAttribute("class","row");
	var span = document.createElement('div');
	span.setAttribute("id"," imagenes ");
	span.setAttribute("class","col-xs-5");
	span.innerHTML = '<img class="thumb " src="' + imgData + '"/>';
	var descrip= document.createElement('input');
	descrip.setAttribute("type", "text");
	descrip.setAttribute("class","form-control col-xs-5 descripcion");
	var check=document.createElement('input');
	check.setAttribute('type','checkbox');
	check.setAttribute("class","col-xs-2 checkbox");
	div.appendChild(span)
	div.appendChild(descrip);
	div.appendChild(check);
	list.appendChild(div);
  	//agrega el div con la imagen al span
  	


}

function displayNumberOfImgs(){
	if(imagesObject.length > 0){

		document.getElementById("state").innerHTML = imagesObject.length + " image" + ((imagesObject.length > 1) ? "s" : "") + " stored in your browser";

		document.getElementById("deleteImgs").style.display = "inline";

	} else {
		document.getElementById("state").innerHTML = "No images stored in your browser.";
		document.getElementById("deleteImgs").style.display = "none";
	}


}

function deleteImages(){
	imagesObject = [];
	localStorage.removeItem("images");
	displayNumberOfImgs()
	document.getElementById('list').innerHTML = "";
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);
document.getElementById('deleteImgs').addEventListener("click", deleteImages);
loadFromLocalStorage();

});


