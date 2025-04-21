document.addEventListener("DOMContentLoaded", function () {
    const chatInput = document.getElementById("chat-input");
    const sendButton = document.getElementById("send-button");
    const chatMessages = document.getElementById("chat-messages");

    sendButton.addEventListener("click", function () {
        handleUserInput();
    });

    chatInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            handleUserInput();
        }
    });

    function handleUserInput() {
        const userMessage = chatInput.value.trim();
        if (userMessage === "") return;

        // Display user message
        addMessage("user", userMessage);

        // AI Response - Filter only driving school-related questions
        fetchAIResponse(userMessage);
        chatInput.value = "";
    }

    function fetchAIResponse(userMessage) {
        const allowedTopics = [
            "driving rules",
            "traffic signs",
            "road safety",
            "LTO requirements",
            "vehicle maintenance",
            "defensive driving",
            "driving license",
            "practice schedules",
            "driving test"
        ];

        const isAllowed = allowedTopics.some(topic => userMessage.toLowerCase().includes(topic));

        if (!isAllowed) {
            setTimeout(() => addMessage("ai", "I'm here to assist with driving school topics only. Ask me about driving, road safety, or training schedules."));
            return;
        }

        if (userMessage.toLowerCase().includes("schedule") || userMessage.toLowerCase().includes("next lesson")) {
            fetchTrainingSchedule();
        } else if (userMessage.toLowerCase().includes("LTO requirements")) {
            setTimeout(() => addMessage("ai", "To apply for a driver's license, you need a valid ID, medical certificate, and completion of a driving school course."));
        } else {
            setTimeout(() => addMessage("ai", "That’s a great question! Let me check... (AI would fetch relevant driving info)"));
        }
    }

    function fetchTrainingSchedule() {
        fetch("../api/get_progress.php")
            .then(response => response.json())
            .then(data => {
                let nextLesson = data.find(lesson => lesson.completion_percentage < 100);
                if (nextLesson) {
                    addMessage("ai", `Your next lesson is "${nextLesson.course_name}". You can schedule it based on your availability.`);
                } else {
                    addMessage("ai", "You have completed all lessons! You can now take the final assessment.");
                }
            })
            .catch(error => console.error("Error fetching progress:", error));
    }

    function addMessage(sender, text) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});