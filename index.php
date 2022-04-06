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
            <script src="welcomeMessage.js">
                <?php 
                    if(isset($_SESSION['name'])) {
                        echo "<script>loggedIn();</script>";
                    }else{
                        echo "<script>notLoggedIn();</script>";
                    }
                ?>
            </script>
            <div id="logedin">
                <h2>Welcome to Tetris!</h2>
                <p><?php echo $_SESSION['name'];?></p>
                <button><a href="tetris.php">Click here to play</a></button>
            </div>
            <div id="login">
                <h2>Sign in</h2>
                <form method="POST" action="index.php">
                    <label for="logUser">Username:</label><br>
                    <input type="text" name="logUser" id="logUser" placeholder="username"><br>
                    <label for="logPass">Password:</label><br>
                    <input type="text" name="logPass" id="logUser" placeholder="password"><br>
                    <p>Don't have a user account? <a href="registration.php">Register now</a></p>
                    <input type="submit" name="submit" id="submit">
                </form>
            </div>
        </div>
    </body>
</html>
