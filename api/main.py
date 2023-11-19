from flask import Flask, request
from flask_cors import CORS
import uuid

from genAi import genDescription

app = Flask(__name__)
CORS(app)


@app.route("/api/emotions", methods=["POST"])
def predictEmotion():
    json = request.json
    if (json == None):
        return {"success": False}
    result = genDescription(json['platform'], json['comments'])
    return {"message": result}


if __name__ == "__main__":
    app.run()
