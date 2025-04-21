async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    const chatLog = document.getElementById("chat-log");

    if (!userInput) return;

    // Display user message
    chatLog.innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;

    // Call the backend
    const response = await fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
    });

    const data = await response.json();

    // Display AI response
    chatLog.innerHTML += `<div><strong>AI Assistant:</strong> ${data.reply}</div>`;

    // Clear input field
    document.getElementById("user-input").value = "";
    chatLog.scrollTop = chatLog.scrollHeight;
}