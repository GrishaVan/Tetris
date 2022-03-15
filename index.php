<?php
session_start();
$_SESSION['name'] = $_POST['username'];
?>
<!DOCTYPE html>
<html>
    <head>
        <title>
            Tetris
        </title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <ul class="menu">
            <li name="home" id="home"><a href="index.php">Home</a></li>
            <li name="tetris"><a href="tetris.php">Play Tetris</a></li>
            <li name="leaderbord"><a href="leaderbord.php">Leaderboard</a></li>
        </ul>
        <div class="main">
            <img src="tetris.png" alt="error" id="back">
        </div>
    </body>
</html>
