from langchain.docstore.document import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Pinecone
from langchain.schema import StrOutputParser
from langchain.prompts import ChatPromptTemplate
from langchain.chat_models import ChatOpenAI
from langchain.schema.runnable import RunnablePassthrough
import pinecone
from datetime import date
import os
from dotenv import load_dotenv
load_dotenv()

embeddings = OpenAIEmbeddings()
pinecone.init(
    api_key=str(os.getenv("PINECONE_API_KEY")),  # find at app.pinecone.io
    environment="gcp-starter",  # next to api key in console
)
index = pinecone.Index("sentext")
vectorstore = Pinecone(index, embeddings, "text")
retriever = vectorstore.as_retriever(search_kwargs={"k": 5})

systemTemplate = """You are a social media manager assistant for question-answering tasks that provides helpful insights. Use the following pieces of retrieved context to answer the question, also dates are provided for you to answer time related questions. If you don't know the answer, just say that you don't know. Use three sentences maximum and keep the answer concise."""

humanTemplate = """Question: {question}\nContext: {context}\nCurrent date: {date}"""

prompt = ChatPromptTemplate.from_messages([
    ("system", systemTemplate),
    ("human", humanTemplate),
])


def format_docs(docs):
    return "\n\n".join(f"{doc.metadata['date']}: {doc.page_content}" for doc in docs)


def todayDate(query):
    return str(date.today())


rag_chain = (
    {"date": todayDate, "context": retriever |
        format_docs, "question": RunnablePassthrough()}
    | prompt
    | ChatOpenAI()
    | StrOutputParser()
)


def loadComments(comments):
    docs = []
    for comment in comments:
        metadata = {"date": str(date.today())}
        docs.append(Document(page_content=comment, metadata=metadata))
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=100,
        chunk_overlap=20,
        length_function=len,
        is_separator_regex=False,
    )
    texts = text_splitter.transform_documents(docs)
    vectorstore.add_documents(texts)


def answerQuestion(query):
    return rag_chain.invoke(query)
