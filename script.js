var val = '';
var inputFile = document.getElementById('inputFile');
inputFile.addEventListener('change', handleImage, false);
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var $canvas = $('#canvas');
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
  return (
    x >= text.x &&
    x <= text.x + text.width &&
    y >= text.y - text.height &&
    y <= text.y
  );
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
  document.getElementById('text').oninput = function () {
    draggable(img);
  }

  document
    .getElementById('colorPicker')
    .oninput = function () {
      draggable(img);
    }

  document
    .getElementById('select-position')
    .oninput = function () {
      var position = document.getElementById('select-position').value;
      var x = 0;
      var y = 0;
      switch (position) {
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
      draggable(img, x, y);
    }

  document.getElementById('opacity').oninput = function () {
    draggable(img);
  }

  document.getElementById('rotate').oninput = function () {
    draggable(img);
  }

  document.addEventListener('click', function () {
    draggable(img);
  });

  $('#canvas').mousedown(function (e) {
    handleMouseDown(e);
  });

  $('#canvas').mousemove(function (e) {
    handleMouseMove(e, img);
  });

  $('#canvas').mouseup(function (e) {
    handleMouseUp(e);
  });

  $('#canvas').mouseout(function (e) {
    handleMouseOut(e);
  });

  canvas.addEventListener('pointerdown', function (e) {
    handleMouseDown(e);
  });

  canvas.addEventListener('pointermove', function (e) {
    handleMouseMove(e, img);
  });

  canvas.addEventListener('pointerup', function (e) {
    handleMouseUp(e);
  });

  canvas.addEventListener('pointerout', function (e) {
    handleMouseOut(e);
  });
}

function draggable(img) {
  var y = canvas.height/3;
  var x = canvas.width/2;
  var color = document.getElementById('colorPicker').value;

  // Font Selection
  var font = document.getElementById('select-font').value;

  for (var i = 0; i < texts.length; i++) {
    var text = texts[i];
    var y = text.y;
    var x = text.x;
  }

  var text = {
    text: $('#text').val(),
    x: x,
    y: y,
  };

  angle = $('#rotate').val();
  var opacity = $('#opacity').val();
  var color = $('#colorPicker').val();

  var rgbaCol =
    'rgba(' +
    parseInt(color.slice(-6, -4), 16) +
    ',' +
    parseInt(color.slice(-4, -2), 16) +
    ',' +
    parseInt(color.slice(-2), 16) +
    ',' +
    opacity +
    ')';

  ctx.font = `30px ${font}`;
  ctx.fillStyle = rgbaCol;
  ctx.textAlign = 'center';
  text.width = ctx.measureText(text.text).width;
  text.height = 30;

  texts.push(text);

  theimg(img);
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
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio,
    );
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
  var img = '';
  var src = '';

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
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio,
      );
    };

    img.src = event.target.result;
    src = event.target.result;
    canvas.classList.add('show');
    theimg(img);
    automate(img);
  };

  reader.readAsDataURL(e.target.files[0]);
}

function download() {
  var download = document.getElementById('download');
  var image = document.getElementById('canvas').toDataURL('image/png');
  download.setAttribute('href', image);
}

function reset() {
  $('#rotate').val(0);
  $('#rotate + output').val('0°');
  $('#opacity').val(0.5);
  $('#colorPicker').val('#000000');
  $('#select-position').val('top');
  dispatchEvent('#select-position', 'change');
  $('#select-font').val('times New Roman');
}

$('#inputFile').change(function () {
  var filename = $(this).val().split('\\').pop();
  $(this)
    .siblings('.label-file')
    .html(`<span class="truncate-text">${filename}</span>`);

  if (document.getElementsByClassName('label-file')[0].innerHTML == '') {
    document.getElementsByClassName('label-file')[0].innerHTML = 'Pilih Gambar';
  }
});

var dispatchEvent = function (element, eventName) {
  if ('createEvent' in document) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(eventName, false, true);
    document.querySelector(element).dispatchEvent(event);
  } else {
    document.querySelector(element).fireEvent(eventName); // only for backward compatibility (older browsers)
  }
};
