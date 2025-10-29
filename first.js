// Toggle chat visibility
const chatToggle = document.getElementById("chat-toggle");
const chatContainer = document.getElementById("chatbot-container");
const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");

// Keep original demo chatbot logic and add toggle behavior
if (chatToggle) {
  chatToggle.addEventListener("click", () => {
    const isHidden = chatContainer.classList.contains("chat-hidden");
    if (isHidden) {
      chatContainer.classList.remove("chat-hidden");
      chatContainer.setAttribute("aria-hidden", "false");
      userInput.focus();
    } else {
      chatContainer.classList.add("chat-hidden");
      chatContainer.setAttribute("aria-hidden", "true");
    }
  });
}

// original message handlers (kept intact)
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

  // simulated reply
  setTimeout(() => {
    const botReply = generateReply(msg);
    appendMessage(botReply, "bot");
  }, 600);
}

function appendMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender === "user" ? "user" : "bot");
  msgDiv.textContent = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Temporary AI reply generator (mock) — unchanged
function generateReply(msg) {
  msg = msg.toLowerCase();
  if (msg.includes("hello")) return "Hi there! 👋 How can I help you today?";
  if (msg.includes("who are you")) return "I'm sahil's AI Assistant 🤖";
  if (msg.includes("help")) return "Sure! I can answer coding or cybersecurity queries.";
  return "I'm still learning 🤓 — try asking me about coding, hacking, or AI!";
}
// 🌐 Floating Chatbot Toggle
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotContainer = document.getElementById("chatbot-container");

if (chatbotToggle) {
  chatbotToggle.addEventListener("click", () => {
    chatbotContainer.style.display =
      chatbotContainer.style.display === "none" || chatbotContainer.style.display === ""
        ? "flex"
        : "none";
  });
}
