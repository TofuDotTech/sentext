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

    /* const response = await fetch("http://127.0.0.1:5000/api/emotions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comments: comments,
        platform: "X",
      }),
    });

    response.json().then((data) => {
      console.log(data);
      console.log();
      console.log(JSON.stringify(data));

      chrome.runtime.sendMessage({
        data: data,
      });
    }); */

    setTimeout(() => {
      chrome.runtime.sendMessage({
        data: {
          message:
            "This is a test that is going to determine if asdfkjasdf kasdfjk ajdkfjasdfk ajksdfjlk alsdfasdkf jkasdfjkasdf jalsdjflka jkjflaksjdflk jalskdfj kajsdflkj alksjdflkjasd jasjdfkl jaslkdfjlk ajsdkfj lkajsdlkfj aklsdjflk jaslkdfjlk jalkdfjlka jlkdjfa sz",
          sentiment: "positive",
          emotion: "happiness",
        },
      });
    }, 2000);
  }
});
