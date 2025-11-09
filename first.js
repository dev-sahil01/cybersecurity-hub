// 🔹 Chatbot Elements
const chatToggle = document.getElementById("chat-toggle");
const chatContainer = document.getElementById("chatbot-container");
const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");

// 🔹 Floating Chatbot Toggle (same as before)
const chatbotToggle = document.getElementById("chatbot-toggle");

if (chatbotToggle) {
  chatbotToggle.addEventListener("click", () => {
    chatbotContainer.style.display =
      chatbotContainer.style.display === "none" || chatbotContainer.style.display === ""
        ? "flex"
        : "none";
  });
}

// 🔹 Toggle visibility
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

// 🔹 Message sending
if (sendBtn && userInput) {
  sendBtn.addEventListener("click", sendMessage);
  userInput.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
  });
}

// 🔹 GEMINI API Connection
const API_KEY = "AIzaSyBh9Qie-ia-uE49Kog584CieYGDS2rob5g";


async function sendMessage() {
  const msg = userInput.value.trim();
  if (!msg) return;

  appendMessage(msg, "user");
  userInput.value = "";

  appendMessage("Thinking...", "bot");

  try {
    const botReply = await sendMessageToAI(msg);
    updateLastBotMessage(botReply);
  } catch (error) {
    updateLastBotMessage("⚠️ Error connecting to AI. Try again.");
    console.error(error);
  }
}

// 🔹 Send user message to Google Gemini
async function sendMessageToAI(userMessage) {
  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" +
    API_KEY;

  const data = {
    contents: [{ parts: [{ text: userMessage }] }],
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I didn’t get that.";
}

// 🔹 Append and update messages
function appendMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender === "user" ? "user" : "bot");
  msgDiv.textContent = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function updateLastBotMessage(newText) {
  const messages = document.querySelectorAll(".message.bot");
  if (messages.length > 0) {
    messages[messages.length - 1].textContent = newText;
  }
}
