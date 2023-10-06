var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].onclick = function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display == "block") {
      panel.style.display = "none";
      this.querySelector("svg").innerHTML =
        '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />';
    } else {
      panel.style.display = "block";
      this.querySelector("svg").innerHTML =
        '<path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />';
    }
  };
}
