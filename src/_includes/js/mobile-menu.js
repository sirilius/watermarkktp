var menu = document.getElementById("menu");
var line_1 = document.getElementById("line-1");
var line_2 = document.getElementById("line-2");
var line_3 = document.getElementById("line-3");

function toggle_menu() {
  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
    line_1.style.transform = "translate3d(0px, 5.3px, 0px) rotate(45deg)";
    line_2.classList.add("hidden");
    line_3.style.transform = "translate3d(0px, -5.3px, 0px) rotate(-45deg)";
  } else {
    menu.classList.add("hidden");
    line_1.style.transform = "translate3d(0px, 0px, 0px) rotate(0deg)";
    line_2.classList.remove("hidden");
    line_3.style.transform = "translate3d(0px, 0px, 0px) rotate(0deg)";
  }
}
