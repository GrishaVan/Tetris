<?php
session_start();
if (isset($_POST['username'])) {
    $_SESSION['name'] = $_POST['username'];
    $host = "localhost";
    $username = "root";
    $password = "zx2002gv";
    $db = "tetris";
    $conn = mysqli_connect($host, $username, $password, $db);
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    if($_POST['display'] == "yes") {
        setcookie("display", "yes", time() + 60*60*24);
        $sql = "INSERT INTO Users VALUES (\"".$_POST['username']."\", \"".$_POST['firstName']."\", \"".$_POST['lastName']."\", \"".$_POST["password"]."\", 1)";
    }else{
        setcookie("display", "no", time() + 60*60*24);
        $sql = "INSERT INTO Users VALUES (\"".$_POST['username']."\", \"".$_POST['firstName']."\", \"".$_POST['lastName']."\", \"".$_POST["password"]."\", 0)";
    }
    if(!mysqli_query($conn, $sql)) {
        echo $sql;
        echo "error";
    }
    mysqli_close($conn);
}
?>
<!DOCTYPE html>
<html>
    <head>
        <title>
            Tetris
        </title>
        <link rel="stylesheet" href="style.css">
        <script src="welcomeMessage.js"></script>
    </head>
    <body>
        <ul class="menu">
            <li name="home" id="home"><a href="index.php">Home</a></li>
            <li name="tetris"><a href="tetris.php">Play Tetris</a></li>
            <li name="leaderbord"><a href="leaderboard.php">Leaderboard</a></li>
        </ul>
        <div class="main">
            <div id="logedin">
                <h2>Welcome to Tetris</h2>
                <p><?php echo $_SESSION['name'];?></p>
                <button><a href="tetris.php">Click here to play</a></button>
            </div>
            <div id="login">
                <h2>Sign in</h2>
                <p id="status"></p>
                <form method="POST" action="index.php">
                    <label for="logUser">Username:</label><br>
                    <input type="text" name="logUser" id="logUser" placeholder="username"><br>
                    <label for="logPass">Password:</label><br>
                    <input type="password" name="logPass" id="logUser" placeholder="password"><br>
                    <p>Don't have a user account? <a href="registration.php">Register now</a></p>
                    <input type="submit" name="submit" id="submit">
                </form>
                <?php
                    $host = "localhost";
                    $username = "root";
                    $password = "zx2002gv";
                    $db = "tetris";
                    $conn1 = mysqli_connect($host, $username, $password, $db);
                    $logUser = $_POST['logUser'];
                    $logPass = $_POST['logPass'];
                    if(isset($_POST['logUser'])) {
                        $sql1 = "SELECT * FROM Users WHERE UserName = '$logUser' AND Password = '$logPass'";
                        if($result = mysqli_query($conn1, $sql1)) {
                            if(mysqli_num_rows($result) > 0) {
                                mysqli_close($conn1);
                                $_SESSION['name'] = $logUser;
                            }
                            else {
                                echo "Failed log in";
                            }
                        }
                    }
                ?>
            </div>
            <?php
                if(isset($_SESSION['name'])) {
                    echo "<script>loggedIn();</script>";
                }else{
                    echo "<script>notLoggedIn();</script>";
                }
            ?>
        </div>
    </body>
</html>
