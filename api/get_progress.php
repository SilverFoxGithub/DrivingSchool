<?php
require '../db/db_connect.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    die(json_encode(["error" => "User not logged in."]));
}

$user_id = $_SESSION['user_id'];

// ✅ Retrieve progress data
$query = $conn->prepare("SELECT lesson_id, completion_percentage FROM progress WHERE user_id = ?");
$query->bind_param("i", $user_id);
$query->execute();
$result = $query->get_result();

$completedLessons = [];
$progress = 0;
$next_lesson_id = null;

while ($row = $result->fetch_assoc()) {
    if ($row['completion_percentage'] == 100) {
        $completedLessons[] = $row['lesson_id'];
    }
}

// ✅ Find the next lesson the student should take
if (!empty($completedLessons)) {
    $next_lesson_id = max($completedLessons) + 1; // Next lesson after the last completed one
    if ($next_lesson_id > 11) { // Ensure it doesn't exceed the total lessons
        $next_lesson_id = null;
    }
}

// ✅ Calculate progress percentage
$total_lessons = 11; // Adjust if needed
if (!empty($completedLessons)) {
    $progress = (count($completedLessons) / $total_lessons) * 100;
}

// ✅ Determine progress status for AI Scheduling
$progress_status = "";
if ($progress < 20) {
    $progress_status = "slow";
} elseif ($progress >= 20 && $progress < 50) {
    $progress_status = "steady";
} elseif ($progress >= 50 && $progress < 80) {
    $progress_status = "fast";
} else {
    $progress_status = "almost done";
}

$query->close();
$conn->close();

// ✅ Return progress data as JSON
echo json_encode([
    "completedLessons" => $completedLessons,
    "progress" => round($progress, 2), // Rounded to 2 decimal places
    "next_lesson_id" => $next_lesson_id,
    "progress_status" => $progress_status // For AI-based schedule adjustments
]);
?>