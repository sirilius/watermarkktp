window.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('.copyright .year');
  el.innerText = new Date().getFullYear();
});
