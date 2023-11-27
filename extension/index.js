// Before clicking analyze
const content = document.querySelector("#content");
const titleImg = document.querySelector("#title-img");
const description = document.querySelector("#description");
const button = document.querySelector("#main-button");

// After clicking analyze
const emotion = document.querySelector("#emotion");
const summary = document.querySelector("#summary");
const summaryContent = document.querySelector("#summary-content");
const responseHeader = document.querySelector("#response-header");
const handImg = document.querySelector("#hand-img");
const handCircle = document.querySelector("#hand-circle");
const sentiment = document.querySelector("#sentiment");
const chatDiv = document.querySelector("#chat-div");
const chatPrompt = document.querySelector("#chat-prompt");
const askButton = document.querySelector("#ask-button");
const anotherContent = document.querySelector("#another-content");

const analyze = new CustomEvent("Analyze", { detail: "message" });
let clickable = true;

let lastQuery = "";

const list = document.querySelector("#list");

function modifyExtensionElements(messageText, sentimentText, emotionText) {
  if (sentimentText === "neutral") {
    document.body.style.backgroundColor = "#E8EBF1";
    handCircle.classList.add("hand-circle-neutral");
    handImg.classList.add("hand-img-neutral");
    sentiment.textContent =
      "Nothing to say. This post is getting a pretty neutral response";
    sentiment.classList.add("sentiment-neutral");
    askButton.classList.add("ask-neutral");
    chatPrompt.classList.add("chat-prompt-neutral");
  }

  if (sentimentText === "positive") {
    document.body.style.backgroundColor = "#E3EBE2";
    handCircle.classList.add("hand-circle-positive");
    handImg.classList.add("hand-img-positive");
    sentiment.textContent = "Nice! This post is getting a positive response";
    sentiment.classList.add("sentiment-positive");
    askButton.classList.add("ask-positive");
    chatPrompt.classList.add("chat-prompt-positive");
  }

  if (sentimentText === "negative") {
    document.body.style.backgroundColor = "#F1E8EB";
    handCircle.classList.add("hand-circle-negative");
    handImg.classList.add("hand-img-negative");
    sentiment.textContent = "Oops... This post is getting a negative response";
    sentiment.classList.add("sentiment-negative");
    askButton.classList.add("ask-negative");
    chatPrompt.classList.add("chat-prompt-negative");
  }

  chatDiv.classList.remove("hidden");

  titleImg.classList.add("hidden");
  button.classList.add("hidden");

  responseHeader.classList.remove("hidden");

  content.classList.add("content-size-big");
  content.classList.remove("content-size-normal");
  description.classList.remove("loading-text");
  description.classList.add("hidden");

  emotion.textContent = emotionText;
  summary.textContent = messageText;

  summaryContent.style.display = "flex";
  anotherContent.style.display = "flex";
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.data) {
    console.log("Mensaje recibido en popup.js:", request.data);
    modifyExtensionElements(
      `Summary: ${request.data.message}`,
      `${request.data.sentiment}`,
      `Emotion: ${
        request.data.emotion[0].toUpperCase() +
        request.data.emotion.substring(1)
      }`
    );
    clickable = true;
  }
});

button.addEventListener("click", () => {
  if (clickable) {
    clickable = false;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "analyze" });
      description.classList.add("loading-text");
    });
  }
});

async function makeQuery() {
  let query = chatPrompt.value;
  if (query !== "" && query !== lastQuery) {
    askButton.classList.add("loading-ask-button");

    const response = await fetch("http://127.0.0.1:5000/api/query", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    });

    response.json().then((data) => {
      console.log(data);
      const queryItem = document.createElement("li");
      queryItem.textContent = `Prompt: ${query}`;
      queryItem.classList.add("query");
      list.appendChild(queryItem);

      const answerItem = document.createElement("li");
      answerItem.textContent = `Answer: ${data.answer}`;
      answerItem.classList.add("answer");
      list.appendChild(answerItem);

      askButton.classList.remove("loading-ask-button");
    });

    lastQuery = chatPrompt.value;
    chatPrompt.value = "";
  }
}

askButton.addEventListener("click", () => {
  makeQuery();
});

chatPrompt.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    makeQuery();
  }
});
