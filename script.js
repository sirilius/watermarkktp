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

function draw() {
    for (var i = 0; i < texts.length; i++) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var text = texts[i];
        ctx.fillText(text.text, text.x, text.y);
    }
}

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

function handleMouseMove(i, img) {
    if (selectedText < 0) {
        return;
    }
    i.preventDefault();
    mouseX = parseInt(i.clientX - offsetX);
    mouseY = parseInt(i.clientY - offsetY);

    var dx = mouseX - startX;
    var dy = mouseY - startY;
    startX = mouseX;
    startY = mouseY;

    var text = texts[selectedText];
    text.x += dx;
    text.y += dy;
    theimg(img);
}

$("#canvas").mousedown(function (e) {
    handleMouseDown(e);
});

$("#canvas").mouseup(function (e) {
    handleMouseUp(e);
});

$("#canvas").mouseout(function (e) {
    handleMouseOut(e);
});

function automate(img) {
    document.getElementById("text").addEventListener("keyup", function () {
        draggable(img)
    })

    $("#canvas").mousemove(function (i) {
        handleMouseMove(i, img)
    })

    document.getElementById("colorPicker").addEventListener("change", function () {
        draggable(img)
    })
    
    $("#canvas").mousemove(function (i) {
        handleMouseMove(i, img)
    })
};

function draggable(img) {
    var y = 90;
        var x = 400;
        var color = document.getElementById("colorPicker").value
        
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

        ctx.font = "30px verdana";
        ctx.fillStyle = color;
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