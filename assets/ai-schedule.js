document.addEventListener("DOMContentLoaded", function () {
    fetchStudentProgress();
});

// ✅ Fetch Student Progress & Adjust Scheduling
function fetchStudentProgress() {
    fetch("../api/get_progress.php")
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("Error fetching progress:", data.error);
                return;
            }

            updateProgressUI(data.progress);
            adjustSchedule(data.progress_status, data.next_lesson_id);
        })
        .catch(error => console.error("Error fetching progress:", error));
}

// ✅ Update Progress Bar UI
function updateProgressUI(progressPercentage) {
    let progressBar = document.getElementById("progressFill");
    if (progressBar) {
        progressBar.style.width = progressPercentage + "%";
        progressBar.textContent = Math.round(progressPercentage) + "%";
    }
}

// ✅ Adjust Schedule Based on Progress Speed
function adjustSchedule(progressStatus, nextLessonId) {
    let nextLessonButton = document.getElementById(`lesson${nextLessonId}`);

    if (!nextLessonButton) return; // Ensure lesson button exists

    switch (progressStatus) {
        case "slow":
            nextLessonButton.disabled = false; // Unlocks next lesson
            nextLessonButton.classList.remove("locked");
            alert("Keep going! Take your time to understand the lessons. Next lesson is now unlocked.");
            break;
        
        case "steady":
            nextLessonButton.disabled = false;
            nextLessonButton.classList.remove("locked");
            console.log("You're progressing well! Continue at your own pace.");
            break;

        case "fast":
            nextLessonButton.disabled = false;
            nextLessonButton.classList.remove("locked");
            alert("You're learning fast! The system has unlocked an extra lesson for you.");
            let extraLesson = document.getElementById(`lesson${nextLessonId + 1}`);
            if (extraLesson) {
                extraLesson.disabled = false;
                extraLesson.classList.remove("locked");
            }
            break;

        case "almost done":
            nextLessonButton.disabled = false;
            nextLessonButton.classList.remove("locked");
            alert("You're almost done! A refresher quiz will be available soon.");
            break;

        default:
            console.warn("Unknown progress status:", progressStatus);
            break;
    }
}