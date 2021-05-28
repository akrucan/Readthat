<?php
    include "connection.php";
    $query ="Select * from posts order by id desc";
    $result = pg_query($con, $query);
    $posts = pg_fetch_all($result);
    echo json_encode($posts);
    header("Content-Type:application/json");
?>
