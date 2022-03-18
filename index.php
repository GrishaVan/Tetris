<?php
session_start();
if (isset($_POST['username'])) {
    $_SESSION['name'] = $_POST['username'];
}
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
            <div id="login">
                <script src="welcomeMessage.js"></script>
                <?php
                if (isset($_SESSION['name'])) {
                    echo '<script>loggedin('.$_SESSION['name'].');</script>';
                }else{
                    echo '<script>signin();</script>';
                }
                ?>
            </div>
        </div>
    </body>
</html>
