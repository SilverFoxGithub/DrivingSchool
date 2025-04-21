<?php
//   delete_user.php

//   1. Database Connection (Replace with your actual database details)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "driving_school";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//   2. Get the student name from the POST request
$studentName = $_POST['student_name'];

//   3. Sanitize the input (Important to prevent SQL injection)
$studentName = mysqli_real_escape_string($conn, $studentName);

//   4. SQL Query to Delete the student (Adjust as needed for your database schema)
$sql = "DELETE FROM students WHERE name = '$studentName'";

//   5. Execute the Query
if ($conn->query($sql) === TRUE) {
    echo "Student deleted successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

//   6. Close the Connection
$conn->close();
?>