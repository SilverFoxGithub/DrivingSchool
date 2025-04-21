<?php
require '../db/db_connect.php';

session_start();
if (!isset($_SESSION['user_id'])) {
    die(json_encode(["error" => "User not logged in."]));
}

$user_id = $_SESSION['user_id'];
$correctAnswers = 0;
$totalQuestions = count($_POST);

foreach ($_POST as $questionId => $userAnswer) {
    $query = $conn->prepare("SELECT correct_answer FROM quiz_questions WHERE id = ?");
    $query->bind_param("i", $questionId);
    $query->execute();
    $query->bind_result($correctAnswer);
    $query->fetch();
    $query->close();

    if ($userAnswer === $correctAnswer) {
        $correctAnswers++;
    }
}

echo json_encode(["correct" => $correctAnswers, "total" => $totalQuestions]);
?>