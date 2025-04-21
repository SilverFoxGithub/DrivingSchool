document.addEventListener("DOMContentLoaded", function () {
    const lessonMap = [
        { file: "introduction.html", pdf: "../lessons/1_introduction.pdf", title: "Introduction" },
        { file: "road_traffic_rules.html", pdf: "../lessons/2_traffic_rules.pdf", title: "Traffic Rules" },
        { file: "motorcycle.html", pdf: "../lessons/3_motorcycle.pdf", title: "Motorcycle" },
        { file: "motor_vehicle.html", pdf: "../lessons/4_motor_vehicle.pdf", title: "Motor Vehicle" },
        { file: "defensive_driving.html", pdf: "../lessons/5_defensive_driving.pdf", title: "Defensive Driving" },
        { file: "emergencies.html", pdf: "../lessons/6_emergencies.pdf", title: "Emergencies" },
        { file: "special_laws.html", pdf: "../lessons/7_special_laws.pdf", title: "Special Laws" },
        { file: "active_transport.html", pdf: "../lessons/8_transportation.pdf", title: "Active Transport" }
    ];

    // Get current page filename
    const currentPage = window.location.pathname.split("/").pop();
    const currentIndex = lessonMap.findIndex(lesson => lesson.file === currentPage);

    if (currentIndex !== -1) {
        const lessonData = lessonMap[currentIndex];

        // Update lesson title
        document.getElementById("lessonTitle").textContent = lessonData.title;
        document.getElementById("pdfFrame").src = lessonData.pdf;

        // Set up navigation buttons
        const backButton = document.getElementById("backButton");
        const nextButton = document.getElementById("nextButton");

        if (backButton) {
            if (currentIndex > 0) {
                backButton.href = lessonMap[currentIndex - 1].file;
                backButton.style.display = "inline-block";
            } else {
                backButton.style.display = "none"; // Hide if at first lesson
            }
        }

        if (nextButton) {
            if (currentIndex < lessonMap.length - 1) {
                nextButton.href = lessonMap[currentIndex + 1].file;
                nextButton.style.display = "inline-block";
            } else {
                nextButton.style.display = "none"; // Hide if at last lesson
            }
        }
    } else {
        console.error("Current page not found in lessonMap.");
    }
});