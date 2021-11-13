from flask import Flask, request, jsonify

app = Flask(__name__)

documentation = {
    'save-project': 'Takes in project details defined in SubmissionModal and saves to file'
}


@app.route('/api/')
def api():
    return '\n'.join(f'{k}: {v}' for k, v in documentation)

@app.route('/api/save-profile', methods=["POST"])
def save_profile():
     input_json = request.get_json(force=True) 
     print(input_json)
     return input_json 

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=1111)