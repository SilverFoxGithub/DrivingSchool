<?php
require '../db/db_connect.php';

session_start();
if (!isset($_SESSION['user_id'])) {
    die(json_encode(["error" => "User not logged in."]));
}

// Fetch 10 random quiz questions
$query = "SELECT id, question, option_a, option_b, option_c, option_d FROM quiz_questions ORDER BY RAND() LIMIT 10";
$result = $conn->query($query);

$questions = [];
while ($row = $result->fetch_assoc()) {
    $questions[] = [
        "id" => $row['id'],
        "question" => $row['question'],
        "options" => [$row['option_a'], $row['option_b'], $row['option_c'], $row['option_d']]
    ];
}

echo json_encode(["questions" => $questions]);
$conn->close();
?>