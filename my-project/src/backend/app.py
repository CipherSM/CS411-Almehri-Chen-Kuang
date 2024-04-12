# from flask import Flask, jsonify
# from flask_cors import CORS
# import diffbotapi  # Assuming script1.py contains a function fetchData1()
# import cohereapi  # Assuming script2.py contains a function fetchData2()

# app = Flask(__name__)
# CORS(app)

# @app.route('/api/data1')
# def get_data1():
#     data = script1.fetchData1()
#     return jsonify(data)

# @app.route('/api/summary')
# def get_summary():
#     data = script2.fetchData2()
#     return jsonify(data)

# if __name__ == '__main__':
#     app.run(debug=True)

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
