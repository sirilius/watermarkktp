var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].onclick = function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    var icon = this.querySelector("i");

    if (panel.style.display == "block") {
      panel.style.display = "none";
      icon.classList.remove("ri-subtract-line");
      icon.classList.add("ri-add-line");
    } else {
      panel.style.display = "block";
      icon.classList.remove("ri-add-line");
      icon.classList.add("ri-subtract-line");
    }
  };
}
