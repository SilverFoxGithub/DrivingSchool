<?php
session_start();

// Destroy all session data
session_unset();
session_destroy();

// Remove login flag in local storage via JavaScript
echo "<script>
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user'); 
    localStorage.removeItem('progress');
    window.location.href = '../index.html';
</script>";
exit();
?>