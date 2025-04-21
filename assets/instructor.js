document.addEventListener("DOMContentLoaded", function () {
    checkAuthStatus();
});

// ✅ LOGOUT FUNCTION
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
}

// ✅ NAVIGATION FUNCTIONS
function goToStudentList() {
    window.location.href = "../dashboard/student_list.html";
}

function goToSchedules() {
    window.location.href = "../dashboard/schedules.html";
}

function goToReports() {
    window.location.href = "../dashboard/reports.html";
}