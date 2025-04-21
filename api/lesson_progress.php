<?php
header("Content-Type: text/plain");

// Database Connection
$host = "localhost";
$username = "root";
$password = "";
$dbname = "driving_school";
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get user_id (from session, replace with actual session logic)
session_start();
$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 1; 

// Get course_name from URL
$course_name = isset($_GET['course']) ? $_GET['course'] : 'default_course';

// Fetch progress
$sql = "SELECT completion_percentage FROM progress WHERE user_id = $user_id AND course_name = '$course_name'";
$result = $conn->query($sql);
$progress = ($result->num_rows > 0) ? $result->fetch_assoc()['completion_percentage'] : 0;

echo $progress;

$conn->close();
?>