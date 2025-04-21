const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const chatMessages = document.getElementById("chat-messages");

sendButton.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    const messageText = messageInput.value.trim();
    if (!messageText) return;

    // Display user message
    displayMessage("user", messageText);
    messageInput.value = "";

    // Send message to PHP backend
    fetch("/api/chatbot.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: messageText })
    })
    .then(response => response.json())
    .then(data => {
        // Display chatbot response
        displayMessage("chatbot", data.response || "No response from AI.");
    })
    .catch(error => {
        console.error("Error:", error);
        displayMessage("chatbot", "Sorry, something went wrong.");
    });
}

function displayMessage(sender, message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);

    // Scroll to the latest message
    chatMessages.scrollTop = chatMessages.scrollHeight;
}