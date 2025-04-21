document.addEventListener("DOMContentLoaded", function () {
    checkAuthStatus();
    fetchUserProgress();
});

// ✅ LOGOUT FUNCTION (Ensures proper session destruction)
function logout() {
    fetch("../api/logout.php", { method: "POST", credentials: "include" })
        .then(response => {
            if (response.ok) {
                localStorage.clear();
                window.location.replace("../index.html");
            } else {
                alert("Logout failed. Please try again.");
            }
        })
        .catch(error => console.error("Logout error:", error));
}

// ✅ PREVENT UNAUTHORIZED ACCESS
function checkAuthStatus() {
    if (!localStorage.getItem("isLoggedIn")) {
        window.location.replace("../index.html");
    }
}

// ✅ PREVENT BACK BUTTON NAVIGATION AFTER LOGOUT
window.addEventListener("pageshow", function (event) {
    if (event.persisted && !localStorage.getItem("isLoggedIn")) {
        window.location.replace("../index.html");
    }
});

// ✅ NAVIGATION FUNCTIONS
function goToProgress() {
    window.location.href = "../dashboard/progress.html";
}

function goToPayment() {
    window.location.href = "../dashboard/payment.html";
}

function goToChatbot() {
    window.location.href = "../dashboard/chatbot.html";
}

// ✅ FETCH USER PROGRESS FROM DATABASE
function fetchUserProgress() {
    fetch("../api/get_progress.php")
        .then(response => response.json())
        .then(data => {
            let completedLessons = data.completedLessons || [];
            let progressPercentage = data.progress || 0;

            // ✅ Update Progress Bar
            const progressFill = document.getElementById("progressFill");
            if (progressFill) {
                progressFill.style.width = progressPercentage + "%";
                progressFill.textContent = Math.round(progressPercentage) + "%";
            }

            // ✅ Unlock lessons based on progress
            completedLessons.forEach(lessonId => {
                let lessonButton = document.getElementById(`lesson${lessonId}`);
                if (lessonButton) {
                    lessonButton.classList.remove("locked");
                    lessonButton.disabled = false;
                }
            });

            localStorage.setItem("completedLessons", JSON.stringify(completedLessons));
        })
        .catch(error => console.error("Error fetching progress:", error));
}

// ✅ MARK LESSON AS COMPLETED & SAVE TO DATABASE
function markAsCompleted(currentLessonId, nextLessonId) {
    fetch("../api/save_progress.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `lesson_id=${currentLessonId}&completion_percentage=100`
    })
    .then(response => response.text())
    .then(data => {
        alert("Lesson marked as completed! The next lesson is now unlocked.");
        fetchUserProgress(); // Refresh progress bar & lesson buttons
        window.location.href = "student.html"; // Redirect to dashboard
    })
    .catch(error => console.error("Error saving progress:", error));
}

// ✅ OPEN LESSON FUNCTION
function openLesson(lessonPage) {
    window.location.href = lessonPage;
}

function updateLessonProgress() {
    let completedLessons = JSON.parse(localStorage.getItem("completedLessons")) || [];
    let totalLessons = 11; 
    let progressPercentage = (completedLessons.length / totalLessons) * 100;
    
    let progressBar = document.getElementById("progressFill");
    progressBar.style.width = progressPercentage + "%";
    progressBar.textContent = Math.round(progressPercentage) + "%"; // Ensure this updates
}

function adjustSchedule(progressStatus, nextLessonId) {
    let nextLessonButton = document.getElementById(`lesson${nextLessonId}`);

    if (!nextLessonButton) return;

    switch (progressStatus) {
        case "slow":
        case "steady":
        case "fast":
            nextLessonButton.disabled = false;
            nextLessonButton.classList.remove("locked");
            break;

        case "almost done":
            nextLessonButton.disabled = false;
            nextLessonButton.classList.remove("locked");
            alert("You're almost done! Take the refresher quiz to complete the course.");
            break;

        case "completed":
            alert("Congratulations! You are eligible for certification.");
            window.location.href = "congratulations.html"; // Redirect after completion
            break;

        default:
            console.warn("Unknown progress status:", progressStatus);
            break;
    }
}