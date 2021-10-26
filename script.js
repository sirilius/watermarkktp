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

var img = '';
let textValue = '';
let textObj = {};

let elementText = document.getElementById('text');
let elementFont = document.getElementById('select-font');
let elementPosition = document.getElementById('select-position');
let elementFontSize = document.getElementById('select-font-size');
let elementColor = document.getElementById('colorPicker');
let elementOpacity = document.getElementById('opacity');
let elementRotate = document.getElementById('rotate');

var startX;
var startY;

var selectedText = 0;
var angle = 0;

$(window).on('resize', function (e) {
  inputFile = document.getElementById('inputFile');
  inputFile.addEventListener('change', handleImage, false);
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  $canvas = $('#canvas');
  canvasOffset = $canvas.offset();
  offsetX = canvasOffset.left;
  offsetY = canvasOffset.top;
  scrollX = $canvas.scrollLeft();
  scrollY = $canvas.scrollTop();
});

function mouseUp() {
  $('#canvas').addClass('grab')
  $('#canvas').removeClass('grabbing')
  selectedText = 0;
  mouseXY();
}

function mouseDown() {
  $('#canvas').addClass('grabbing')
  $('#canvas').removeClass('grab')
  selectedText = 1;
  mouseXY();
}

function mouseXY(e) {
  try {
    e.preventDefault();
    canvasX = e.pageX - canvas.offsetLeft;
    canvasY = e.pageY - canvas.offsetTop;
    changePosXY(canvasX, canvasY);
  } catch (error) {}
}

function changePosXY(x, y) {
  if (selectedText) {
    textObj.x = x;
    textObj.y = y;
    draggable();
  }
}

function automate() {
  elementText.oninput = function (e) {
    textValue = elementText.value;
    draggable();
  };

  elementColor.oninput = function () {
    draggable();
  };

  function changePosition(position) {
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

  elementPosition.oninput = function () {
    var position = elementPosition.value;
    changePosition(position);
  };

	elementFont.oninput = function () {
		draggable();
	}

  elementFontSize.oninput = function () {
    draggable();
  };

  elementOpacity.oninput = function () {
    draggable();
  };

  elementRotate.oninput = function () {
    draggable();
    document.getElementById('rotate-val').innerHTML = elementRotate.value + '°';
  };

  canvas.addEventListener('click', function (e) {
    selectedText = 1;
    mouseXY(e);
    setTimeout(() => {
      selectedText = 0;
    }, 1);
  });

  canvas.addEventListener('mousedown', mouseDown, false);
  canvas.addEventListener('mousemove', mouseXY, false);
  document.body.addEventListener('mouseup', mouseUp, false);
}

function draggable(img, text_x = 0, text_y = 0) {
  var y = text_x > 0 ? text_x : canvas.height / 3;
  var x = text_y > 0 ? text_y : canvas.width / 2;
  var color = elementColor.value;

  var font = elementFont.value;
  var fontSize = elementFontSize.value;

  if (textObj.x && textObj.y) {
    var y = textObj.y;
    var x = textObj.x;
  }

  var text = {
    text: textValue,
    x: x,
    y: y,
  };

  angle = elementRotate.value;
  var opacity = elementOpacity.value;
  var color = elementColor.value;

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

  let metrics = ctx.measureText(textValue);
  let actualHeight = Math.ceil(
    metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
  );

  ctx.font = `${fontSize}px ${font}`;
  ctx.fillStyle = rgbaCol;
  ctx.textAlign = 'center';
  text.width = Math.ceil(ctx.measureText(textValue).width);
  text.height = actualHeight;

  if (text.x < 0) {
    text.x = 0;
  }
  if (text.y < 0) {
    text.y = 0;
  }

  textObj = text;
  theimg();
}

function theimg() {
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
  const text = textObj;
  ctx.textAlign = 'center';
  ctx.translate(text.x, text.y);
  ctx.rotate(angle * (Math.PI / 180));
  var splitedText = text.text.split('\n');
  var fontSize = document.getElementById('select-font-size').value;
  for (let i = 0; i < splitedText.length; i++) {
    ctx.fillText(splitedText[i], 0, fontSize * (i + 1));
  }
  ctx.restore();
}

function handleImage(e) {
  var reader = new FileReader();
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
    automate();
  };

  reader.readAsDataURL(e.target.files[0]);
}

function download() {
  var download = document.getElementById('download');
  var image = document.getElementById('canvas').toDataURL('image/png');
  download.setAttribute('href', image);
}

function reset() {
  document.getElementById('text').value = '';
  document.getElementById('rotate').value = '0';
  document.getElementById('rotate-val').value = '0°';
  document.getElementById('opacity').value = '0.5';
  document.getElementById('colorPicker').value = '#000000';
  document.getElementById('select-position').value = 'top';
  dispatchEvent('#select-position', 'input');
  document.getElementById('select-font').value = 'times New Roman';
  document.getElementById('select-font-size').value = '20';
}

/*
On Change function to change the Label on Input Element html.
*/
$('#inputFile').change(function () {
  var filename = $(this).val().split('\\').pop();
  $(this)
    .siblings('.label-file')
    .html(`<span class="truncate-text">${filename}</span>`);

  if (document.getElementsByClassName('truncate-text')[0].innerHTML == '') {
    document.getElementsByClassName('label-file')[0].innerHTML =
      '<i class="fas fa-arrow-circle-up" style="margin-right: 8px"></i> Pilih Gambar';
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

window.onclick = function (event) {
  if (event.target == document.getElementById('pop-up')) {
    document.getElementById('pop-up').style.display = 'none';
  }
};

document.getElementsByClassName('nav-bar')[0].onclick = function () {
  document.getElementById('pop-up').style.display = 'flex';
};

document.getElementsByClassName('close-btn')[0].onclick = function () {
  document.getElementById('pop-up').style.display = 'none';
};
