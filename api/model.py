import tensorflow as tf
import numpy as np
import pandas as pd
from functions import vectorize

sentiment_model = tf.keras.models.load_model(
    '../modelo/sentiment_classifier.h5')
emotion_model = tf.keras.models.load_model('../modelo/model_emotion.h5')

sentiment_map = ['neutral', 'negative', 'positive']
emotion_map = ['sadness', 'joy', 'love', 'anger', 'fear']


def predict_sentiment(text):
    vector = vectorize(text)
    prediction = np.argmax(sentiment_model.predict(vector), axis=-1)[0]
    return sentiment_map[prediction]


def predict_emotion(text):
    vector = vectorize(text)
    prediction = np.argmax(emotion_model.predict(vector), axis=-1)[0]
    return emotion_map[prediction]


def overall_sentiment(texts):
    predictions = []
    for text in texts:
        predictions.append(predict_sentiment(text))
    serie = pd.Series(predictions)
    return serie.value_counts().index[0]


def overall_emotion(texts):
    predictions = []
    for text in texts:
        predictions.append(predict_emotion(text))
    serie = pd.Series(predictions)
    return serie.value_counts().index[0]
