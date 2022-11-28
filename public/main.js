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
