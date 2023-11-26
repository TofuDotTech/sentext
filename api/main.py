from flask import Flask, request
from flask_cors import CORS
import uuid
from api.model import overall_emotion, overall_sentiment

from genAi import genDescription

app = Flask(__name__)
CORS(app)


@app.route("/api/emotions", methods=["POST"])
def predictEmotion():
    json = request.json
    if (json == None):
        return {"success": False}
    result = genDescription(json['platform'], json['comments'])
    sentiment = overall_sentiment(json['comments'])
    emotion = overall_emotion(json['comments'])
    return {"message": result, 'sentiment': sentiment, 'emotion': emotion}, 200


if __name__ == "__main__":
    app.run()
