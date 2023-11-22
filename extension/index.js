const title = document.querySelector("#title");
const button = document.querySelector("#main-button");
const analyze = new CustomEvent("Analyze", { detail: "message" });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.response) {
    console.log("Mensaje recibido en popup.js:", request.response);
  }
});

button.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "analyze" });
  });
});
