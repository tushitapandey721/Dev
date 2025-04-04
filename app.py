import openai
from flask import Flask, request, jsonify

app = Flask(__name__)

# Set your OpenAI API Key
openai.api_key = "your-openai-api-key"

@app.route('/generate-theme', methods=['POST'])
def generate_theme():
    try:
        # Get the JSON data from the request
        data = request.get_json()
        theme = data.get('theme', '')

        if not theme:
            return jsonify({'error': 'No theme provided'}), 400

        # Use the new ChatCompletion API to generate text based on the theme
        response = openai.ChatCompletion.create(
            model="gpt-4",  # You can use GPT-4 or other models
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": f"Describe a {theme} theme."}
            ]
        )

        # Extract the generated message from the response
        message = response['choices'][0]['message']['content']

        # Example response: Return the generated description and an image URL
        return jsonify({
            'description': message,
            'image_url': 'https://placekitten.com/400/400'  # Just a placeholder for testing
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
