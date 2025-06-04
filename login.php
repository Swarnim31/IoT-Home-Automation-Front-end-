<?php
// Retrieve the data from the login form
$username = $_POST['username'];
$password = $_POST['password'];

// Your connection code here
$servername = "localhost";
$username_db = "your_username";
$password_db = "your_password";

// Create a connection
$conn = new user($id, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Select the database
$dbname = "your_database_name";
if (!$conn->select_db($dbname)) {
    die("Database selection failed: " . $conn->error);
}

// Query the database for the user
$sql = "SELECT * FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

// Check if the user exists
if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    // Verify the password
    if (password_verify($password, $user['password'])) {
        // Password is correct, start the session
        session_start();
        $_SESSION['user'] = $user;
        header('Location: dashboard.php');
    } else {
        // Password is incorrect
        echo "Incorrect password";
    }
} else {
    // User does not exist
    echo "User not found";
}

// Close the connection
$stmt->close();
$conn->close();
?>