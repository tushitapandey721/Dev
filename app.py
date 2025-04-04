@app.route('/generate-theme', methods=['POST'])
def generate_theme():
    data = request.get_json()
    theme = data.get('theme')

    # Dummy data for theme effects (you would replace this with actual AI processing)
    if theme == 'retro':
        return jsonify({
            'description': 'A nostalgic retro theme with neon colors.',
            'image_url': 'https://example.com/retro_image.jpg'
        })
    elif theme == 'vintage':
        return jsonify({
            'description': 'A classic vintage theme with a warm, sepia tone.',
            'image_url': 'https://example.com/vintage_image.jpg'
        })
    elif theme == 'futuristic':
        return jsonify({
            'description': 'A sleek futuristic theme with glowing elements.',
            'image_url': 'https://example.com/futuristic_image.jpg'
        })
    else:
        return jsonify({'error': 'Theme not recognized'}), 400
