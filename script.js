// Function to apply AI theme and get AI-generated effects or images
async function applyTheme() {
    const themeInput = document.getElementById('themeInput').value.trim().toLowerCase();
    const themeResultDiv = document.getElementById('themeResult');
    
    // Check if the input is empty
    if (!themeInput) {
        themeResultDiv.innerHTML = "<p>Please enter a valid theme.</p>";
        return;
    }

    // Disable the button while fetching
    document.querySelector('button').disabled = true;
    themeResultDiv.innerHTML = "<p>Loading...</p>";

    // Call the backend API to get theme-related effects or image
    try {
        const response = await fetch('http://localhost:5000/generate-theme', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ theme: themeInput })
        });

        const data = await response.json();

        if (data.error) {
            themeResultDiv.innerHTML = `<p>Error: ${data.error}</p>`;
        } else {
            if (data.image_url) {
                themeResultDiv.innerHTML = `<img src="${data.image_url}" alt="${themeInput} theme image">`;
            } else {
                themeResultDiv.innerHTML = `<p>${data.description}</p>`;
            }
        }
    } catch (error) {
        themeResultDiv.innerHTML = "<p>Error occurred while fetching theme data. Please try again later.</p>";
    } finally {
        // Enable the button after fetching
        document.querySelector('button').disabled = false;
    }
}
