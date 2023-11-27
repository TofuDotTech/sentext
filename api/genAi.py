from operator import itemgetter
from langchain.chat_models import ChatOpenAI
from dotenv import load_dotenv
from langchain.schema import StrOutputParser
from langchain.prompts import ChatPromptTemplate
from langchain.schema.runnable import RunnableLambda
load_dotenv()

systemTemplate = """You are a helpful assistant that based on a list
of user comments to a post on {platform} generates a description of
what the users think about the post and the overall feeling to it in NO MORE THAN ONE PARAGRAPH."""

humanTemplate = "{comments}"

chat_prompt = ChatPromptTemplate.from_messages([
    ("system", systemTemplate),
    ("human", humanTemplate),
])


def parseComments(comments):
    return '\n'.join([f'- {comment}' for comment in comments])


chain = {"comments": itemgetter("comments") | RunnableLambda(
    parseComments), "platform": itemgetter("platform")} | chat_prompt | ChatOpenAI() | StrOutputParser()


def genDescription(platform, comments):
    return chain.invoke({"platform": platform, "comments": comments})
