const html = document.querySelector('html');
const mode = document.querySelector('#mode');

// tombol mode di click..
let theme = true; // default dalam kondisi light
mode.addEventListener('click', () => {
  if (theme) {
    html.classList.add('dark');
    renderTheme('light', false);
  } else {
    html.classList.remove('dark');
    renderTheme('dark', true);
  }
});

function renderTheme(text, condition) {
  theme = condition;
  mode.innerHTML = `
    <i class="fa-regular fa-moon -rotate-12"></i>
    <h4 class="text-sm font-semibold ml-2">${text} mode</h4>
  `;
}

// action dropdown
const titleOutput = document.querySelector('.title-output');
const btnAnimate = document.getElementById('btn-animate');
const regions = document.querySelectorAll('li');
const options = document.querySelector('.options');
// jika dropdown di click
btnAnimate.addEventListener('click', closeOpenDropdown);
regions.forEach((region) => {
  region.addEventListener('click', () => {
    const regionTextData = region.innerText;
    titleOutput.innerText = regionTextData;
    // tutup dropdown jika pilih data region
    setTimeout(closeOpenDropdown, 100);
  });
});
// animate dropdown nya
function closeOpenDropdown() {
  btnAnimate.classList.toggle('active-btn');
  options.classList.toggle('active-options');
}

// lanjut besok aja........
