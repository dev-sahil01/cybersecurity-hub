// 🔹 Basic Chatbot Script (demo)
const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");

if (sendBtn && userInput) {
  sendBtn.addEventListener("click", sendMessage);
  userInput.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
  });
}

function sendMessage() {
  const msg = userInput.value.trim();
  if (!msg) return;

  appendMessage(msg, "user");
  userInput.value = "";

  // temporary simulated reply
  setTimeout(() => {
    const botReply = generateReply(msg);
    appendMessage(botReply, "bot");
  }, 600);
}

function appendMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender);
  msgDiv.textContent = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Temporary AI reply generator (mock)
function generateReply(msg) {
  msg = msg.toLowerCase();
  if (msg.includes("hello")) return "Hi there! 👋 How can I help you today?";
  if (msg.includes("who are you")) return "I'm sahil's AI Assistant 🤖";
  if (msg.includes("help")) return "Sure! I can answer coding or cybersecurity queries.";
  return "I'm still learning 🤓 — try asking me about coding, hacking, or AI!";
}
