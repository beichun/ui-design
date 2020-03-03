from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

data = []

@app.route('/')
def hello_world():
   return render_template('index.html', data=data)


if __name__ == '__main__':
   app.run(host = '127.0.0.2' ,debug = True)