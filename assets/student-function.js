// =======================================================
// Authentication and Navigation Functions
// =======================================================

// Prevent unauthorized access
window.onload = function () {
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.replace('../index.html');
    }
};

// Prevent back navigation after logout
window.addEventListener('pageshow', function (event) {
    if (event.persisted && !localStorage.getItem('isLoggedIn')) {
        window.location.replace('../index.html');
    }
});

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('progress');
    localStorage.setItem('loggedOut', 'true');
    window.location.replace('../index.html');
}

// Lesson navigation
function goToLesson(lessonUrl) {
    if (!lessonUrl.includes('locked')) {
        window.location.href = lessonUrl;
    }
}

// =======================================================
// Progress Tracking Functions
// =======================================================

// Progress update (example)
function updateProgress(percentage) {
    document.getElementById('progressFill').style.width = percentage + '%';
    document.getElementById('progressFill').textContent = percentage + '%';
}

// Example: Unlock next lesson (you'll need to adjust this)
function unlockNextLesson(currentLesson) {
    if (currentLesson === 'introduction.html') {
        document.querySelector('.lesson-button.locked').classList.remove('locked');
    }
}

// =======================================================
// Example Usage
// =======================================================

// Example usage:
// updateProgress(25);
// unlockNextLesson('introduction.html');