document.addEventListener("DOMContentLoaded", function () {
    loadQuizQuestions();
});

// ✅ Load Random Questions
function loadQuizQuestions() {
    fetch("../api/get_quiz_questions.php")
        .then(response => response.json())
        .then(data => {
            let questionContainer = document.getElementById("questionsContainer");
            questionContainer.innerHTML = "";

            data.questions.forEach((q, index) => {
                let questionBlock = document.createElement("div");
                questionBlock.classList.add("question");
                questionBlock.innerHTML = `
                    <p>${index + 1}. ${q.question}</p>
                    ${q.options.map(option => `
                        <label>
                            <input type="radio" name="q${index}" value="${option}">
                            ${option}
                        </label><br>
                    `).join("")}
                `;
                questionContainer.appendChild(questionBlock);
            });
        })
        .catch(error => console.error("Error loading quiz:", error));
}

// ✅ Submit Quiz & Evaluate Score
function submitQuiz() {
    let form = document.getElementById("quizForm");
    let selectedAnswers = new FormData(form);
    let correctAnswers = 0;
    let totalQuestions = selectedAnswers.entries.length;

    fetch("../api/grade_quiz.php", {
        method: "POST",
        body: selectedAnswers
    })
    .then(response => response.json())
    .then(data => {
        correctAnswers = data.correct;
        let score = (correctAnswers / totalQuestions) * 100;

        if (score >= 70) {
            alert("Congratulations! You passed the refresher quiz.");
            completeFinalCourse();
        } else {
            alert("You failed the refresher quiz. Please try again.");
        }
    })
    .catch(error => console.error("Error grading quiz:", error));
}

// ✅ Mark Course as Completed
function completeFinalCourse() {
    fetch("../api/save_progress.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "lesson_id=12&completion_percentage=100"
    })
    .then(() => {
        alert("Course completed! Redirecting to the Congratulations page.");
        window.location.href = "congratulations.html";
    })
    .catch(error => console.error("Error saving final progress:", error));
}