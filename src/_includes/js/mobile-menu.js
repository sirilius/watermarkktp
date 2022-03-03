window.onclick = function (event) {
  if (event.target == document.getElementById("pop-up")) {
    document.getElementById("pop-up").style.display = "none";
  }
};

document.getElementsByClassName("nav-bar")[0].onclick = function () {
  document.getElementById("pop-up").style.display = "flex";
};

document.getElementsByClassName("close-btn")[0].onclick = function () {
  document.getElementById("pop-up").style.display = "none";
};
