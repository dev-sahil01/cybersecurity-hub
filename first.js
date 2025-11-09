const API_KEY = "AIzaSyBh9Qie-ia-uE49Kog584CieYGDS2rob5g"; // paste your real key here

async function sendMessageToAI(userMessage) {
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + API_KEY;

  const data = {
    contents: [{ parts: [{ text: userMessage }] }]
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  return result.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I didn’t understand that.";
}

// Example usage inside your chatbot:
async function handleUserInput() {
  const userMessage = document.getElementById("user-input").value;
  appendMessage("user", userMessage);

  const botReply = await sendMessageToAI(userMessage);
  appendMessage("bot", botReply);
}
