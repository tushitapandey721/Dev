from flask import Flask, request, jsonify
import openai
import os

# Set up OpenAI API key
openai.api_key = 'YOUR_OPENAI_API_KEY'  # Replace with your OpenAI API key

app = Flask(__name__)

@app.route('/generate-theme', methods=['POST'])
def generate_theme():
    data = request.get_json()
    theme = data.get('theme')

    if not theme:
        return jsonify({'error': 'No theme provided'}), 400

    # Generate text description using GPT
    try:
        # Query GPT-3 for a description of the theme
        gpt_response = openai.Completion.create(
            model="text-davinci-003",  # Or use another model if necessary
            prompt=f"Describe a {theme} in detail.",
            max_tokens=100
        )
        description = gpt_response.choices[0].text.strip()

        # Use DALL·E to generate an image based on the theme
        dalle_response = openai.Image.create(
            prompt=theme,
            n=1,
            size="1024x1024"
        )
        image_url = dalle_response['data'][0]['url']

        return jsonify({
            'description': description,
            'image_url': image_url
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
