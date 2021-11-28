const imageLoader = document.getElementById('inputFile');
imageLoader.addEventListener('input', handleImage, false);
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const signaturePad = new SignaturePad(document.getElementById('canvas'), {
  backgroundColor: '#fff',
  penColor: 'rgb(0, 0, 0)',
  minDitstance: '90',
});
const saveButton = document.getElementById('download');
const cancelButton = document.getElementById('reset');

signaturePad.addEventListener('beginStroke', () => {
  var ratio = Math.max(window.devicePixelRatio || 1, 1);

  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
});

function handleImage(e) {
  var reader = new FileReader();
  var img = '';
  var src = '';
  reader.onload = function (event) {
    img = new Image();
    img.onload = function () {
      var hRatio = canvas.width / img.width;
      var vRatio = canvas.height / img.height;
      var ratio = Math.min(hRatio, vRatio);
      var centerShift_x = (canvas.width - img.width * ratio) / 2;
      var centerShift_y = (canvas.height - img.height * ratio) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.resetTransform();
      signaturePad.backgroundColor = '#fff';
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
  };
  reader.readAsDataURL(e.target.files[0]);
}

window.onresize = resizeCanvas;
resizeCanvas();
function resizeCanvas() {
  var ratio = Math.max(window.devicePixelRatio || 1, 1);

  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;

  signaturePad.clear();
}

saveButton.addEventListener('click', function () {
  const image = signaturePad.toDataURL();

  saveButton.setAttribute('href', image);
});

cancelButton.addEventListener('click', function () {
  signaturePad.clear();
});

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

const year = document.querySelector('.copyright .year');
year.innerText = new Date().getFullYear();
