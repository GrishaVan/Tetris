<?php
session_start();
?>
<!DOCTYPE html>
<html>
    <head>
        <title>
            Register to play!
        </title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <ul class="menu">
            <li name="home" id="home"><a href="index.php">Home</a></li>
            <li name="tetris"><a href="tetris.php">Play Tetris</a></li>
            <li name="leaderbord"><a href="leaderboard.php">Leaderboard</a></li>
        </ul>
        <div class="main">
            <form method="POST" action="index.php" onsubmit="return passwordCheck();">
                <h2>Sign up:</h2>
                <p id="status"></p>
                <label for="firstName">First name:</label><br>
                <input type="text" name="firstName" id="firstName" placeholder="e.g. Bob"><br>
                <label for="lastName">Last name:</label><br>
                <input type="text" name="lastName" id="lastName" placeholder="e.g Smith"><br>
                <label for="username">Username:</label><br>
                <input type="text" name="username" id="username" placeholder="e.g Booid" required><br>
                <label for="password">Password:</label><br>
                <input type="password" name="password" id="password" placeholder="Password" required><br>
                <label for="password">Confirm password:</label><br>
                <input type="password" name="confPassword" id="confPassword" placeholder="Confirm password" required><br>
                <label for="display">Display Scores on leaderboard:</label><br>
                <input type="radio" name="display" id="yes" value="yes" checked>
                <label for="yes">yes</label><br>
                <input type="radio" name="display" id="no">
                <label for="no">no</label><br>
                <input type="submit" name="submit" id="submit">
            </form>
        <script src="checkPassword.js"></script>
        </div>
    </body>
</html>