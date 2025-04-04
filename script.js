document.addEventListener("DOMContentLoaded", () => {
  const themeElements = document.querySelectorAll(".theme");
  const themeDescription = document.getElementById("theme-description");
  const themeVisual = document.getElementById("theme-visual");

  themeElements.forEach((themeElement, index) => {
    themeElement.style.setProperty("--i", index);
    themeElement.addEventListener("click", () => {
      const selectedTheme = themeElement.dataset.theme;
      fetchThemeEffect(selectedTheme);
    });
  });

  // Fetch theme effect from the backend
  async function fetchThemeEffect(theme) {
    try {
      const response = await fetch('http://127.0.0.1:5000/generate-theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme })
      });

      const data = await response.json();

      if (data.error) {
        themeDescription.innerHTML = `<p>Error: ${data.error}</p>`;
        themeVisual.innerHTML = '';
      } else {
        themeDescription.innerHTML = `<p>${data.description}</p>`;
        // Here we could use WebGL or CSS to show 3D effects dynamically
        themeVisual.style.backgroundImage = `url(${data.image_url})`; // Just an example, you can customize it further
      }
    } catch (error) {
      themeDescription.innerHTML = `<p>Error occurred while fetching theme data. Please try again later.</p>`;
    }
  }
});
