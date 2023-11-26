chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "analyze") {
    // cambiar para encontrar comentarios de insta
    // const prueba = document.querySelectorAll("[dir='auto'][role='button']");

    /* prueba.forEach((node) => {
      console.log("Node: " + node.innerText);
    }); */

    chrome.runtime.sendMessage({ response: "Mensaje desde content_script.js" });
  }
});
