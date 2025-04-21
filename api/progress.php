<?php
header('Content-Type: application/json');
include '../db/db_connect.php'; // Adjust path if needed
session_start();

$user_id = $_SESSION['user_id']; // Assuming the user is logged in

$sql = "SELECT id, user_id, lesson_id, completion_percentage, last_updated FROM progress WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$progressData = [];
while ($row = $result->fetch_assoc()) {
    $progressData[] = $row;
}

$stmt->close();
$conn->close();

echo json_encode($progressData);
?>