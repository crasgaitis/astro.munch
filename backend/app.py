from flask import Flask, request, jsonify, send_from_directory
from simulation_handler import process_simulation_params
from flask_cors import CORS
import os

app = Flask(__name__, static_folder="../frontend", static_url_path="/static")
CORS(app) 

@app.route('/')
def home():
    return send_from_directory(os.path.join(app.static_folder), 'index.html')

@app.route('/submit_parameters', methods=['POST'])
def submit_parameters():
    try:
        data = request.get_json()  
        print(data)
        response = process_simulation_params(data)
        return jsonify({"status": "success", "message": "Parameters received", "data": response}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
