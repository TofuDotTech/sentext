<img src="https://github.com/user-attachments/assets/ed574a6e-46a1-41af-8c82-7f35f3b10e69" alt="drawing" width="400"/>

---

In the dynamic landscape of digital communication, the ability to decipher sentiments expressed in textual content has become increasingly paramount. 
This project encapsulates a solution to this burgeoning need—a Chrome extension leveraging Natural Language Processing (NLP) for sentiment analysis of comments on tweets. 
This extension provides a concise summary and categorizing the overall sentiment and emotions expressed within the comments.

---

## Neural networks
Two separate CNNs were trained in order to classify between 5 different emotions (sadness, joy, love, anger and fear) and between positive, negative and neutral sentiment.

## Large Language Model
Large Language Models (LLMs) were employed for two primary tasks:
- Summarization: The LLM, specifically the gpt-3.5-turbo by OpenAI, was utilized to provide concise summaries of user comments on a post in addition to the classification made by the previously discussed models.
- Retrieval-Augmented Generation (RAG) for question answering: Leveraging the capabilities of the gpt-3.5-turbo in conjunction with retrieval-augmented generation, our system is adept at answering user queries related to all posts analyzed by the extension. For the transformation and storing of comments into embeddings, we integrated Pinecone as our vector store and the text-embedding-ada-002 model.

![image](https://github.com/user-attachments/assets/0c146d1e-9a8c-40f9-a170-3f2dbf3e1fb7)

![image](https://github.com/user-attachments/assets/0eb4c380-aee7-42de-a8db-aa32d336b96b)

