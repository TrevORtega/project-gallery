from flask import Flask, request, jsonify
from pathlib import Path
import json

DOWNLOAD_LOCATION = Path('../data')

app = Flask(__name__)

documentation = {
    'save-project': 'Takes in project details defined in SubmissionModal and saves to file'
}


@app.route('/api/')
def api():
    return '\n'.join(f'{k}: {v}' for k, v in documentation.items())

@app.route('/api/save-project', methods=["POST"])
def save_profile():
    # Only values we are intersted in
    keys = ['name', 'description', 'sourceLink', 
        'imageUrls', 'videoUrl', 'code', 'language']
    input_json = request.get_json(force=True)

    # ID is the number of current projects + 1
    id = str(len(list(DOWNLOAD_LOCATION.iterdir())) + 1) + '.json'

    with open(DOWNLOAD_LOCATION / id, 'w+') as f:
        dict_values = {k: input_json[k] for k in keys}
        json.dump(dict_values, f)

    response = jsonify(input_json)
    # Fixes CORS errors
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response 

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=1111)