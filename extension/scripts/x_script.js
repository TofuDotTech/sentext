chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === "analyze") {
    const commentsNodes = document.querySelectorAll(
      "[data-testid='tweetText']"
    );
    var comments = [];

    commentsNodes.forEach((node) => {
      comments.push(node.innerText);
    });

    console.log(comments);

    const response = await fetch("http://127.0.0.1:5000/api/emotions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {
        comments: comments,
        platform: "X",
      },
    });

    response.json().then((data) => {
      console.log(JSON.stringify(data));

      chrome.runtime.sendMessage({
        // response: "Message from content_script.js",
        data: data,
      });
    });
  }
});
