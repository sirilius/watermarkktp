let src = "";
let editable = false;
let textValue = "";
let reader = new FileReader();

let active = false;
let currentX = 0;
let currentY = 0;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

let activeRotate = false;
let center_x;
let center_y;
let degree;
let mouse_x;
let mouse_y;
let initialTransform;
let offsetTop;
let offsetLeft;
let radians;

let prevWm;
let prevColor;
let prevRotate;
let prevTextRotate;
let prevOpacity;
let prevTextOpacity;
let prevFont;
let prevPosition;
let prevFontSize;
let prevCurrentX;
let prevCurrentY;

const inputFile = document.querySelector("#inputFile");
const inputWatermark = document.querySelector("#input-watermark");
const inputColor = document.querySelector("#colorPicker");
const inputTextColor = document.querySelector("#text-colorPicker");
const inputOpacity = document.querySelector("#opacity");
const inputTextOpacity = document.querySelector("#opacity-input");
const inputRotate = document.querySelector("#rotate");
const inputTextRotate = document.querySelector("#rotate-input");
const selectFont = document.querySelector("#select-font");
const selectPosition = document.querySelector("#select-position");
const selectFontSize = document.querySelector("#select-font-size");
const resetButton = document.querySelector("#reset");
const downloadButton = document.querySelector("#download");
const dropBox = document.querySelector(".draggable-file");
const dropZone = document.querySelector("#drop-overlay");
const canvasWrapper = document.querySelector("#canvas-wrapper");
const canvasElement = document.getElementById("canvas");
const automaticWm = document.querySelector("#automatic-wm");
const imageElement = document.querySelector("#image");
const img = new Image();
const output = document.querySelector("#output");
const rotateButton = document.querySelector("#rotate-button");
const rotateBtnIcon = document.querySelector("#rotateBtn-icon");
const draggableText = document.querySelector("#draggable-text");
const textWrapper = document.querySelector("#text-wrapper");
const text = document.querySelector("#text");

// event listener section
window.addEventListener("resize", () => {
  const wRatio = output.offsetWidth / img.width;
  const hRatio = output.offsetHeight / img.height;
  const ratio = Math.min(wRatio, hRatio);

  imageElement.width = img.width * ratio;
  imageElement.height = img.height * ratio;
});

// image section
img.addEventListener("load", function () {
  imageElement.src = img.src;
  const wRatio = output.offsetWidth / img.width;
  const hRatio = output.offsetHeight / img.height;
  const ratio = Math.min(wRatio, hRatio);

  imageElement.width = img.width * ratio;
  imageElement.height = img.height * ratio;
});

reader.addEventListener("load", function (event) {
  img.src = event.target.result;
  src = event.target.result;
});

// input file section
inputFile.addEventListener("change", function (e) {
  if (!validateImage(e.target.files[0])) {
    return;
  }

  const filename = this.value.split("\\").pop();
  inputFile.nextElementSibling.innerHTML = `<span id="file-name">${filename}</span>`;

  dropBox.classList.add("hidden");
  canvasWrapper.classList.remove("relative");

  editable = true;

  reader.readAsDataURL(e.target.files[0]);
});

// watermark section
inputWatermark.addEventListener("input", function () {
  if (editable) {
    text.innerText = inputWatermark.value;
  }
});

selectFont.addEventListener("input", function () {
  text.style.fontFamily = selectFont.value;
});

selectPosition.addEventListener("input", function () {
  const position = selectPosition.value;

  switch (position) {
    case "top":
      currentX = 0;
      currentY = `-${
        output.offsetHeight / 2 - draggableText.offsetHeight / 2 - 20
      }`;
      xOffset = currentX;
      yOffset = currentY;
      setTranslate(currentX, currentY, draggableText);
      break;
    case "top-left":
      currentX = `-${
        output.offsetWidth / 2 - draggableText.offsetWidth / 2 - 20
      }`;
      currentY = `-${
        output.offsetHeight / 2 - draggableText.offsetHeight / 2 - 20
      }`;
      xOffset = currentX;
      yOffset = currentY;
      setTranslate(currentX, currentY, draggableText);
      break;
    case "top-right":
      currentX = output.offsetWidth / 2 - draggableText.offsetWidth / 2 - 20;
      currentY = `-${
        output.offsetHeight / 2 - draggableText.offsetHeight / 2 - 20
      }`;
      xOffset = currentX;
      yOffset = currentY;
      setTranslate(currentX, currentY, draggableText);
      break;
    case "center":
      currentX = 0;
      currentY = 0;
      xOffset = currentX;
      yOffset = currentY;
      setTranslate(currentX, currentY, draggableText);
      break;
    case "center-left":
      currentX = `-${
        output.offsetWidth / 2 - draggableText.offsetWidth / 2 - 20
      }`;
      currentY = 0;
      xOffset = currentX;
      yOffset = 0;
      setTranslate(currentX, currentY, draggableText);
      break;
    case "center-right":
      currentX = output.offsetWidth / 2 - draggableText.offsetWidth / 2 - "20";
      currentY = 0;
      xOffset = currentX;
      yOffset = currentY;
      setTranslate(currentX, currentY, draggableText);
      break;
    case "bottom":
      currentX = 0;
      currentY =
        output.offsetHeight / 2 - draggableText.offsetHeight / 2 - "20";
      xOffset = currentX;
      yOffset = currentY;
      setTranslate(currentX, currentY, draggableText);
      break;
    case "bottom-left":
      currentX = `-${
        output.offsetWidth / 2 - draggableText.offsetWidth / 2 - "20"
      }`;
      currentY =
        output.offsetHeight / 2 - draggableText.offsetHeight / 2 - "20";
      xOffset = currentX;
      yOffset = output.offsetHeight / 2 - draggableText.offsetHeight / 2 - "20";
      setTranslate(currentX, currentY, draggableText);
      break;
    case "bottom-right":
      currentX = output.offsetWidth / 2 - draggableText.offsetWidth / 2 - "20";
      currentY =
        output.offsetHeight / 2 - draggableText.offsetHeight / 2 - "20";
      xOffset = currentX;
      yOffset = currentY;
      setTranslate(currentX, currentY, draggableText);
      break;
  }
});

selectFontSize.addEventListener("input", function () {
  text.style.fontSize = selectFontSize.value + "px";
});

inputColor.addEventListener("input", function () {
  inputTextColor.value = inputColor.value;

  text.style.color = inputColor.value;
});

inputTextColor.addEventListener("input", function () {
  inputColor.value = inputTextColor.value;

  text.style.color = inputColor.value;
});

inputRotate.addEventListener("input", function () {
  inputTextRotate.value = inputRotate.value;

  setTranslate(currentX, currentY, draggableText);
});

inputTextRotate.addEventListener("input", function () {
  inputRotate.value = inputTextRotate.value;

  setTranslate(currentX, currentY, draggableText);
});

inputOpacity.addEventListener("input", function () {
  inputTextOpacity.value = inputOpacity.value;

  text.style.opacity = inputOpacity.value / 100;
});

inputTextOpacity.addEventListener("input", function () {
  inputOpacity.value = inputTextOpacity.value;

  text.style.opacity = inputOpacity.value / 100;
});

// reset watermark
resetButton.addEventListener("click", function () {
  text.innerHTML = "";
  inputWatermark.value = null;
  selectFont.value = "Times New Roman";
  selectPosition.value = "center";
  selectFontSize.value = "36";
  inputColor.value = "#000000";
  inputTextColor.value = "#000000";
  inputTextRotate.value = "0";
  inputRotate.value = "0";
  inputOpacity.value = "50";
  inputTextOpacity.value = "50";
  automaticWm.checked = false;

  text.style.fontSize = "36px";
  text.style.color = "#000000";
  text.style.opacity = 0.5;

  currentX = 0;
  currentY = 0;
  xOffset = currentX;
  yOffset = currentY;

  textWrapper.classList.remove("outline");
  textWrapper.classList.add("hover:outline-blue-400");
  rotateButton.classList.add("hidden");

  setTranslate(currentX, currentY, draggableText);
});

// download section
downloadButton.addEventListener("click", function () {
  if (!editable)
    return alert(
      "Gambar belum ditambahkan, silakan tambah gambar terlebih dahulu",
    );
  else {
    textWrapper.classList.remove("outline");
    rotateButton.classList.add("hidden");
    html2canvas(canvasElement, {
      allowTaint: true,
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight,
    }).then(function (canvas) {
      var anchorTag = document.createElement("a");
      document.body.appendChild(anchorTag);
      anchorTag.download = "watermark.png";
      anchorTag.href = canvas.toDataURL();
      anchorTag.target = "_blank";
      anchorTag.click();
    });
    textWrapper.classList.add("outline");
    rotateButton.classList.remove("hidden");
  }
});

// draggable text event listener
output.addEventListener("touchstart", dragStart, false);
output.addEventListener("touchend", dragEnd, false);
output.addEventListener("touchmove", drag, false);

output.addEventListener("mousedown", dragStart, false);
output.addEventListener("mouseup", dragEnd, false);
output.addEventListener("mousemove", drag, false);

// rotate text event listener
document.addEventListener("mousedown", rotateStart, false);
document.addEventListener("mousemove", rotate, false);
document.addEventListener("mouseup", rotateEnd, false);

document.addEventListener("touchstart", rotateStart, false);
document.addEventListener("touchmove", rotate, false);
document.addEventListener("touchend", rotateEnd, false);

window.addEventListener("mousemove", updatePosition, false);
window.addEventListener("touchmove", updatePosition, false);

// draggable file event listener
window.addEventListener("dragenter", function () {
  showDropZone();
});
dropZone.addEventListener("dragover", allowDrag, false);
dropZone.addEventListener("dragenter", allowDrag);
dropZone.addEventListener("drop", dropHandler, false);
dropZone.addEventListener("dragleave", function () {
  hideDropZone();
});

// function section
function validateImage() {
  var img = inputFile.value.toLowerCase();
  regex = new RegExp("(.*?).(jpg|jpeg|png)$");
  if (!regex.test(img)) {
    if (event.target.value.length == 0) {
      return false;
    } else {
      alert("Format gambar yang Anda masukan salah");
      return false;
    }
  } else {
    return true;
  }
}

// draggable file function
function showDropZone() {
  dropZone.classList.remove("hidden");
  dropZone.classList.add("flex");
}

function hideDropZone() {
  dropZone.classList.remove("flex");
  dropZone.classList.add("hidden");
}

function dropHandler(ev) {
  editable = true;
  ev.preventDefault();
  hideDropZone();
  if (ev.dataTransfer.items) {
    for (const item of ev.dataTransfer.items) {
      if (item.kind === "file") {
        const file = item.getAsFile();

        if (file.type.includes("image/")) {
          inputFile.nextElementSibling.innerHTML = `<span id="file-name">${file.name}</span>`;
          reader.readAsDataURL(file);
          dropBox.classList.add("hidden");
          canvasWrapper.classList.remove("relative");
        } else {
          alert("Format gambar yang Anda masukan salah");
        }
      }
    }
  } else {
    for (const file of ev.dataTransfer.files) {
      reader.readAsDataURL(file);
    }
  }
}

function allowDrag(ev) {
  if (true) {
    ev.preventDefault();
  }
}

// draggable text function
function dragStart(e) {
  if (e.type === "touchstart") {
    initialX = e.touches[0].clientX - xOffset;
    initialY = e.touches[0].clientY - yOffset;
  } else {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
  }

  if (e.target === text) {
    active = true;
  }

  if (
    (e.target === text) |
    (e.target === rotateButton) |
    (e.target === rotateBtnIcon)
  ) {
    textWrapper.classList.add("outline");
    textWrapper.classList.remove("hover:outline-blue-400");
    rotateButton.classList.remove("hidden");
  } else {
    textWrapper.classList.remove("outline");
    textWrapper.classList.add("hover:outline-blue-400");
    rotateButton.classList.add("hidden");
  }
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;

  active = false;

  if (e.target === text) {
    rotateButton.classList.remove("hidden");
  }
}

function drag(e) {
  if (active) {
    e.preventDefault();
    textWrapper.classList.remove("hover:outline-blue-400");
    rotateButton.classList.add("hidden");

    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }
    if (
      currentX < `-${output.offsetWidth / 2 - draggableText.offsetWidth / 2}`
    ) {
      currentX = `-${output.offsetWidth / 2 - draggableText.offsetWidth / 2}`;
    }
    if (currentX > output.offsetWidth / 2 - draggableText.offsetWidth / 2) {
      currentX = output.offsetWidth / 2 - draggableText.offsetWidth / 2;
    }
    if (
      currentY < `-${output.offsetHeight / 2 - draggableText.offsetHeight / 2}`
    ) {
      currentY = `-${output.offsetHeight / 2 - draggableText.offsetHeight / 2}`;
    }
    if (currentY > output.offsetHeight / 2 - draggableText.offsetHeight / 2) {
      currentY = output.offsetHeight / 2 - draggableText.offsetHeight / 2;
    }

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, draggableText);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform =
    "translate3d(" +
    xPos +
    "px, " +
    yPos +
    "px, 0) rotate(" +
    inputRotate.value +
    "deg)";
}

// automatic wm
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
  x,
  y,
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
  prevCurrentX = x;
  prevCurrentY = y;
}

automaticWm.addEventListener("input", function () {
  if (!editable && automaticWm.checked == true) {
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
      currentX,
      currentY,
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
      currentX,
      currentY,
    );
    const dateObj = new Date();
    let month = dateObj.getMonth() + 1;
    let day = dateObj.getDate();
    let year = dateObj.getFullYear();

    const newdate = "Verifikasi, " + day + "-" + month + "-" + year;

    text.innerText = newdate;

    inputWatermark.value = newdate;
    inputColor.value = "#000000";
    inputTextColor.value = "#000000";
    inputRotate.value = "-15";
    inputTextRotate.value = "-15";
    inputOpacity.value = "30";
    inputTextOpacity.value = "30";
    selectFont.value = "Times New Roman";
    selectPosition.value = "center";
    selectFontSize.value = "36";

    text.style.fontSize = "36px";
    text.style.color = "#000000";
    text.style.opacity = 0.5;

    currentX = 0;
    currentY = 0;
    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, draggableText);
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

    text.innerText = prevWm;

    text.style.fontSize = prevFontSize + "px";
    text.style.color = prevColor;
    text.style.opacity = prevOpacity / 100;

    currentX = prevCurrentX;
    currentY = prevCurrentY;
    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, draggableText);

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
      currentX,
      currentY,
    );
    textWrapper.classList.remove("outline");
    textWrapper.classList.add("hover:outline-blue-400");
    rotateButton.classList.add("hidden");
  }
});

// rotate text button

function getOffset(element) {
  if (!element.getClientRects().length) {
    return { top: 0, left: 0 };
  }

  let rect = element.getBoundingClientRect();
  let win = element.ownerDocument.defaultView;
  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset,
  };
}

function rotateStart(e) {
  if ((e.target === rotateButton) | (e.target === rotateBtnIcon)) {
    activeRotate = true;
  }
}

function rotate(e) {
  if (activeRotate == true) {
    if (e.type === "touchmove") {
      mouse_x = e.touches[0].clientX;
      mouse_y = e.touches[0].clientY;
    } else {
      mouse_x = e.clientX;
      mouse_y = e.clientY;
    }
    radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
    degree = radians * (180 / Math.PI) * -1;
    inputRotate.value = degree;
    inputTextRotate.value = Math.round(degree);
    setTranslate(currentX, currentY, draggableText);
  }
}

function rotateEnd() {
  activeRotate = false;
}

function position() {
  initialTransform = draggableText.style.transform;
  draggableText.style.transform = "none";
  draggableText.style.transform =
    "translate3d(" + currentX + "px, " + currentY + "px, 0)";
  offsetTop = text.getBoundingClientRect().top;
  offsetLeft = text.getBoundingClientRect().left;
  draggableText.style.transform = initialTransform;
}

function updatePosition() {
  position();
  center_x = offsetLeft + text.offsetWidth / 2;
  center_y = offsetTop + text.offsetHeight / 2;
}
