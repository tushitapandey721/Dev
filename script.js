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
        render3DEffect(data.image_url); // Use the URL for the background or other 3D objects
      }
    } catch (error) {
      themeDescription.innerHTML = `<p>Error occurred while fetching theme data. Please try again later.</p>`;
    }
  }

  // Example of setting up a 3D effect using Three.js
  function render3DEffect(imageUrl) {
    // Create a new Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(300, 300);
    themeVisual.innerHTML = ''; // Clear previous 3D content
    themeVisual.appendChild(renderer.domElement);

    // Create a cube geometry
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(imageUrl) // Load a texture from the provided image URL
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    }

    animate();
  }
});
