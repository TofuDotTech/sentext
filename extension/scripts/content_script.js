chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "analyze") {
    const prueba = document.querySelectorAll("[data-testid='tweetText']");
    console.log(prueba);
    for (var i = 0; i < prueba.length; i++) {
      console.log(prueba[i].innerText);
    }

    chrome.runtime.sendMessage({ response: "Mensaje desde content_script.js" });
  }
});
