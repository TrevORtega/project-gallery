from flask import Flask, request, jsonify
from pathlib import Path
import json
import urllib.request

DOWNLOAD_LOCATION = Path('../data')

app = Flask(__name__)

documentation = {
    'save-project': 'Takes in project details defined in SubmissionModal and saves to file'
}


@app.route('/api/')
def api():
    return '\n'.join(f'{k}: {v}' for k, v in documentation.items())

@app.route('/api/save-project', methods=["POST"])
def save_project():
    save_location = DOWNLOAD_LOCATION / 'projects/jsons'
    # Only values we are intersted in
    keys = ['name', 'description', 'sourceLink', 
        'imageUrls', 'videoUrl', 'code', 'language', 'username']

    input_json = request.get_json(force=True)
    # ID is the number of current projects + 1
    id = str(len(list(save_location.iterdir())) + 1) + '.json'

    #for i, image_url in enumerate(input_json['imageUrls']):
    #    urllib.request.urlretrieve(image_url, 
    #        DOWNLOAD_LOCATION / f'projects/images/{id}-{i}.jpeg')

    with open(save_location / id, 'w+') as f:
        dict_values = {k: input_json[k] for k in keys}
        json.dump(dict_values, f)

    response = jsonify(input_json)
    # Fixes CORS errors
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response 

@app.route('/api/load-project', methods=["POST"])
def get_project():
    # Only value we are intersted in
    key = 'id'
    input_json = request.get_json(force=True)

    # ID is the number of current projects + 1
    id = input_json[key]

    project_path = str(DOWNLOAD_LOCATION / 'projects/jsons' / f'{id}.json')

    values = None
    try:
        with open(project_path) as f:
            values = json.load(f)
    except FileNotFoundError:
        pass
    
    if values is None:
        values = {'error': 'file does not exist'}    

    response = jsonify(values)
    # Fixes CORS errors
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response 

@app.route('/api/search-projects', methods=["POST"])
def search_projects():
    key = 'query'
    input_json = request.get_json(force=True)

    # Get query string, turn it to lower case list of words
    query = input_json[key].lower().split(' ')

    project_locations = DOWNLOAD_LOCATION / 'projects/jsons'
    project_dict = {}
    # Go through every project we have
    for project in project_locations.iterdir():
        proj_json = json.load(open(project))

        # Only search name, description, and languages are searched 
        searchables = [
            proj_json['name'].lower(),
            proj_json['description'].lower(),
            ' '.join(l.lower() for l in proj_json['language'])
        ]

        print(searchables)
        # Count how many times any of the search queries appear
        # in the searchable text 
        total = sum([1 for q in query 
                    for s in searchables 
                    if q in s])

        # If we find something, put in dictionary
        # if project 3.json has 2 instances, we get the result:
        # {'3': 2}
        if total > 0:
            project_dict[project.stem] = total

    # Return as json (don't change this)
    response = jsonify({'projects': project_dict})
    # Fixes CORS errors
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
   
@app.route('/api/save-profile', methods=["POST"])
def save_profile():
    save_location = DOWNLOAD_LOCATION / 'profiles'
    # Only values we are intersted in
    keys = ['username', 'about', 'experience', 'education', 'email']

    input_json = request.get_json(force=True)
    # ID is the number of current projects + 1
    id = input_json['username'] + '.json'

    #for i, image_url in enumerate(input_json['imageUrls']):
    #    urllib.request.urlretrieve(image_url, 
    #        DOWNLOAD_LOCATION / f'projects/images/{id}-{i}.jpeg')

    with open(save_location / id, 'w+') as f:
        dict_values = {k: input_json[k] for k in keys}
        json.dump(dict_values, f)

    response = jsonify(input_json)
    # Fixes CORS errors
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response 

@app.route('/api/load-profile', methods=["POST"])
def get_profile():
    # Only value we are intersted in
    key = 'username'
    input_json = request.get_json(force=True)

    # ID is the number of current projects + 1
    username = input_json[key]

    project_path = str(DOWNLOAD_LOCATION / 'profiles' / f'{username}.json')

    values = None
    try:
        with open(project_path) as f:
            values = json.load(f)
    except FileNotFoundError:
        pass
    
    if values is None:
        values = {'error': 'file does not exist'}    

    response = jsonify(values)
    # Fixes CORS errors
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response 

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=1111)