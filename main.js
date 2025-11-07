import './style.css';
import { getGifs } from './getGifs.js';

const input = document.getElementById('searchInput');
const button = document.getElementById('searchBtn');
const container = document.getElementById('gifContainer');
const paginationDiv = document.getElementById('pagination');

button.addEventListener('click', () => {
  const query = input.value.trim();
  if (query !== "") {
    getGifs(query, container, paginationDiv);
  } else {
    container.innerHTML = `<p class="alert">⚠️ Escribe un tema para buscar GIFs.</p>`;
    paginationDiv.innerHTML = "";
  }
});
