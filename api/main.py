from flask import Flask, request
from flask_cors import CORS
import uuid
from genRag import answerQuestion
from model import overall_emotion, overall_sentiment

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


@app.route("api/query", method=["POST"])
def answerQuery():
    json = request.json
    if (json == None):
        return {"success": False}
    result = answerQuestion(json["query"])
    return {"answer": result}, 200


if __name__ == "__main__":
    app.run()
