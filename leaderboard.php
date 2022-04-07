<?php
session_start();
if(isset($_POST['score'])) {
    $host = "localhost";
    $username = "root";
    $password = "zx2002gv";
    $db = "tetris";
    $conn1 = mysqli_connect($host, $username, $password, $db);
    if (!$conn1) {
        die("Connection failed: " . mysqli_connect_error());
    }
    $sql1 = "INSERT INTO Scores VALUES (NULL, \"".$_SESSION['name']."\", ".$_POST['score'].");";
    $result1 = mysqli_query($conn1, $sql1);
}
?>
<!DOCTYPE html>
<html>
    <head>
        <title>
            leaderboard
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
            <div id="leaderboard">
                <?php
                    $host = "localhost";
                    $username = "root";
                    $password = "zx2002gv";
                    $db = "tetris";
                    $conn = mysqli_connect($host, $username, $password, $db);
                    if (!$conn) {
                        die("Connection failed: " . mysqli_connect_error());
                    }
                    $sql = "SELECT * FROM Users WHERE `Display` = 1";
                    $result = mysqli_query($conn, $sql);
                ?>
                <table id="leaderboard">
                    <tr>
                        <th>Username</th>
                        <th>Score</th>
                    </tr>
                    <?php
                        if(mysqli_num_rows($result) > 0) {
                            while($data = mysqli_fetch_assoc($result)) {
                                $sql1 = "SELECT * FROM Scores WHERE `Username` = \"".$data['UserName']."\"";
                                $result1 = mysqli_query($conn, $sql1);
                                if(mysqli_num_rows($result1) > 0) {
                                    while($data1 = mysqli_fetch_assoc($result1)) {
                    ?>
                    <tr>
                        <td><?php echo $data1['Username']?></td>
                        <td><?php echo $data1['Score']?></td>
                    </tr>
                    <?php
                            }
                        }else{
                    ?>
                    <tr>
                        <td colspan="8">No data found</td>
                    </tr>
                    <?php } }}?>
                </table>
            </div>
        </div>
    </body>
</html>