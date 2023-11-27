from flask import Flask, request
from flask_cors import CORS
from genRag import answerQuestion, loadComments
from model import overall_emotion, overall_sentiment
from threading import Thread

from genAi import genDescription

app = Flask(__name__)
CORS(app)


@app.route("/api/emotions", methods=["POST"])
async def predictEmotion():
    json = request.json
    if (json == None):
        return {"success": False}
    Thread(target=loadComments, args=(json['comments'], )).start()
    result = genDescription(json['platform'], json['comments'])
    sentiment = overall_sentiment(json['comments'])
    emotion = overall_emotion(json['comments'])
    return {"message": result, 'sentiment': sentiment, 'emotion': emotion}, 200


@app.route("/api/query", methods=["POST"])
def answerQuery():
    json = request.json
    if (json == None):
        return {"success": False}
    result = answerQuestion(json["query"])
    return {"answer": result}, 200


if __name__ == "__main__":
    app.run()
