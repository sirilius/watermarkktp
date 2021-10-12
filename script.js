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
var angle = 0;

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

    document.getElementById("select-poistion").addEventListener("change", function () {
        var position = document.getElementById("select-poistion").value
        var x = 0;
        var y = 0;
        switch(position) {
            case 'top':
                y = 90;
                x = 400;
            break;
            case 'top-left':
                y = 90;
                x = 100;
            break;
            case 'top-right':
                y = 90;
                x = 700;
            break;
            case 'center':
                y = 300;
                x = 400;
            break;
            case 'center-left':
                y = 300;
                x = 100;
            break;
            case 'center-right':
                y = 300;
                x = 700;
            break;
            case 'bottom':
                y = 500;
                x = 400;
            break;
            case 'bottom-left':
                y = 500;
                x = 100;
            break;
            case 'bottom-right':
                y = 500;
                x = 700;
            break;
        }
        draggable(img, x, y)

    })

    document.getElementById("opacity").addEventListener("change", function () {
        draggable(img);
    })

    document.getElementById("rotate").addEventListener("change", function () {
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
        handleMouseOut(e);
    });
};

function draggable(img, text_x, text_y) {
    var y = (text_x > 0) ? text_x : 90;
    var x = (text_y > 0) ? text_y : 400;
    var color = document.getElementById("colorPicker").value

// Font Selection
    var font = document.getElementById("select-font").value

    for (var i = 0; i < texts.length; i++) {
        var text = texts[i];
        var y = (text_y > 0) ? text_y : text.y;
        var x = (text_x > 0) ? text_x : text.x;
    }


    var text = {
        text: $("#text").val(),
        x: x,
        y: y
    };

    angle = $("#rotate").val();
    var opacity = $("#opacity").val();
    var color = $("#colorPicker").val();

    var rgbaCol = 'rgba(' + parseInt(color.slice(-6, -4), 16) + ',' + parseInt(color.slice(-4, -2), 16) + ',' + parseInt(color.slice(-2), 16) + ',' + opacity + ')';

    ctx.font = `30px ${font}`;
    ctx.fillStyle = rgbaCol;
    ctx.textAlign = "center";
    text.width = ctx.measureText(text.text).width;
    text.height = 30;

    texts.push(text);

    theimg(img)
}

function theimg(img) {
    for (var i = 0; i < texts.length; i++) {
        var acanvas = ctx.canvas;
        var hRatio = acanvas.width / img.width;
        var vRatio = acanvas.height / img.height;
        var ratio = Math.min(hRatio, vRatio);
        var centerShift_x = (acanvas.width - img.width * ratio) / 2;
        var centerShift_y = (acanvas.height - img.height * ratio) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
        ctx.save();
        var text = texts[i];
        ctx.textAlign = 'center';
        ctx.translate(text.x, text.y);
        ctx.rotate(angle * (Math.PI / 180));
        ctx.fillText(text.text, 0, text.height / 2);
        ctx.restore();
    }
}

function handleImage(e) {
    var reader = new FileReader();
    var img = "";
    var src = "";

    reader.onload = function (event) {
        img = new Image();
        img.onload = function () {
            var canvas = ctx.canvas;
            var hRatio = canvas.width / img.width;
            var vRatio = canvas.height / img.height;
            var ratio = Math.min(hRatio, vRatio);
            var centerShift_x = (canvas.width - img.width * ratio) / 2;
            var centerShift_y = (canvas.height - img.height * ratio) / 2;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
            ctx.fillStyle = '#ffffff00';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        img.src = event.target.result;
        src = event.target.result;
        canvas.classList.add("show");
        theimg(img);
        automate(img);
    }

    reader.readAsDataURL(e.target.files[0]);
}

function download() {
    var download = document.getElementById("download");
    var image = document.getElementById("canvas").toDataURL("image/png");
    download.setAttribute("href", image);
}

$("#inputFile").change(function () {
    var filename = $(this).val().split("\\").pop();
    $(this).siblings(".label-file").html(filename);

    if (document.getElementsByClassName("label-file")[0].innerHTML == "") {
        document.getElementsByClassName("label-file")[0].innerHTML = "Pilih Gambar"
    }
})
