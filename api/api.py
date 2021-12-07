from flask import Flask, request, jsonify
from pathlib import Path
from random import randint, randrange
import json
import requests
import os

DOWNLOAD_LOCATION = "../data/"
if not os.path.isdir(DOWNLOAD_LOCATION):
    os.mkdir(DOWNLOAD_LOCATION)


app = Flask(__name__)

documentation = {
    'save-project': 'Takes in project details defined in SubmissionModal and saves to file'
}


@app.route('/api/')
def api():
    return '\n'.join(f'{k}: {v}' for k, v in documentation.items())

@app.route('/api/save-project', methods=["POST"])
def save_project():
    save_location = DOWNLOAD_LOCATION + "projects/jsons/"
    print(save_location)

    # create directory if it doesn't exist
    if not os.path.isdir(save_location):
        os.makedirs(save_location)

    # Only values we are intersted in
    keys = ['name', 'description', 'sourceLink', 
        'imageUrls', 'videoUrl', 'code', 'language', 'username']

    input_json = request.get_json(force=True)

    # ID is a random 8 digit number
    id = str(randint(10**7, (10**8)-1)) + '.json'

    if not os.path.isdir(DOWNLOAD_LOCATION + "projects/imgs/"):
        os.makedirs(DOWNLOAD_LOCATION + "projects/imgs/")

    '''
    # Image saving
    for i, image_url in enumerate(input_json['imageUrls']):
        img_data = requests.get(image_url.replace('blob:', '')).content
        metal_url = DOWNLOAD_LOCATION + str(f'projects/imgs/{id[:-5]}-{i}.jpeg')

        with open(metal_url, 
                'wb') as handler:
            handler.write(img_data)
            input_json['imageUrls'][i] = str(metal_url) 
    '''

    with open(os.path.join(save_location, id), 'w+') as f:
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

    project_path = DOWNLOAD_LOCATION + "projects/jsons/" + str(f'{id}.json')

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

    project_locations = DOWNLOAD_LOCATION + "projects/jsons/"
    project_dict = {}
    # Go through every project we have
    for project_name in os.listdir(project_locations):
        project = os.path.join(project_locations, project_name)
        proj_json = json.load(open(project))

        # Only search name, description, and languages are searched 
        searchables = [
            proj_json['name'].lower(),
            proj_json['description'].lower(),
            ' '.join(l.lower() for l in proj_json['language'])
        ]

        # Count how many times any of the search queries appear
        # in the searchable text 
        total = sum([1 for q in query 
                    for s in searchables 
                    if q in s])

        # If we find something, put in dictionary
        # if project 3.json has 2 instances, we get the result:
        # {'3': 2}
        if total > 0:
            project_dict[project_name.split('.')[0]] = total

    # Return as json (don't change this)
    response = jsonify({'projects': project_dict})
    # Fixes CORS errors
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
   
@app.route('/api/search-projects-profile', methods=["POST"])
def search_projects():
    key = 'query'
    input_json = request.get_json(force=True)

    # Get query string, turn it to lower case list of words
    query = input_json[key]

    project_locations = DOWNLOAD_LOCATION + "projects/jsons/"
    project_list = []
    # Go through every project we have
    for project_name in os.listdir(project_locations):
        project = os.path.join(project_locations, project_name)
        proj_json = json.load(open(project))

        # Find if the username is in the project json 
        if 'username' in proj_json and proj_json['username'] == query:
            project_list.append(project_name.split('.')[0])

    # Return as json (don't change this)
    response = jsonify({'projects': project_list})
    # Fixes CORS errors
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/save-profile', methods=["POST"])
def save_profile():
    save_location = DOWNLOAD_LOCATION + 'profiles/'

    if not os.path.isdir(save_location):
        os.mkdir(save_location)

    # Only values we are intersted in
    keys = ['username', 'about', 'experience', 'education', 'email']

    input_json = request.get_json(force=True)
    # ID is the number of current projects + 1
    id = str(input_json['username']) + ".json"

    #for i, image_url in enumerate(input_json['imageUrls']):
    #    urllib.request.urlretrieve(image_url, 
    #        DOWNLOAD_LOCATION / f'projects/images/{id}-{i}.jpeg')

    with open(os.path.join(save_location, id), 'w+') as f:
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

    project_path = str(DOWNLOAD_LOCATION) + "/profiles/" + str(f'{username}.json')

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