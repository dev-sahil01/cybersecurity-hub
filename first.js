// 🌐 Elements
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotContainer = document.getElementById("chatbot-container");
const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");

// 🔹 Your Gemini API Key - IMPORTANT: FOR PERSONAL, OFFLINE USE ONLY.
// 🚨 DO NOT DEPLOY THIS TO A PUBLIC WEBSITE.
const API_KEY = "AIzaSyCS2flPusw9fh_MwAyE-oEXEiPYW3ESaSw"; // Replace with your actual key

// 🔹 An array to store the conversation history
let chatHistory = [];

// 🔹 Toggle chatbot open/close
chatbotToggle.addEventListener("click", () => {
  chatbotContainer.style.display =
    chatbotContainer.style.display === "none" || chatbotContainer.style.display === ""
      ? "flex"
      : "none";
});

// 🔹 Message sending
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// 🔹 Append message to chat
function appendMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender);
  msgDiv.textContent = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// 🔹 Update last bot message (for "Thinking...")
function updateLastBotMessage(newText) {
  const messages = document.querySelectorAll(".message.bot");
  if (messages.length > 0) {
    messages[messages.length - 1].textContent = newText;
  }
}

// 🔹 Handle user input
async function sendMessage() {
  const msg = userInput.value.trim();
  if (!msg) return;

  appendMessage(msg, "user");
  userInput.value = "";

  appendMessage("Thinking...", "bot");

  try {
    const botReply = await sendToGemini(msg, chatHistory);
    updateLastBotMessage(botReply);

    // Add both user message and bot reply to history for the next turn
    chatHistory.push({ role: "user", parts: [{ text: msg }] });
    chatHistory.push({ role: "model", parts: [{ text: botReply }] });

  } catch (error) {
    updateLastBotMessage("⚠️ Error: Could not reach AI. Check your API key or network.");
    console.error(error);
  }
}

// 🔹 Send message and conversation history to Google Gemini API
async function sendToGemini(userMessage, history) {
  // --- NEW, UPDATED URL ---
  // Using the stable v1 endpoint and the modern gemini-1.5-flash model
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  const body = {
    contents: [
      ...history, // Spread the existing history
      {
        role: "user",
        parts: [{ text: userMessage }]
      }
    ],
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    // This will print the NEW error to your console
    console.error("API Error:", response.status, await response.text());
    return "Error: Failed to get a response from the API.";
  }

  const data = await response.json();
  
  if (!data.candidates || data.candidates.length === 0) {
    console.warn("API Response blocked or empty:", data);
    return "My response was blocked for safety reasons. Please try a different question.";
  }

  const botText =
    data.candidates[0]?.content?.parts[0]?.text ||
    "Sorry, I didn’t get that.";
  return botText;
}
