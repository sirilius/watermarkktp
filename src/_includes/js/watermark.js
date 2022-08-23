// Inisialisasi variabel
let val = "";
let textValue = "";
let textObj = {};
let startX;
let startY;
let selectedText = 0;
let angle = 0;
let isDownloadable = false;
let src = "";

let prevWm;
let prevColor;
let prevRotate;
let prevTextRotate;
let prevOpacity;
let prevTextOpacity;
let prevFont;
let prevPosition;
let prevFontSize;

const img = new Image();
img.addEventListener("load", function () {
  const canvas = ctx.canvas;
  const hRatio = canvas.width / img.width;
  const vRatio = canvas.height / img.height;
  const ratio = Math.min(hRatio, vRatio);
  const centerShift_x = (canvas.width - img.width * ratio) / 2;
  const centerShift_y = (canvas.height - img.height * ratio) / 2;

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
  draggable();
});

// Inisialisasi element
const inputWatermark = document.querySelector("#input-watermark");
const inputFile = document.querySelector("#inputFile");
const inputColor = document.querySelector("#colorPicker");
const inputTextColor = document.querySelector("#text-colorPicker");
const inputOpacity = document.querySelector("#opacity");
const inputTextOpacity = document.querySelector("#opacity-input");
const inputRotate = document.querySelector("#rotate");
const inputTextRotate = document.querySelector("#rotate-input");
const draggableFile = document.querySelector(".draggable-file");
const selectFont = document.querySelector("#select-font");
const selectPosition = document.querySelector("#select-position");
const selectFontSize = document.querySelector("#select-font-size");
const resetButton = document.querySelector("#reset");
const downloadButton = document.querySelector("#download");
const canvasWrapper = document.querySelector("#canvas-wrapper");
const watermarkTemplate = document.querySelector("#wm-template");
const automaticWm = document.querySelector("#automatic-wm");
const whiteBackground = document.querySelector("#bg");

// Section Canvas
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let canvasOffset = canvas.getBoundingClientRect();
let offsetX = canvasOffset.left;
let offsetY = canvasOffset.top;
let scrollX = canvas.scrollLeft;
let scrollY = canvas.scrollTop;

// Section file reader
let reader = new FileReader();

reader.addEventListener("load", function (event) {
  img.src = event.target.result;
  src = event.target.result;

  isDownloadable = true;
});

// Section Event Listener

// Pada saat window browser di resize
window.addEventListener("resize", () => {
  canvasOffset = canvas.getBoundingClientRect();
  offsetX = canvasOffset.left;
  offsetY = canvasOffset.top;
  scrollX = canvas.scrollLeft;
  scrollY = canvas.scrollTop;
});

// Pada saat semua dom element telah selesai dimuat
window.addEventListener("DOMContentLoaded", () => {
  inputFile.addEventListener("change", handleImage, false);

  const elementsBerulang = [inputColor, selectFont];
  elementsBerulang.forEach((element) =>
    element.addEventListener("input", () => draggable()),
  );

  const elementsBerulangWithImg = [selectFontSize, inputOpacity];
  elementsBerulangWithImg.forEach((element) =>
    element.addEventListener("input", () => draggable(img)),
  );

  inputWatermark.addEventListener("input", function () {
    textValue = inputWatermark.value;
    draggable();
  });

  inputRotate.addEventListener("input", function () {
    let rotVal = inputRotate.value;
    document.getElementById("rotate-input").value = rotVal;
    draggable(img);
  });

  inputTextRotate.addEventListener("input", function () {
    let rotVal = inputTextRotate.value;
    document.getElementById("rotate").value = rotVal;
    draggable(img);
  });

  inputOpacity.addEventListener("input", function () {
    let opacVal = inputOpacity.value;
    document.getElementById("opacity-input").value = opacVal;
    draggable(img);
  });

  inputTextOpacity.addEventListener("input", function () {
    let opacVal = inputTextOpacity.value;
    document.getElementById("opacity").value = opacVal;
    draggable(img);
  });

  inputColor.addEventListener("input", function () {
    let opacVal = inputColor.value;
    document.getElementById("text-colorPicker").value = opacVal;
    draggable(img);
  });

  inputTextColor.addEventListener("input", function () {
    let colorVal = inputTextColor.value;
    document.getElementById("colorPicker").value = colorVal;
    draggable(img);
  });

  function savePrevInput(
    wm,
    color,
    rotate,
    textRotate,
    opacity,
    textOpacity,
    font,
    position,
    fontSize,
  ) {
    prevWm = wm;
    prevColor = color;
    prevRotate = rotate;
    prevTextRotate = textRotate;
    prevOpacity = opacity;
    prevTextOpacity = textOpacity;
    prevFont = font;
    prevPosition = position;
    prevFontSize = fontSize;
  }

  automaticWm.addEventListener("input", function () {
    if (!isDownloadable && automaticWm.checked == true) {
      alert("Gambar belum ditambahkan, silakan tambah gambar terlebih dahulu");
      automaticWm.checked = false;
    }
    if (inputWatermark.value == "") {
      savePrevInput(
        inputWatermark.value,
        inputColor.value,
        inputRotate.value,
        inputTextRotate.value,
        inputOpacity.value,
        inputTextOpacity.value,
        selectFont.value,
        selectPosition.value,
        selectFontSize.value,
      );
    }

    if (automaticWm.checked == true) {
      savePrevInput(
        inputWatermark.value,
        inputColor.value,
        inputRotate.value,
        inputTextRotate.value,
        inputOpacity.value,
        inputTextOpacity.value,
        selectFont.value,
        selectPosition.value,
        selectFontSize.value,
      );
      const dateObj = new Date();
      let month = dateObj.getMonth() + 1;
      let day = dateObj.getDate();
      let year = dateObj.getFullYear();

      const newdate = "Verifikasi, " + day + "-" + month + "-" + year;

      watermarkTemplate.innerText = newdate;
      textValue = watermarkTemplate.innerText;

      inputWatermark.value = newdate;
      inputColor.value = "#000000";
      inputTextColor.value = "#000000";
      inputRotate.value = "-15";
      inputTextRotate.value = "-15";
      inputOpacity.value = "30";
      inputTextOpacity.value = "30";
      selectFont.value = "times New Roman";
      selectPosition.value = "center";
      selectFontSize.value = "60";

      dispatchEvent(selectPosition, "input");
      dispatchEvent(selectFontSize, "input");
      dispatchEvent(inputColor, "input");
      dispatchEvent(inputRotate, "input");
      dispatchEvent(inputOpacity, "input");
    } else {
      inputWatermark.value = prevWm;
      inputWatermark.selectionStart = prevWm.length;
      inputColor.value = prevColor;
      inputRotate.value = prevRotate;
      inputTextRotate.value = prevTextRotate;
      inputOpacity.value = prevOpacity;
      inputTextOpacity.value = prevTextOpacity;
      selectFont.value = prevFont;
      selectPosition.value = prevPosition;
      selectFontSize.value = prevFontSize;

      textValue = prevWm;

      dispatchEvent(selectPosition, "input");
      dispatchEvent(selectFontSize, "input");
      dispatchEvent(inputColor, "input");
      dispatchEvent(inputRotate, "input");
      dispatchEvent(inputOpacity, "input");

      savePrevInput(
        inputWatermark.value,
        inputColor.value,
        inputRotate.value,
        inputTextRotate.value,
        inputOpacity.value,
        inputTextOpacity.value,
        selectFont.value,
        selectPosition.value,
        selectFontSize.value,
      );
    }
  });

  selectPosition.addEventListener("input", function () {
    const position = selectPosition.value;

    switch (position) {
      case "top":
        textObj.y = 50;
        textObj.x = 400;
        break;
      case "top-left":
        textObj.y = 50;
        textObj.x = 100;
        break;
      case "top-right":
        textObj.y = 50;
        textObj.x = 700;
        break;
      case "center":
        textObj.y = 230;
        textObj.x = 400;
        break;
      case "center-left":
        textObj.y = 230;
        textObj.x = 100;
        break;
      case "center-right":
        textObj.y = 230;
        textObj.x = 700;
        break;
      case "bottom":
        textObj.y = 450;
        textObj.x = 400;
        break;
      case "bottom-left":
        textObj.y = 450;
        textObj.x = 100;
        break;
      case "bottom-right":
        textObj.y = 450;
        textObj.x = 700;
        break;
    }

    draggable(img);
  });

  dispatchEvent(selectPosition, "input");

  canvas.addEventListener("click", function (e) {
    selectedText = 1;
    mouseXY(e);
    setTimeout(() => {
      selectedText = 0;
    }, 1);
  });

  canvas.addEventListener("pointerdown", mouseDown, false);
  canvas.addEventListener("pointermove", mouseXY, false);
  canvas.addEventListener("pointerup", mouseXY, false);

  canvas.addEventListener("mousedown", mouseDown, false);
  canvas.addEventListener("mousemove", mouseXY, false);
  document.body.addEventListener("mouseup", mouseUp, false);

  downloadButton.addEventListener("click", function () {
    if (!isDownloadable)
      return alert(
        "Gambar belum ditambahkan, silakan tambah gambar terlebih dahulu",
      );
    if (isWMEmpty()) return alert("Watermark belum ditentukan!");

    const image = canvas.toDataURL("image/png");

    downloadButton.setAttribute("href", image);
  });

  resetButton.addEventListener("click", function () {
    if (!isDownloadable)
      return alert(
        "Gambar belum ditambahkan, silakan tambah gambar terlebih dahulu",
      );

    inputWatermark.value = "";
    inputColor.value = "#000000";
    inputTextColor.value = "#000000";
    inputRotate.value = "0";
    inputTextRotate.value = "0";
    inputOpacity.value = "50";
    inputTextOpacity.value = "50";
    selectFont.value = "times New Roman";
    selectPosition.value = "center";
    selectFontSize.value = "60";
    automaticWm.checked = false;

    dispatchEvent(inputColor, "input");
    dispatchEvent(inputRotate, "input");
    dispatchEvent(inputOpacity, "input");
    dispatchEvent(selectPosition, "input");
    dispatchEvent(selectFontSize, "input");
    dispatchEvent(inputWatermark, "input");
  });

  draggableFile.addEventListener("dragover", dragOverHandler, false);
  draggableFile.addEventListener("drop", dropHandler, false);
});

// Section fungsi-fungsi
const isWMEmpty = () => inputWatermark.value.replace(/^\s+|\s+$/g, "") === "";

function mouseUp() {
  canvas.classList.add("cursor-grab");
  canvas.classList.remove("cursor-grabbing");
  selectedText = 0;
  mouseXY();
}

function mouseDown() {
  canvas.classList.add("cursor-grabbing");
  canvas.classList.remove("cursor-grab");
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

function draggable(img, text_x = 0, text_y = 0) {
  let y = text_x > 0 ? text_x : canvas.height / 3;
  let x = text_y > 0 ? text_y : canvas.width / 2;
  const color = inputColor.value;

  const font = selectFont.value;
  const fontSize = selectFontSize.value;

  if (textObj.x && textObj.y) {
    y = textObj.y;
    x = textObj.x;
  }

  let text = {
    text: textValue,
    x,
    y,
  };

  angle = inputRotate.value;
  const opacity = inputOpacity.value / 100;

  const rgbaCol = `rgba(${parseInt(color.slice(-6, -4), 16)},
    ${parseInt(color.slice(-4, -2), 16)},
    ${parseInt(color.slice(-2), 16)},
    ${opacity})`;

  const metrics = ctx.measureText(textValue);
  const actualHeight = Math.ceil(
    metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
  );

  ctx.font = `${fontSize}px ${font}`;
  ctx.fillStyle = rgbaCol;
  ctx.textAlign = "center";
  text.width = Math.ceil(ctx.measureText(textValue).width);
  text.height = actualHeight;

  textObj = text;
  theimg();
}

function theimg() {
  const acanvas = ctx.canvas;
  const hRatio = acanvas.width / img.width;
  const vRatio = acanvas.height / img.height;
  const ratio = Math.min(hRatio, vRatio);
  const centerShift_x = (acanvas.width - img.width * ratio) / 2;
  const centerShift_y = (acanvas.height - img.height * ratio) / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(whiteBackground, 0, 0, canvas.width, canvas.height);
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

  ctx.textAlign = "center";
  ctx.translate(text.x, text.y);
  ctx.rotate(angle * (Math.PI / 180));

  const splitedText = text.text.split("\n");
  const fontSize = selectFontSize.value;

  splitedText.forEach((text, i) => ctx.fillText(text, 0, fontSize * (i + 1)));

  ctx.restore();
}

function validateImage() {
  var img = inputFile.value.toLowerCase();
  regex = new RegExp("(.*?).(jpg|jpeg|png)$");
  if (!regex.test(img)) {
    alert("Format gambar yang Anda masukan salah");
    return false;
  } else {
    return true;
  }
}

function handleImage(e) {
  if (!validateImage(e.target.files[0])) {
    return;
  }

  const filename = this.value.split("\\").pop();
  inputFile.nextElementSibling.innerHTML = `<span id="file-name">${filename}</span>`;

  draggableFile.classList.add("hidden");
  canvasWrapper.classList.remove("relative");

  reader.readAsDataURL(e.target.files[0]);
}

function dispatchEvent(element, eventName) {
  if ("createEvent" in document) {
    const event = document.createEvent("HTMLEvents");
    event.initEvent(eventName, false, true);

    element.dispatchEvent(event);
  } else {
    element.fireEvent(eventName); // only for backward compatibility (older browsers)
  }
}

function dropHandler(ev) {
  ev.preventDefault();
  if (ev.dataTransfer.items) {
    for (const item of ev.dataTransfer.items) {
      if (item.kind === "file") {
        const file = item.getAsFile();
        inputFile.nextElementSibling.innerHTML = `<span id="file-name">${file.name}</span>`;

        if (file.type.includes("image/")) {
          reader.readAsDataURL(file);
          draggableFile.classList.add("hidden");
          canvasWrapper.classList.remove("relative");

          const dateObj = new Date();
          let month = dateObj.getMonth() + 1;
          let day = dateObj.getDate();
          let year = dateObj.getFullYear();

          const newdate = "Verifikasi, " + day + "-" + month + "-" + year;

          inputWatermark.value = newdate;
          inputRotate.value = "-15";
          inputTextRotate.value = "-15";
          inputOpacity.value = "30";
          inputTextOpacity.value = "30";

          watermarkTemplate.innerText = newdate;
          textValue = watermarkTemplate.innerText;
        }
      }
    }
  } else {
    for (const file of ev.dataTransfer.files) {
      reader.readAsDataURL(file);
    }
  }
}

function dragOverHandler(ev) {
  ev.preventDefault();
}
