from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Serve HTML page
@app.route('/')
def home():
    return render_template('index.html')

# API endpoint
@app.route('/api/data', methods=['GET', 'POST'])
def handle_data():
    if request.method == 'GET':
        return jsonify({'message': 'Hello from Python backend!'})
    elif request.method == 'POST':
        data = request.get_json()
        print("Received from frontend:", data)
        return jsonify({'status': 'success', 'received': data})

if __name__ == '__main__':
    app.run(debug=True, port=5000)