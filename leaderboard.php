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
                    $db = "test1";
                    $conn1 = mysqli_connect($host, $username, $password, $db);
                    if (!$conn1) {
                        die("Connection failed: " . mysqli_connect_error());
                    }else{
                        echo "Connected successfully";
                    }
                    $sql1 = "SELECT * FROM Scores;";
                    $result = mysqli_query($conn1, $sql1);
                ?>
                <table border="1" cellspacing="0" padding="10">
                    <tr>
                        <th>Username</th>
                        <th>Score</th>
                    </tr>
                    <?php
                        if(mysqli_num_rows($result) > 0) {
                            while($data = mysqli_fetch_assoc($result)) {
                    ?>
                    <tr>
                        <td><?php echo $data['Username']?></td>
                        <td><?php echo $data['Score']?></td>
                    </tr>
                    <?php
                            }
                        }else{
                    ?>
                    <tr>
                        <td colspan="8">No data found</td>
                    </tr>
                    <?php } ?>
                </table>
            </div>
        </div>
    </body>
</html>