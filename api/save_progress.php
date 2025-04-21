<?php
require '../db/db_connect.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    die(json_encode(["error" => "User not logged in."]));
}

$user_id = $_SESSION['user_id'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $lesson_id = intval($_POST['lesson_id']);
    $completion_percentage = intval($_POST['completion_percentage']);

    if ($lesson_id < 1 || $lesson_id > 11) {
        die(json_encode(["error" => "Invalid lesson ID."]));
    }

    // ✅ Update or insert progress
    $update_progress = $conn->prepare("
        INSERT INTO progress (user_id, lesson_id, completion_percentage) 
        VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE completion_percentage = VALUES(completion_percentage)
    ");
    $update_progress->bind_param("iii", $user_id, $lesson_id, $completion_percentage);

    if (!$update_progress->execute()) {
        die(json_encode(["error" => "Error updating progress: " . $conn->error]));
    }
    $update_progress->close();

    // ✅ Unlock the next lesson
    $next_lesson = $lesson_id + 1;
    if ($next_lesson <= 11) {
        $unlock_lesson = $conn->prepare("
            INSERT INTO progress (user_id, lesson_id, completion_percentage) 
            VALUES (?, ?, 0) 
            ON DUPLICATE KEY UPDATE lesson_id = VALUES(lesson_id)
        ");
        $unlock_lesson->bind_param("ii", $user_id, $next_lesson);
        $unlock_lesson->execute();
        $unlock_lesson->close();
    }

    echo json_encode(["success" => "Lesson completed and progress saved."]);
    $conn->close();
} else {
    die(json_encode(["error" => "Invalid request."]));
}
?>