import re
import nltk
from nltk import word_tokenize
from nltk.corpus import stopwords
import spacy
from nltk.stem.wordnet import WordNetLemmatizer
nltk.download('punkt')
nltk.download('wordnet')
nltk.download('omw-1.4')
lemmatizer = WordNetLemmatizer()
nltk.download('stopwords')
stop_words_en = set(stopwords.words('english'))
nlp = spacy.load('en_core_web_lg')


def vectorize(text):
    text = str(text)
    text = text.lower()
    text = text.strip()
    text = text.replace('\n', '')
    text = text.replace('\t', '')
    text = re.sub(r'[^\w\s]', '', text)
    text = word_tokenize(text)
    text = [palabra for palabra in text if palabra not in stop_words_en]
    text = [lemmatizer.lemmatize(palabra) for palabra in text]
    text = ' '.join(text)
    vector = nlp(text).vector
    vector = vector.reshape(1, 300, 1)
    return vector
