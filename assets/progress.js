document.addEventListener("DOMContentLoaded", function () {
    console.log("Loading progress data...");

    fetch("/NewDrivingSchoolSystem/api/get_progress.php")
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("Error:", data.error);
                document.getElementById("progress-container").innerHTML = `<p class="error">${data.error}</p>`;
                return;
            }

            const tableBody = document.getElementById("progress-table");
            tableBody.innerHTML = ""; // Clear previous content

            data.forEach((lesson) => {
                let row = document.createElement("tr");

                let lessonCell = document.createElement("td");
                lessonCell.textContent = lesson.course_name;

                let completionCell = document.createElement("td");
                completionCell.textContent = lesson.completion_percentage + "%";

                let updatedCell = document.createElement("td");
                updatedCell.textContent = new Date(lesson.last_updated).toLocaleDateString();

                row.appendChild(lessonCell);
                row.appendChild(completionCell);
                row.appendChild(updatedCell);

                tableBody.appendChild(row);
            });

            console.log("Progress data loaded successfully.");
        })
        .catch(error => console.error("Error fetching progress:", error));
});