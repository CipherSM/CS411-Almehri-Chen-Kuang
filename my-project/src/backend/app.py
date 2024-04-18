from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/hello')
def hello():
    # Sample data that might be used in the HelloSection component
    data = {
        'greeting': 'Hello, welcome to our application!',
        'description': 'This is a sample application demonstrating integration between Flask and React.'
    }
    return jsonify(data)

@app.route('/api/stories')
def stories():
    # Sample data for the TopStories component
    stories = [
        {'id':1,'title': 'Story 1', 'content': 'Content of story 1'},
        {'id':2,'title': 'Story 2', 'content': 'Content of story 2'}
    ]
    return jsonify(stories)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
