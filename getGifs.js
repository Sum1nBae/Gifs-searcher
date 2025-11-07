let currentPage = 1; // Página inicial
const limit = 10;    // GIFs por página

export const getGifs = async (searchTerm, container, buttonsContainer) => {
  const apiKey = "8LOPSH1WHkrqycQ40DpiQkBthLcAPioi";

  try {
    const offset = (currentPage - 1) * limit;
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=${limit}&offset=${offset}&rating=g&lang=es`
    );
    const { data, pagination } = await response.json();

    container.innerHTML = "";

    if (data.length === 0) {
      container.innerHTML = `<p class="alert">😕 No se encontraron GIFs para "${searchTerm}".</p>`;
      buttonsContainer.innerHTML = "";
      return;
    }

    // Mostrar los GIFs obtenidos
    data.forEach(item => {
      const img = document.createElement("img");
      img.src = item.images.fixed_height.url;
      img.alt = item.title;
      container.appendChild(img);
    });

    // Crear botones de paginación
    const totalResults = pagination.total_count;
    const hasNextPage = offset + limit < totalResults;
    const hasPrevPage = currentPage > 1;

    buttonsContainer.innerHTML = `
      <button id="prevBtn" ${!hasPrevPage ? "disabled" : ""}>⬅️ Anterior</button>
      <span>Página ${currentPage}</span>
      <button id="nextBtn" ${!hasNextPage ? "disabled" : ""}>Siguiente ➡️</button>
    `;

    // Listeners para los botones
    document.getElementById("prevBtn")?.addEventListener("click", () => {
      if (hasPrevPage) {
        currentPage--;
        getGifs(searchTerm, container, buttonsContainer);
      }
    });

    document.getElementById("nextBtn")?.addEventListener("click", () => {
      if (hasNextPage) {
        currentPage++;
        getGifs(searchTerm, container, buttonsContainer);
      }
    });

  } catch (error) {
    console.error("Error al obtener los GIFs:", error);
    container.innerHTML = `<p class="alert">❌ Error al cargar los GIFs. Intenta nuevamente.</p>`;
  }
};
