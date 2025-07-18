from flask import Flask, redirect, request, jsonify, send_from_directory
import urllib
from simulation_handler import process_simulation_params
from flask_cors import CORS
import os
import json

app = Flask(__name__, static_folder="../frontend", static_url_path="")
CORS(app) 

@app.route('/')
def home():
    return send_from_directory(os.path.join(app.static_folder), 'index.html')

@app.route('/submit_parameters', methods=['POST'])
def submit_parameters():
    data = request.get_json()  
    print(data)
    response = process_simulation_params(data)
    params_query = urllib.parse.urlencode(response)
    # return redirect(os.path.join(app.static_folder), f'sim.html?{params_query}')
    return jsonify({"status": "success", "message": "Parameters received", 
                    "data": response, "redirect": f"/sim.html?{params_query}"}), 200

if __name__ == "__main__":
    app.run(debug=True)