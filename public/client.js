const socket = io();

let name = "";
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message_area");


// for enter your name
do {
  name = prompt("Please enter your name");
} while (!name);
socket.emit("user-joined", name);

// Text box message
textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
    e.target.value = "";
  }
});

// Send message
function sendMessage(message) {
  let msg = {
    user: name,
    message: message.trim(),
  };

  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrolltoTopbottom();


  // Send to Server
  socket.emit("message", msg);
}

// Append Message
function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;

  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

// Append Message for user joined
function appendMsgJoined(msg, type) {
  let mainDivjoin = document.createElement("div");
  let className = type;
  mainDivjoin.classList.add(className, "message");

  let markup = `
    <p>${msg.message}</p>
    `;

    mainDivjoin.innerHTML = markup;
  messageArea.appendChild(mainDivjoin);
 

}

// Received Message
socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrolltoTopbottom();
 
});


// User joined msg
socket.on("user-joined", (userName) => {
  let mymsg = {
  user: userName,
    message: `${userName} has joined the chat`,
  };
  appendMsgJoined(mymsg, "incoming");


});

// scrolltoTop
function scrolltoTopbottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
