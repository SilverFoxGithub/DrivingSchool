<?php
require_once 'includes/session_protect.php';

// Check if user has student role
if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'student') {
    // Redirect to login if not student
    header("Location: login.php?error=unauthorized");
    exit();
}
?>