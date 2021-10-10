var val = "";
var inputFile = document.getElementById("inputFile");
    inputFile.addEventListener("change", handleImage, false)
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

var $canvas = $("#canvas");
var canvasOffset = $canvas.offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var scrollX = $canvas.scrollLeft();
var scrollY = $canvas.scrollTop();

var startX;
var startY;
var texts = [];

var selectedText = -1;

function textHittest(x, y, textIndex) {
    var text = texts[textIndex];
    return (x >= text.x && x <= text.x + text.width && y >= text.y - text.height && y <= text.y);
}

function handleMouseDown(e) {
    e.preventDefault();
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);
    for (var i = 0; i < texts.length; i++) {
        if (textHittest(startX, startY, i)) {
            selectedText = i;
        }
    }
}

function handleMouseUp(e) {
    e.preventDefault();
    selectedText = -1;
}

function handleMouseOut(e) {
    e.preventDefault();
    selectedText = -1;
}

function handleMouseMove(e, img) {
    if (selectedText < 0) {
        return;
    }
    e.preventDefault();
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);

    var dx = mouseX - startX;
    var dy = mouseY - startY;
    startX = mouseX;
    startY = mouseY;

    var text = texts[selectedText];
    text.x += dx;
    text.y += dy;
    theimg(img);
}

function automate(img) {
    document.getElementById("text").addEventListener("keyup", function () {
        draggable(img)
    })

    document.getElementById("colorPicker").addEventListener("change", function () {
        draggable(img)
    })

    document.getElementById("opacity").addEventListener("change", function () {
        draggable(img);
    })

    document.addEventListener("click", function () {
        draggable(img)
    })

    $("#canvas").mousedown(function (e) {
        handleMouseDown(e);
    });
        
    $("#canvas").mousemove(function (e) {
        handleMouseMove(e, img)
    })
    
    $("#canvas").mouseup(function (e) {
        handleMouseUp(e);
    });
    
    $("#canvas").mouseout(function (e) {
        handleMouseOut(e);
    });

    canvas.addEventListener("pointerdown", function (e) {
        handleMouseDown(e);
    });

    canvas.addEventListener("pointermove", function (e) {
        handleMouseMove(e, img);
    });

    canvas.addEventListener("pointerup", function (e) {
        handleMouseUp(e);
    });

    canvas.addEventListener("pointerout", function (e) {
        handleMouseOut(e)
    });
};

function draggable(img) {
    var y = 90;
    var x = 400;
        
    for (var i = 0; i < texts.length; i++) {
        var text = texts[i];
        var y = text.y;
        var x = text.x;
    }

    var text = {
        text: $("#text").val(),
        x: x,
        y: y
    };

    var opacity = $("#opacity").val();
    var color = $("#colorPicker").val();

    var rgbaCol = 'rgba(' + parseInt(color.slice(-6, -4), 16) + ',' + parseInt(color.slice(-4, -2), 16) + ',' + parseInt(color.slice(-2), 16) + ',' + opacity + ')';

    ctx.font = "30px verdana";
    ctx.fillStyle = rgbaCol;
    ctx.textAlign = "center";
    text.width = ctx.measureText(text.text).width;
    text.height = 30;

    texts.push(text);

    theimg(img)
}

function theimg(img) {
    for (var i = 0; i < texts.length; i++) {
        var acanvas = ctx.canvas ;
        var hRatio = acanvas.width / img.width;
        var vRatio = acanvas.height / img.height;
        var ratio = Math.min(hRatio, vRatio);
        var centerShift_x = (acanvas.width - img.width*ratio) / 2;
        var centerShift_y = (acanvas.height - img.height*ratio) / 2;
            
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width*ratio, img.height*ratio);
        var text = texts[i];
        ctx.fillText(text.text, text.x, text.y);
    }
}

function handleImage(e) {
    var reader = new FileReader();
    var img = "";
    var src = "";

    reader.onload = function(event) {
        img = new Image();
        img.onload = function() {
            var canvas = ctx.canvas ;
            var hRatio = canvas.width / img.width;
            var vRatio = canvas.height / img.height;
            var ratio = Math.min(hRatio, vRatio);
            var centerShift_x = (canvas.width - img.width*ratio) / 2;
            var centerShift_y = (canvas.height - img.height*ratio) / 2;
        
            ctx.clearRect(0,0,canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width*ratio, img.height*ratio);
            ctx.fillStyle = '#ffffff00';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        img.src = event.target.result;
        src= event.target.result;
        canvas.classList.add("show");
        theimg(img);
        automate(img);
    }

    reader.readAsDataURL(e.target.files[0]);
}

function download() {
    var download = document.getElementById("download");
    var image = document.getElementById("canvas").toDataURL("image/png").replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
}

$("#inputFile").change(function() {
    var filename = $(this).val().split("\\").pop();
    $(this).siblings(".label-file").html(filename);

if (document.getElementsByClassName("label-file")[0].innerHTML == "") {
    document.getElementsByClassName("label-file")[0].innerHTML = "Pilih Gambar"
}
})